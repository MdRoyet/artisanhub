import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group flex flex-col bg-background rounded-xl border shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
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

        {/* View Details Button - appears on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button size="sm" className="w-full shadow-lg" tabIndex={-1}>
            View Details
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 space-y-2">
        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

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
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {product.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
