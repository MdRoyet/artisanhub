// src/app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product, Review } from "@/models";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";
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

    // Get reviews for this product
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

    // Only allow artisan who created it or admin to delete
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

    // Delete associated reviews
    await Review.deleteMany({ product: id });

    // Delete product
    await Product.findByIdAndDelete(id);

    // Update category count
    const count = await Product.countDocuments({ category: product.category });
    await require("@/models").Category.findByIdAndUpdate(product.category, {
      productCount: count,
    });

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
