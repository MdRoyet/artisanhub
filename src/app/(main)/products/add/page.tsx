import { connectDB } from "@/lib/db";
import { Category } from "@/models";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AddProductForm } from "@/components/products/add-product-form";
import type { Category as CategoryType } from "@/types";

export default async function AddProductPage() {
  await connectDB();

  const categories = await Category.find().sort({ name: 1 }).lean();
  const serialized: CategoryType[] = JSON.parse(JSON.stringify(categories));

  return (
    <AuthGuard>
      <div className="container-tight section-padding max-w-3xl">
        <AddProductForm categories={serialized} />
      </div>
    </AuthGuard>
  );
}
