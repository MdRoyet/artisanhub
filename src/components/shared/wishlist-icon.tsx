"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

export function WishlistIcon() {
  const { totalItems } = useWishlist();
  const { isAuthenticated } = useAuth();

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href={isAuthenticated ? "/wishlist" : "/login"} aria-label="Wishlist">
        <Heart className="h-5 w-5" />
        {isAuthenticated && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
