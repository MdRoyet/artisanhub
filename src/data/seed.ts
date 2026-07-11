import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import { User, Category, Product, Review } from "../models";
import { users } from "./seed-users";
import { categories } from "./seed-categories";
import { products } from "./seed-products";
import { reviews } from "./seed-reviews";

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  console.log("ðŸŒ± Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("âœ… Connected!");

  // Clear existing data
  console.log("ðŸ§¹ Clearing existing collections...");
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Review.deleteMany({});

  // Seed users
  console.log("ðŸ‘¤ Seeding users...");
  const createdUsers = await User.create(users);
  const userMap = new Map(createdUsers.map((u) => [u.email, u._id]));

  // Seed categories
  console.log("ðŸ“ Seeding categories...");
  const createdCategories = await Category.create(categories);
  const categoryMap = new Map(createdCategories.map((c) => [c.slug, c._id]));

  // Seed products
  console.log("ðŸ“¦ Seeding products...");
  const productsWithIds = products.map((p) => ({
    ...p,
    category: categoryMap.get(p.categorySlug)!,
    categoryName: categories.find((c) => c.slug === p.categorySlug)?.name || "",
    artisan: userMap.get(p.artisanEmail)!,
    artisanName: users.find((u) => u.email === p.artisanEmail)?.name || "",
    images: p.images,
  }));

  // Remove categorySlug and artisanEmail before saving
  const cleanProducts = productsWithIds.map(
    ({ categorySlug, artisanEmail, ...rest }) => rest,
  );

  const createdProducts = await Product.create(cleanProducts);
  const productMap = new Map(createdProducts.map((p) => [p.title, p._id]));

  // Seed reviews
  console.log("â­ Seeding reviews...");
  const userIds = Array.from(userMap.values());

  const reviewsWithIds = reviews.map((r, index) => ({
    product: productMap.get(r.productTitle)!,
    user: userIds[index % userIds.length], // cycle through users
    userName: r.userName,
    rating: r.rating,
    comment: r.comment,
  }));

  await Review.create(reviewsWithIds);

  // Update category product counts
  console.log("ðŸ“Š Updating category product counts...");
  for (const [slug, catId] of categoryMap) {
    const count = await Product.countDocuments({ category: catId });
    await Category.findByIdAndUpdate(catId, { productCount: count });
  }

  console.log("\nðŸŽ‰ Seed completed successfully!");
  console.log(`   Users: ${createdUsers.length}`);
  console.log(`   Categories: ${createdCategories.length}`);
  console.log(`   Products: ${createdProducts.length}`);
  console.log(`   Reviews: ${reviewsWithIds.length}`);
  console.log("\nDemo credentials:");
  console.log("  User:  artisan@demo.com / demo1234");
  console.log("  Admin: admin@artisanhub.com / admin1234");

  await mongoose.disconnect();
  console.log("ðŸ‘‹ Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("âŒ Seed failed:", err);
  process.exit(1);
});
