import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Question, Product, User } from "@/models";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const questions = await Question.find({ product: id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: questions });
  } catch (error) {
    console.error("Questions GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const token = extractTokenFromHeader(req.headers.get("authorization"));

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    await connectDB();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Question is required" },
        { status: 400 },
      );
    }

    const newQuestion = await Question.create({
      product: id,
      user: decoded.userId,
      userName: user.name,
      question: question.trim(),
    });

    return NextResponse.json(
      { success: true, data: newQuestion },
      { status: 201 },
    );
  } catch (error) {
    console.error("Question POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit question" },
      { status: 500 },
    );
  }
}
