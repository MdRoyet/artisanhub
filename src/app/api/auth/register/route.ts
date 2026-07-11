// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import { registerSchema } from "@/lib/validations";
import { signToken } from "@/lib/jwt";
import type { ApiResponse, ApiError } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const result = registerSchema.safeParse(body);
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

    // Check if user already exists
    const existingUser = await User.findOne({ email: result.data.email });
    if (existingUser) {
      const response: ApiError = {
        success: false,
        message: "An account with this email already exists",
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create user (password hashing happens in the pre-save hook)
    const user = await User.create(result.data);

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
      message: "Account created successfully",
    };

    return NextResponse.json(apiResponse, { status: 201 });
  } catch (error: unknown) {
    console.error("Register error:", error);
    const response: ApiError = {
      success: false,
      message: "Something went wrong. Please try again.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
