"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types";

const MAX_RECENT = 10;
const STORAGE_KEY = "recentlyViewed";

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const trackView = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item._id !== product._id);
      return [product, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { recentlyViewed, trackView, clearRecent };
}
