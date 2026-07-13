"use client";

import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
  className?: string;
}

export function ProductActions({ product, className }: ProductActionsProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  return (
    <div className={cn("flex gap-3", className)}>
      <Button size="lg" className="flex-1" onClick={() => addItem(product)}>
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => toggleItem(product)}
        className={cn(
          inWishlist &&
            "bg-primary/10 text-primary border-primary hover:bg-primary/20",
        )}
      >
        <Heart
          className={cn("h-5 w-5", inWishlist && "fill-current")}
        />
      </Button>
    </div>
  );
}
