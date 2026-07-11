// src/app/(main)/explore/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { SearchBar } from "@/components/shared/search-bar";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductPagination } from "@/components/products/product-pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExplorePage() {
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

      {/* Search */}
      <div className="mb-5">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filters */}
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
    </div>
  );
}
