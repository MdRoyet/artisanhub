import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Product } from "@/models";
import { Category } from "@/models";
import { AuthGuard } from "@/components/layout/auth-guard";
import { EditProductForm } from "@/components/products/edit-product-form";
import type { Category as CategoryType } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  await connectDB();

  const product = await Product.findById(id).lean();
  if (!product) notFound();

  const categories = await Category.find().sort({ name: 1 }).lean();
  const serialized: CategoryType[] = JSON.parse(JSON.stringify(categories));

  return (
    <AuthGuard>
      <div className="container-tight section-padding max-w-3xl">
        <EditProductForm productId={id} categories={serialized} />
      </div>
    </AuthGuard>
  );
}
