"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import { useQuickView } from "@/components/products/quick-view-context";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { Eye, ShoppingCart, MapPin } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { openQuickView } = useQuickView();

  return (
    <div className="group flex flex-col bg-background rounded-xl border shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm text-foreground border-0 shadow-sm text-xs font-medium"
          >
            {product.categoryName}
          </Badge>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground border-0 shadow-sm text-xs font-medium">
              Featured
            </Badge>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Hover Action Buttons */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1 shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product._id);
            }}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            Quick View
          </Button>
          <Button
            size="sm"
            className="shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product._id);
            }}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 space-y-2">
        {/* Title */}
        <Link
          href={`/products/${product._id}`}
          className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors"
        >
          {product.title}
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="pt-1">
          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & Location */}
        <div className="flex items-end justify-between pt-2 border-t">
          <span className="text-xl font-bold text-secondary">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {product.viewCount}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {product.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
