// src/data/seed.ts

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
  console.log("[seed] Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("[seed] Connected!");

  console.log("[seed] Clearing existing collections...");
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Review.deleteMany({});

  console.log("[seed] Seeding users...");
  const createdUsers = await User.create(users);
  const userMap = new Map(
    createdUsers.map((u: { email: string; _id: mongoose.Types.ObjectId }) => [
      u.email,
      u._id,
    ]),
  );

  console.log("[seed] Seeding categories...");
  const createdCategories = await Category.create(categories);
  const categoryMap = new Map<string, mongoose.Types.ObjectId>(
    createdCategories.map(
      (c: { slug: string; _id: mongoose.Types.ObjectId }) => [c.slug, c._id],
    ),
  );

  console.log("[seed] Seeding products...");
  const productsWithIds = products.map((p) => ({
    ...p,
    category: categoryMap.get(p.categorySlug)!,
    categoryName: categories.find((c) => c.slug === p.categorySlug)?.name || "",
    artisan: userMap.get(p.artisanEmail)!,
    artisanName: users.find((u) => u.email === p.artisanEmail)?.name || "",
    images: p.images,
  }));

  const cleanProducts = productsWithIds.map(
    ({ categorySlug, artisanEmail, ...rest }) => rest,
  );

  const createdProducts = await Product.create(cleanProducts);
  const productMap = new Map<string, mongoose.Types.ObjectId>(
    createdProducts.map(
      (p: { title: string; _id: mongoose.Types.ObjectId }) => [p.title, p._id],
    ),
  );

  console.log("[seed] Seeding reviews...");
  const userIds = Array.from(userMap.values());

  const reviewsWithIds = reviews.map((r, index) => ({
    product: productMap.get(r.productTitle)!,
    user: userIds[index % userIds.length],
    userName: r.userName,
    rating: r.rating,
    comment: r.comment,
  }));

  await Review.create(reviewsWithIds);

  console.log("[seed] Updating category product counts...");
  for (const [slug, catId] of categoryMap) {
    const count = await Product.countDocuments({ category: catId });
    await Category.findByIdAndUpdate(catId, { productCount: count });
  }

  console.log("");
  console.log("[seed] SUCCESS!");
  console.log("  Users: " + createdUsers.length);
  console.log("  Categories: " + createdCategories.length);
  console.log("  Products: " + createdProducts.length);
  console.log("  Reviews: " + reviewsWithIds.length);
  console.log("");
  console.log("Demo credentials:");
  console.log("  User:  artisan@demo.com / demo1234");
  console.log("  Admin: admin@artisanhub.com / admin1234");

  await mongoose.disconnect();
  console.log("[seed] Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("[seed] FAILED:", err);
  process.exit(1);
});
