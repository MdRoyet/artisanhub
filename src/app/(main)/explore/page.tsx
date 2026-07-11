"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { SearchBar } from "@/components/shared/search-bar";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductPagination } from "@/components/products/product-pagination";
import { Skeleton } from "@/components/ui/skeleton";

function ExploreContent() {
  const searchParams = useSearchParams();

  const {
    products,
    categories,
    isLoading,
    page,
    setPage,
    sort,
    setSort,
    category,
    setCategory,
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    rating,
    setRating,
    totalPages,
    total,
  } = useProducts({
    initialSort: searchParams.get("sort") || "newest",
    initialCategory: searchParams.get("category") || "",
    initialSearch: searchParams.get("search") || "",
  });

  const hasActiveFilters = category || minPrice || maxPrice || rating || search;

  const clearFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSearch("");
    setSort("newest");
  };

  return (
    <>
      {/* Search */}
      <div className="mb-5">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filters - no border box, clean inline look */}
      <div className="mb-8 pb-6 border-b">
        <ProductFilters
          categories={categories}
          category={category}
          setCategory={(value) =>
            setCategory(value === "all_categories" ? "" : value)
          }
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          rating={rating}
          setRating={setRating}
          sort={sort}
          setSort={setSort}
          total={total}
          hasActiveFilters={!!hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        emptyMessage="Try adjusting your search or filters to find what you are looking for."
      />

      {/* Pagination */}
      <ProductPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}

function ExploreFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-11 w-full" />
      <div className="space-y-3 pb-6 border-b">
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-[170px]" />
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[160px]" />
          <Skeleton className="h-10 w-[190px]" />
        </div>
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="container-tight section-padding">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
          Explore Products
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse our full collection of handcrafted artisan products
        </p>
      </div>

      <Suspense fallback={<ExploreFallback />}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}
