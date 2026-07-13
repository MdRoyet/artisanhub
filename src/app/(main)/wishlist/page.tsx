"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import { Heart, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { items, totalItems } = useWishlist();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container-tight section-padding">
        <div className="text-center py-20">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Please login to view your wishlist
          </h1>
          <p className="text-muted-foreground mb-8">
            Your wishlist is private. Login to see items you've saved.
          </p>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-tight section-padding">
        <div className="text-center py-20">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Your wishlist is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Save items you love to your wishlist and come back to them anytime.
          </p>
          <Button asChild>
            <Link href="/explore">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Explore Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-tight section-padding">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-8">
        My Wishlist ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>

      <ProductGrid products={items} />
    </div>
  );
}
