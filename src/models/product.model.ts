import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProductDocument extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: Types.ObjectId;
  categoryName: string;
  images: string[];
  rating: number;
  reviewCount: number;
  viewCount: number;
  location: string;
  artisan: Types.ObjectId;
  artisanName: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must be less than 100 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [200, "Short description must be less than 200 characters"],
    },
    fullDescription: {
      type: String,
      required: [true, "Full description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one image URL is required",
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, "Review count cannot be negative"],
    },
    viewCount: {
      type: Number,
      default: 0,
      min: [0, "View count cannot be negative"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    artisan: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Artisan is required"],
    },
    artisanName: {
      type: String,
      required: [true, "Artisan name is required"],
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ artisan: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });
ProductSchema.index({ createdAt: -1 });

export default mongoose.models.Product ||
  mongoose.model<IProductDocument>("Product", ProductSchema);
