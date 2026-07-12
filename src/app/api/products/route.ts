// src/app/api/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product, Category } from "@/models";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";
import type { ApiResponse, ApiError, PaginatedResponse } from "@/types";
import { productSchema } from "@/lib/validations";

// GET /api/products?search=&category=&minPrice=&maxPrice=&rating=&sort=&page=&limit=&featured=
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const rating = searchParams.get("rating") || "";
    const sort = searchParams.get("sort") || "newest";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get("limit")) || 8),
    );
    const featured = searchParams.get("featured");

    await connectDB();

    // Build filter query
    const filter: Record<string, any> = {};

    // Search by title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category slug
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        filter.category = cat._id;
      }
    }

    // Filter by price range
    if (
      (minPrice && !isNaN(Number(minPrice))) ||
      (maxPrice && !isNaN(Number(maxPrice)))
    ) {
      filter.price = {};
      if (minPrice && !isNaN(Number(minPrice))) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice && !isNaN(Number(maxPrice))) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Filter by minimum rating
    if (rating && !isNaN(Number(rating))) {
      filter.rating = { $gte: Number(rating) };
    }

    // Filter featured only
    if (featured === "true") {
      filter.featured = true;
    }

    // Build sort
    let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
    switch (sort) {
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "price-asc":
        sortObj = { price: 1 };
        break;
      case "price-desc":
        sortObj = { price: -1 };
        break;
      case "rating-desc":
        sortObj = { rating: -1 };
        break;
      case "reviews-desc":
        sortObj = { reviewCount: -1 };
        break;
      case "newest":
      default:
        sortObj = { createdAt: -1 };
        break;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    // Serialize
    const serialized = JSON.parse(JSON.stringify(products));

    const response: PaginatedResponse<typeof serialized> = {
      success: true,
      data: serialized,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("Products GET error:", error);
    const response: ApiError = {
      success: false,
      message: "Failed to fetch products",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/products (protected - create product)
export async function POST(req: NextRequest) {
  try {
    // Auth check
    const token = extractTokenFromHeader(req.headers.get("authorization"));
    if (!token) {
      const response: ApiError = {
        success: false,
        message: "Not authenticated",
      };
      return NextResponse.json(response, { status: 401 });
    }

    const decoded = verifyToken(token);
    await connectDB();

    // Validate input
    const body = await req.json();
    const result = productSchema.safeParse(body);
    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = [];
        errors[field].push(issue.message);
      });
      const response: ApiError = {
        success: false,
        message: "Validation failed",
        errors,
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Find category
    const category = await Category.findById(result.data.category);
    if (!category) {
      const response: ApiError = {
        success: false,
        message: "Category not found",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Parse images (comma-separated URLs)
    let images = result.data.images
      .split(",")
      .map((url: string) => url.trim())
      .filter((url: string) => url.length > 0);

    if (images.length === 0) {
      images.push(
        "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
      );
    }

    // Create product
    const product = await Product.create({
      title: result.data.title,
      shortDescription: result.data.shortDescription,
      fullDescription: result.data.fullDescription,
      price: Number(result.data.price),
      category: category._id,
      categoryName: category.name,
      images,
      rating: 0,
      reviewCount: 0,
      location: result.data.location,
      artisan: decoded.userId,
      artisanName: decoded.email,
      featured: result.data.featured,
    });

    // Update category product count
    const count = await Product.countDocuments({ category: category._id });
    await Category.findByIdAndUpdate(category._id, { productCount: count });

    const serialized = JSON.parse(JSON.stringify(product));

    const apiResponse: ApiResponse<typeof serialized> = {
      success: true,
      data: serialized,
      message: "Product created successfully",
    };

    return NextResponse.json(apiResponse, { status: 201 });
  } catch (error: unknown) {
    console.error("Products POST error:", error);

    if (error instanceof Error && error.name === "JsonWebTokenError") {
      const response: ApiError = {
        success: false,
        message: "Invalid or expired token",
      };
      return NextResponse.json(response, { status: 401 });
    }

    const response: ApiError = {
      success: false,
      message: "Failed to create product",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
