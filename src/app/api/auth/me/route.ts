import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";
import type { ApiResponse, ApiError } from "@/types";

export async function GET(req: NextRequest) {
  try {
    // Extract token from Authorization header
    const token = extractTokenFromHeader(req.headers.get("authorization"));

    if (!token) {
      const response: ApiError = {
        success: false,
        message: "Not authenticated. Please log in.",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Verify token
    const decoded = verifyToken(token);

    await connectDB();

    // Find user by ID from token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      const response: ApiError = {
        success: false,
        message: "User not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const apiResponse: ApiResponse<{
      _id: string;
      name: string;
      email: string;
      role: string;
      avatar: string;
    }> = {
      success: true,
      data: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
      },
    };

    return NextResponse.json(apiResponse, { status: 200 });
  } catch (error: unknown) {
    console.error("Auth me error:", error);

    // Handle expired/invalid JWT specifically
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      const response: ApiError = {
        success: false,
        message: "Invalid or expired token",
      };
      return NextResponse.json(response, { status: 401 });
    }

    const response: ApiError = {
      success: false,
      message: "Something went wrong.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
