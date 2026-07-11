// src/components/products/manage-products.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatPrice, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  Eye,
  Pencil,
  Trash2,
  Loader2,
  PackageOpen,
  MoreVertical,
} from "lucide-react";
import type { Product } from "@/types";

interface ManageProductsProps {
  userId: string;
}

export function ManageProducts({ userId }: ManageProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products?limit=100");
      const json = await res.json();
      if (json.success) {
        const myProducts = json.data.filter(
          (p: Product) => p.artisan === userId,
        );
        setProducts(myProducts);
      }
    } catch {
      toast.error("Failed to load your products");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeletingId(productId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Delete failed");

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Product deleted", {
        description: `"${title}" has been removed.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete";
      toast.error("Delete failed", { description: message });
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl border animate-pulse"
          >
            <div className="w-14 h-14 rounded-lg bg-muted shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-muted" />
              <div className="h-3 w-1/4 rounded bg-muted" />
            </div>
            <div className="h-9 w-24 rounded-md bg-muted" />
            <div className="h-9 w-24 rounded-md bg-muted" />
            <div className="h-9 w-9 rounded-md bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
          <PackageOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No products yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
          You have not listed any products yet. Start by adding your first
          handcrafted item.
        </p>
        <Button asChild>
          <Link href="/products/add">Add Your First Product</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Desktop Table Header */}
      <div className="hidden md:grid md:grid-cols-[64px_1fr_100px_100px_100px_48px] gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <span>Image</span>
        <span>Product</span>
        <span>Price</span>
        <span>Rating</span>
        <span>Date</span>
        <span></span>
      </div>

      {products.map((product) => (
        <div
          key={product._id}
          className="grid grid-cols-1 md:grid-cols-[64px_1fr_100px_100px_100px_48px] gap-3 md:gap-4 items-center p-4 rounded-xl border bg-background hover:shadow-sm transition-shadow"
        >
          {/* Image */}
          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0 mx-auto md:mx-0">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          {/* Product Info */}
          <div className="text-center md:text-left space-y-1 min-w-0">
            <Link
              href={`/products/${product._id}`}
              className="font-medium text-sm text-foreground hover:text-primary transition-colors line-clamp-1 block"
            >
              {product.title}
            </Link>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {product.categoryName}
              </Badge>
              {product.featured && (
                <Badge className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0">
                  Featured
                </Badge>
              )}
            </div>
            {/* Mobile-only info */}
            <div className="flex items-center justify-center gap-4 text-sm md:hidden pt-1">
              <span className="font-semibold text-secondary">
                {formatPrice(product.price)}
              </span>
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="sm"
              />
              <span className="text-xs text-muted-foreground">
                {formatDate(product.createdAt)}
              </span>
            </div>
          </div>

          {/* Price (desktop) */}
          <div className="hidden md:block">
            <span className="font-semibold text-secondary text-sm">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Rating (desktop) */}
          <div className="hidden md:block">
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="sm"
            />
          </div>

          {/* Date (desktop) */}
          <div className="hidden md:block">
            <span className="text-xs text-muted-foreground">
              {formatDate(product.createdAt)}
            </span>
          </div>

          {/* Actions Dropdown */}
          <div className="flex items-center justify-center md:justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/products/${product._id}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/products/${product._id}/edit`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDelete(product._id, product.title)}
                  disabled={deletingId === product._id}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                >
                  {deletingId === product._id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}

      {/* Footer count */}
      <div className="pt-4 text-sm text-muted-foreground text-center md:text-left">
        {products.length} {products.length === 1 ? "product" : "products"}{" "}
        listed
      </div>
    </div>
  );
}
