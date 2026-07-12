import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product, Category } from "@/models";
import type { ApiResponse, ApiError } from "@/types";

export async function GET() {
  try {
    await connectDB();

    // 1. Overall Stats
    const [totalProducts, featuredProducts, totalCategories, avgRatingResult] =
      await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({ featured: true }),
        Category.countDocuments(),
        Product.aggregate([
          { $group: { _id: null, avgRating: { $avg: "$rating" } } },
        ]),
      ]);

    const avgRating = avgRatingResult[0]?.avgRating
      ? Number(avgRatingResult[0].avgRating.toFixed(1))
      : 0;

    // 2. Products Added Over Time (Last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyDataRaw = await Product.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyData = monthlyDataRaw.map((item) => ({
      month: monthNames[item._id.month - 1],
      products: item.count,
    }));

    // 3. Products by Category
    const categoryDataRaw = await Product.aggregate([
      {
        $group: {
          _id: "$categoryName",
          count: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const categoryData = categoryDataRaw.map((item) => ({
      name: item._id || "Uncategorized",
      products: item.count,
      avgRating: Number(item.avgRating.toFixed(1)),
    }));

    // 4. Rating Distribution
    const ratingDataRaw = await Product.aggregate([
      { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);

    const ratingDistribution = [
      { rating: "5 Stars", count: 0 },
      { rating: "4 Stars", count: 0 },
      { rating: "3 Stars", count: 0 },
      { rating: "2 Stars", count: 0 },
      { rating: "1 Star", count: 0 },
    ];

    ratingDataRaw.forEach((item) => {
      const flooredRating = Math.floor(item._id);
      if (flooredRating >= 1 && flooredRating <= 5) {
        ratingDistribution[flooredRating - 1].count += item.count;
      }
    });

    // 5. Top 5 Products
    const topProductsRaw = await Product.find()
      .sort({ reviewCount: -1 })
      .limit(5)
      .select("title price reviewCount rating images")
      .lean();

    const topProducts = topProductsRaw.map((p) => ({
      name: p.title,
      image: p.images?.[0] || "",
      reviews: p.reviewCount,
      rating: p.rating,
      price: p.price,
    }));

    const response: ApiResponse<{
      stats: {
        totalProducts: number;
        featuredProducts: number;
        totalCategories: number;
        avgRating: number;
      };
      monthlyData: typeof monthlyData;
      categoryData: typeof categoryData;
      ratingDistribution: typeof ratingDistribution;
      topProducts: typeof topProducts;
    }> = {
      success: true,
      data: {
        stats: { totalProducts, featuredProducts, totalCategories, avgRating },
        monthlyData,
        categoryData,
        ratingDistribution,
        topProducts,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("Dashboard Stats Error:", error);
    const response: ApiError = {
      success: false,
      message: "Failed to fetch dashboard stats",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
