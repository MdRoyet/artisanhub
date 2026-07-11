import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models";
import type { ApiResponse } from "@/types";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({ productCount: -1 }).lean();

    const serialized = JSON.parse(JSON.stringify(categories));

    const response: ApiResponse<typeof serialized> = {
      success: true,
      data: serialized,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("Categories GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
