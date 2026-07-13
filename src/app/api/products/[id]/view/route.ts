import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true },
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: { viewCount: product.viewCount },
    });
  } catch (error) {
    console.error("View count error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update view count" },
      { status: 500 },
    );
  }
}
