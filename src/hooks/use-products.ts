"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product, PaginatedResponse, Category } from "@/types";
import { useDebounce } from "./use-debounce";

interface UseProductsOptions {
  initialPage?: number;
  initialLimit?: number;
  initialSort?: string;
  initialCategory?: string;
  initialSearch?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const {
    initialPage = 1,
    initialLimit = 8,
    initialSort = "newest",
    initialCategory = "",
    initialSearch = "",
  } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [sort, setSort] = useState(initialSort);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const debouncedSearch = useDebounce(search, 400);

  // Fetch categories on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((json: { success: boolean; data: Category[] }) => {
        if (json.success) setCategories(json.data);
      })
      .catch(() => {});
  }, []);

  // Fetch products whenever filters change
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);

    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (rating) params.set("rating", rating);
    if (sort) params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", String(limit));

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const json: PaginatedResponse<Product> = await res.json();

      if (json.success) {
        setProducts(json.data);
        setTotalPages(json.pagination.totalPages);
        setTotal(json.pagination.total);
      }
    } catch {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    debouncedSearch,
    category,
    minPrice,
    maxPrice,
    rating,
    sort,
    page,
    limit,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, minPrice, maxPrice, rating, sort]);

  return {
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
    refetch: fetchProducts,
  };
}
