"use client";

import { useEffect } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  productId: string;
  initialCount: number;
}

export function ViewCounter({ productId, initialCount }: ViewCounterProps) {
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch(`/api/products/${productId}/view`, { method: "POST" });
      } catch {
        // Silently fail - view tracking is non-critical
      }
    };

    trackView();
  }, [productId]);

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>{initialCount} views</span>
    </div>
  );
}
