export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string; // Category _id
  categoryName: string; // denormalized for easy display
  images: string[];
  rating: number; // 0-5 average
  reviewCount: number;
  viewCount: number;
  location: string;
  artisan: string; // User _id
  artisanName: string; // denormalized
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  images: string;
  location: string;
  featured: boolean;
}
