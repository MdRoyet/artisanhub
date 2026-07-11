// src/components/products/add-product-form.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Category } from "@/types";

interface AddProductFormProps {
  categories: Category[];
}

export function AddProductForm({ categories }: AddProductFormProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [featured, setFeatured] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      shortDescription: formData.get("shortDescription") as string,
      fullDescription: formData.get("fullDescription") as string,
      price: formData.get("price") as string,
      category: formData.get("category") as string,
      images: formData.get("images") as string,
      location: formData.get("location") as string,
      featured,
    };

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!data.title || data.title.length < 3)
      newErrors.title = "Title must be at least 3 characters";
    if (!data.shortDescription || data.shortDescription.length < 10)
      newErrors.shortDescription =
        "Short description must be at least 10 characters";
    if (!data.fullDescription || data.fullDescription.length < 20)
      newErrors.fullDescription =
        "Full description must be at least 20 characters";
    if (!data.price || isNaN(Number(data.price)) || Number(data.price) <= 0)
      newErrors.price = "Enter a valid price greater than 0";
    if (!data.category) newErrors.category = "Please select a category";
    if (!data.location || data.location.length < 2)
      newErrors.location = "Location must be at least 2 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.errors) {
          const fieldErrors: Record<string, string> = {};
          Object.entries(json.errors).forEach(([key, msgs]) => {
            fieldErrors[key] = (msgs as string[])[0];
          });
          setErrors(fieldErrors);
        }
        throw new Error(json.message || "Failed to create product");
      }

      toast.success("Product created!", {
        description: `"${data.title}" has been listed successfully.`,
      });
      router.push("/products/manage");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error("Failed to create product", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/products/manage"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to My Products
        </Link>
        <h1 className="text-3xl font-heading font-bold text-secondary">
          Add New Product
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          List a new handcrafted product on ArtisanHub
        </p>
      </div>

      {/* Basic Info */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-foreground border-b pb-2">
          Basic Information
        </h2>

        <div className="space-y-2">
          <Label htmlFor="title">Product Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Hand-Thrown Ceramic Vase"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description</Label>
          <Textarea
            id="shortDescription"
            name="shortDescription"
            placeholder="A brief one-liner that appears on product cards (10-200 characters)"
            rows={2}
            disabled={isSubmitting}
          />
          {errors.shortDescription && (
            <p className="text-sm text-destructive">
              {errors.shortDescription}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {
              (
                (
                  document.getElementById(
                    "shortDescription",
                  ) as HTMLTextAreaElement
                )?.value || ""
              ).length
            }{" "}
            / 200
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullDescription">Full Description</Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            placeholder="Detailed description of your product - materials used, crafting process, dimensions, care instructions..."
            rows={6}
            disabled={isSubmitting}
          />
          {errors.fullDescription && (
            <p className="text-sm text-destructive">{errors.fullDescription}</p>
          )}
        </div>
      </div>

      {/* Pricing & Category */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-foreground border-b pb-2">
          Pricing & Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ${" "}
              </span>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="pl-7"
                disabled={isSubmitting}
              />
            </div>
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category}</p>
            )}
          </div>
        </div>
      </div>

      {/* Images & Location */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-foreground border-b pb-2">
          Images & Location
        </h2>

        <div className="space-y-2">
          <Label htmlFor="images">Image URLs</Label>
          <Textarea
            id="images"
            name="images"
            placeholder="Paste image URLs separated by commas. Leave empty for a default image.&#10;e.g. https://images.unsplash.com/photo-xxx?w=800&q=80, https://images.unsplash.com/photo-yyy?w=800&q=80"
            rows={3}
            disabled={isSubmitting}
          />
          <p className="text-xs text-muted-foreground">
            Separate multiple URLs with commas. A default image will be used if
            left empty.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g. Jaipur, Rajasthan"
            disabled={isSubmitting}
          />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Where the product is made or shipped from
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-foreground border-b pb-2">
          Options
        </h2>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="featured" className="text-sm font-medium">
              Featured Product
            </Label>
            <p className="text-xs text-muted-foreground">
              Featured products appear on the homepage and are highlighted in
              search results
            </p>
          </div>
          <Switch
            id="featured"
            checked={featured}
            onCheckedChange={setFeatured}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <Button
          type="submit"
          size="lg"
          className="sm:flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Product...
            </>
          ) : (
            "Create Product"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>

      {/* Hidden info */}
      <input type="hidden" name="artisanName" value={user?.name || ""} />
    </form>
  );
}
