export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Category, Product } from "@/models";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CategoriesSection } from "@/components/landing/categories-section";
import { FeaturedProducts } from "@/components/landing/featured-products";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { StatisticsSection } from "@/components/landing/statistics-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { NewsletterSection } from "@/components/landing/newsletter-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { RecentlyViewedProducts } from "@/components/shared/recently-viewed-products";

export default async function HomePage() {
  await connectDB();

  // Fetch real data from database
  const categories = await Category.find().sort({ productCount: -1 }).lean();
  const products = await Product.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  // Calculate stats from DB
  const totalProducts = await Product.countDocuments();
  const totalCategories = await Category.countDocuments();
  const totalArtisans = (await Product.distinct("artisan")).length;
  const avgRatingResult = await Product.aggregate([
    { $group: { _id: null, avgRating: { $avg: "$rating" } } },
  ]);
  const averageRating = avgRatingResult[0]?.avgRating
    ? Number(avgRatingResult[0].avgRating.toFixed(1))
    : 0;

  // Serialize MongoDB documents
  const serializedCategories = JSON.parse(JSON.stringify(categories));
  const serializedProducts = JSON.parse(JSON.stringify(products));

  const stats = [
    { label: "Handcrafted Products", value: totalProducts, suffix: "+" },
    { label: "Skilled Artisans", value: totalArtisans, suffix: "+" },
    { label: "Craft Categories", value: totalCategories, suffix: "" },
    { label: "Average Rating", value: averageRating * 10, suffix: "/5" },
  ];

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection categories={serializedCategories} />
      <FeaturedProducts products={serializedProducts} />
      <HowItWorksSection />
      <StatisticsSection stats={stats} />
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
      <CTASection />
      <RecentlyViewedProducts />
    </>
  );
}
