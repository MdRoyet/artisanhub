"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import type { Product, Category } from "@/types";

interface EditProductFormProps {
  productId: string;
  categories: Category[];
}

export function EditProductForm({
  productId,
  categories,
}: EditProductFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [images, setImages] = useState("");
  const [location, setLocation] = useState("");
  const [featured, setFeatured] = useState(false);

  // Fetch existing product
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Failed to load product");

        const p: Product = json.data.product;
        setTitle(p.title);
        setShortDescription(p.shortDescription);
        setFullDescription(p.fullDescription);
        setPrice(String(p.price));
        setCategory(p.category);
        setImages(p.images.join(", "));
        setLocation(p.location);
        setFeatured(p.featured);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error("Failed to load product", { description: message });
        router.push("/products/manage");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [productId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const data = {
      title,
      shortDescription,
      fullDescription,
      price,
      category,
      images,
      location,
      featured,
    };

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!title || title.length < 3)
      newErrors.title = "Title must be at least 3 characters";
    if (!shortDescription || shortDescription.length < 10)
      newErrors.shortDescription =
        "Short description must be at least 10 characters";
    if (!fullDescription || fullDescription.length < 20)
      newErrors.fullDescription =
        "Full description must be at least 20 characters";
    if (!price || isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = "Enter a valid price greater than 0";
    if (!category) newErrors.category = "Please select a category";
    if (!location || location.length < 2)
      newErrors.location = "Location must be at least 2 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
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
        throw new Error(json.message || "Failed to update product");
      }

      toast.success("Product updated!", {
        description: `"${title}" has been saved.`,
      });
      router.push("/products/manage");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error("Failed to update product", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

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
          Edit Product
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Update your product listing details
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
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
            {shortDescription.length} / 200
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullDescription">Full Description</Label>
          <Textarea
            id="fullDescription"
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            placeholder="Detailed description of your product..."
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
                $
              </span>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={isSubmitting}
            >
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
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder="Paste image URLs separated by commas"
            rows={3}
            disabled={isSubmitting}
          />
          <p className="text-xs text-muted-foreground">
            Separate multiple URLs with commas. Existing images are shown above.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Jaipur, Rajasthan"
            disabled={isSubmitting}
          />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location}</p>
          )}
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
              Featured products appear on the homepage
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
              Saving Changes...
            </>
          ) : (
            "Save Changes"
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
    </form>
  );
}
