import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import { loginSchema } from "@/lib/validations";
import { signToken } from "@/lib/jwt";
import type { ApiResponse, ApiError } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const result = loginSchema.safeParse(body);
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

    await connectDB();

    // Find user â€” MUST include password since it's hidden by default
    const user = await User.findOne({ email: result.data.email }).select(
      "+password",
    );

    if (!user) {
      const response: ApiError = {
        success: false,
        message: "Invalid email or password",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(result.data.password);
    if (!isMatch) {
      const response: ApiError = {
        success: false,
        message: "Invalid email or password",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Generate JWT
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const apiResponse: ApiResponse<{
      user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        avatar: string;
      };
      token: string;
    }> = {
      success: true,
      data: {
        user: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar || "",
        },
        token,
      },
      message: "Login successful",
    };

    return NextResponse.json(apiResponse, { status: 200 });
  } catch (error: unknown) {
    console.error("Login error:", error);
    const response: ApiError = {
      success: false,
      message: "Something went wrong. Please try again.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
