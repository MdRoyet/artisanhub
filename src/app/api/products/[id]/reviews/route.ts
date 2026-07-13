import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product, Review } from "@/models";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";
import { reviewSchema } from "@/lib/validations";
import type { ApiResponse, ApiError } from "@/types";


export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const token = extractTokenFromHeader(req.headers.get("authorization"));

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" } as ApiError,
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    await connectDB();

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" } as ApiError,
        { status: 404 },
      );
    }

    // Validate input
    const body = await req.json();
    const result = reviewSchema.safeParse(body);
    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = [];
        errors[field].push(issue.message);
      });
      return NextResponse.json(
        { success: false, message: "Validation failed", errors } as ApiError,
        { status: 400 },
      );
    }

    // Check if user already reviewed (optional but good practice)
    const existingReview = await Review.findOne({
      product: id,
      user: decoded.userId,
    });
    if (existingReview) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already reviewed this product",
        } as ApiError,
        { status: 409 },
      );
    }

    // Create Review
    await Review.create({
      product: id,
      user: decoded.userId,
      userName: decoded.email.split("@")[0], // Use email prefix as name, or fetch from User model
      rating: result.data.rating,
      comment: result.data.comment,
    });

    // Recalculate Product Rating & Count
    const allReviews = await Review.find({ product: id });
    const totalReviews = allReviews.length;
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    await Product.findByIdAndUpdate(id, {
      rating: Number(avgRating.toFixed(1)),
      reviewCount: totalReviews,
    });

    return NextResponse.json(
      {
        success: true,
        data: null,
        message: "Review added successfully",
      } as ApiResponse<null>,
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Review POST error:", error);
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" } as ApiError,
        { status: 401 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to add review" } as ApiError,
      { status: 500 },
    );
  }
}
