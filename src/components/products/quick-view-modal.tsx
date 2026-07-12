"use client";

import { useState, useEffect } from "react";
import { useQuickView } from "./quick-view-context"; // Keep this relative if in the same folder
import { ImageGallery } from "@/components/shared/image-gallery"; // Fixed path
import { RatingStars } from "@/components/shared/rating-stars"; // Fixed path
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { Loader2, ShoppingCart, Eye, X } from "lucide-react";
import type { Product } from "@/types";
import Link from "next/link";

export function QuickViewModal() {
  const { productId, isOpen, closeQuickView } = useQuickView();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!isOpen || !productId) return;

    const controller = new AbortController();

    async function fetchProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`, {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.success) {
          setProduct(json.data.product);
        }
      } catch {
        // Silently fail — modal just won't show data
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();

    return () => controller.abort();
  }, [isOpen, productId]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeQuickView();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeQuickView]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);

    // Simulate add to cart
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsAdding(false);

    toast.success("Added to cart", {
      description: `${product.title} — ${formatPrice(product.price)}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={closeQuickView}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : product ? (
          <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
            {/* Left: Images */}
            <div className="md:w-[45%] shrink-0">
              <ImageGallery images={product.images} title={product.title} />
            </div>

            {/* Right: Info */}
            <div className="flex-1 p-6 md:p-8 space-y-5 overflow-y-auto">
              {/* Category */}
              <Badge variant="secondary" className="w-fit">
                {product.categoryName}
              </Badge>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground leading-tight">
                {product.title}
              </h2>

              {/* Rating */}
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />

              {/* Price */}
              <div className="text-3xl font-bold text-secondary">
                {formatPrice(product.price)}
              </div>

              {/* Divider */}
              <div className="border-t" />

              {/* Short Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Location
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {product.location}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Artisan
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {product.artisanName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Reviews
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {product.reviewCount} reviews
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Listing Date
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t" />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-4 w-4 mr-2" />
                  )}
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link
                    href={`/products/${product._id}`}
                    onClick={closeQuickView}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-32">
            <p className="text-muted-foreground">Product not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
