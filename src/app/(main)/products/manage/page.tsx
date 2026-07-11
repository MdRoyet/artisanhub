// src/app/(main)/products/manage/page.tsx

"use client";

import { useAuth } from "@/context/auth-context";
import { AuthGuard } from "@/components/layout/auth-guard";
import { ManageProductsWrapper } from "@/components/products/manage-products-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ManageProductsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <AuthGuard>
      <div className="container-tight section-padding">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-secondary">
              {isAdmin ? "All Products" : "My Products"}
            </h1>
            <p className="mt-1 text-muted-foreground text-sm">
              {isAdmin
                ? "View and manage all products on the platform"
                : "Manage your handcrafted product listings"}
            </p>
          </div>
          <Button asChild>
            <Link href="/products/add">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Product
            </Link>
          </Button>
        </div>

        <ManageProductsWrapper />
      </div>
    </AuthGuard>
  );
}
