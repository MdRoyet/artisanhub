import { Product } from "./product";
import { Category } from "./category";
import { User } from "./user";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalArtisans: number;
  averageRating: number;
}
