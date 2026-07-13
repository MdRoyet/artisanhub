"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import type { Product } from "@/types";

interface RecentlyViewedTrackerProps {
  product: Product;
}

export function RecentlyViewedTracker({ product }: RecentlyViewedTrackerProps) {
  const { trackView } = useRecentlyViewed();

  useEffect(() => {
    trackView(product);
  }, [product, trackView]);

  return null;
}
