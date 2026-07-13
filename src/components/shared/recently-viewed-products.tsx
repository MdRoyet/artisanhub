"use client";

import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { ProductGrid } from "@/components/products/product-grid";
import { Clock } from "lucide-react";

export function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-5 w-5 text-secondary" />
          <h2 className="text-2xl font-heading font-bold text-secondary">
            Recently Viewed
          </h2>
        </div>
        <ProductGrid products={recentlyViewed} />
      </div>
    </section>
  );
}
