// src/components/products/product-filters.tsx

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  SORT_OPTIONS,
  RATING_FILTER_OPTIONS,
  PRICE_RANGES,
} from "@/lib/constants";
import type { Category } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
  category: string;
  setCategory: (value: string) => void;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  rating: string;
  setRating: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  total: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function ProductFilters({
  categories,
  category,
  setCategory,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  rating,
  setRating,
  sort,
  setSort,
  total,
  hasActiveFilters,
  onClearFilters,
}: ProductFiltersProps) {
  const currentPriceValue =
    minPrice || maxPrice ? `${minPrice || "0"}-${maxPrice || ""}` : "";

  const getCategoryLabel = () => {
    if (!category) return null;
    const cat = categories.find((c) => c.slug === category);
    return cat ? cat.name : null;
  };

  const getPriceLabel = () => {
    if (!minPrice && !maxPrice) return null;
    const val = `${minPrice || "0"}-${maxPrice || ""}`;
    const range = PRICE_RANGES.find((r) => r.value === val);
    return range ? range.label : null;
  };

  const getRatingLabel = () => {
    if (!rating) return null;
    const opt = RATING_FILTER_OPTIONS.find((r) => r.value === rating);
    return opt ? opt.label : null;
  };

  return (
    <div className="space-y-4">
      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-sm font-medium text-muted-foreground mr-1 hidden sm:inline">
          Filters:
        </span>

        {/* Category */}
        <Select
          value={category}
          onValueChange={(v) => setCategory(v === "__none__" ? "" : v)}
        >
          <SelectTrigger className="w-[155px] h-9 text-sm">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range */}
        <Select
          value={currentPriceValue}
          onValueChange={(value) => {
            if (value === "__none__") {
              setMinPrice("");
              setMaxPrice("");
              return;
            }
            const range = PRICE_RANGES.find((r) => r.value === value);
            if (range) {
              setMinPrice(range.min);
              setMaxPrice(range.max);
            }
          }}
        >
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <SelectValue placeholder="Any Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">Any Price</SelectItem>
            {PRICE_RANGES.filter((r) => r.value).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rating */}
        <Select
          value={rating}
          onValueChange={(v) => setRating(v === "__none__" ? "" : v)}
        >
          <SelectTrigger className="w-[155px] h-9 text-sm">
            <SelectValue placeholder="Any Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">Any Rating</SelectItem>
            {RATING_FILTER_OPTIONS.filter((r) => r.value).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-border mx-1" />

        {/* Sort */}
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters + Result Count */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{total}</span>{" "}
          {total === 1 ? "product" : "products"}
        </span>

        {getCategoryLabel() && (
          <Badge
            variant="secondary"
            className="gap-1.5 pl-2.5 pr-1.5 py-0.5 text-xs font-normal cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
            onClick={() => setCategory("")}
          >
            {getCategoryLabel()}
            <X className="h-3 w-3" />
          </Badge>
        )}

        {getPriceLabel() && (
          <Badge
            variant="secondary"
            className="gap-1.5 pl-2.5 pr-1.5 py-0.5 text-xs font-normal cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
            }}
          >
            {getPriceLabel()}
            <X className="h-3 w-3" />
          </Badge>
        )}

        {getRatingLabel() && (
          <Badge
            variant="secondary"
            className="gap-1.5 pl-2.5 pr-1.5 py-0.5 text-xs font-normal cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
            onClick={() => setRating("")}
          >
            {getRatingLabel()}
            <X className="h-3 w-3" />
          </Badge>
        )}

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-primary hover:underline font-medium ml-1"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
