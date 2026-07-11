import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product, Review, Category } from "@/models";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";
import { productSchema } from "@/lib/validations";
import type { ApiResponse, ApiError } from "@/types";

// GET /api/products/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      const response: ApiError = {
        success: false,
        message: "Product not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const reviews = await Review.find({ product: id })
      .sort({ createdAt: -1 })
      .lean();

    const serialized = JSON.parse(JSON.stringify(product));
    const serializedReviews = JSON.parse(JSON.stringify(reviews));

    const apiResponse: ApiResponse<{
      product: typeof serialized;
      reviews: typeof serializedReviews;
    }> = {
      success: true,
      data: {
        product: serialized,
        reviews: serializedReviews,
      },
    };

    return NextResponse.json(apiResponse, { status: 200 });
  } catch (error: unknown) {
    console.error("Product GET error:", error);
    const response: ApiError = {
      success: false,
      message: "Failed to fetch product",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// PUT /api/products/[id] (protected)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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

    const product = await Product.findById(id);

    if (!product) {
      const response: ApiError = {
        success: false,
        message: "Product not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    if (
      product.artisan.toString() !== decoded.userId &&
      decoded.role !== "admin"
    ) {
      const response: ApiError = {
        success: false,
        message: "Not authorized to edit this product",
      };
      return NextResponse.json(response, { status: 403 });
    }

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

    const category = await Category.findById(result.data.category);
    if (!category) {
      const response: ApiError = {
        success: false,
        message: "Category not found",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const images = result.data.images
      .split(",")
      .map((url: string) => url.trim())
      .filter((url: string) => url.length > 0);

    if (images.length === 0) {
      images.push(...product.images);
    }

    product.title = result.data.title;
    product.shortDescription = result.data.shortDescription;
    product.fullDescription = result.data.fullDescription;
    product.price = Number(result.data.price);
    product.category = category._id;
    product.categoryName = category.name;
    product.images = images;
    product.location = result.data.location;
    product.featured = result.data.featured;

    await product.save();

    const serialized = JSON.parse(JSON.stringify(product));

    const apiResponse: ApiResponse<typeof serialized> = {
      success: true,
      data: serialized,
      message: "Product updated successfully",
    };

    return NextResponse.json(apiResponse, { status: 200 });
  } catch (error: unknown) {
    console.error("Product PUT error:", error);

    if (error instanceof Error && error.name === "JsonWebTokenError") {
      const response: ApiError = {
        success: false,
        message: "Invalid or expired token",
      };
      return NextResponse.json(response, { status: 401 });
    }

    const response: ApiError = {
      success: false,
      message: "Failed to update product",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/products/[id] (protected)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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

    const product = await Product.findById(id);

    if (!product) {
      const response: ApiError = {
        success: false,
        message: "Product not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    if (
      product.artisan.toString() !== decoded.userId &&
      decoded.role !== "admin"
    ) {
      const response: ApiError = {
        success: false,
        message: "Not authorized to delete this product",
      };
      return NextResponse.json(response, { status: 403 });
    }

    await Review.deleteMany({ product: id });
    await Product.findByIdAndDelete(id);

    const count = await Product.countDocuments({ category: product.category });
    await Category.findByIdAndUpdate(product.category, { productCount: count });

    const apiResponse: ApiResponse<null> = {
      success: true,
      data: null,
      message: "Product deleted successfully",
    };

    return NextResponse.json(apiResponse, { status: 200 });
  } catch (error: unknown) {
    console.error("Product DELETE error:", error);

    if (error instanceof Error && error.name === "JsonWebTokenError") {
      const response: ApiError = {
        success: false,
        message: "Invalid or expired token",
      };
      return NextResponse.json(response, { status: 401 });
    }

    const response: ApiError = {
      success: false,
      message: "Failed to delete product",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
