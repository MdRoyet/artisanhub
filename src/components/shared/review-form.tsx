"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { Star, Loader2, LogIn } from "lucide-react";
import Link from "next/link";

interface ReviewFormProps {
  productId: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust if you store token differently in auth-context
        },
        body: JSON.stringify({ rating, comment }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to submit review");
      }

      toast.success("Review submitted!", {
        description: "Thank you for your feedback.",
      });

      // Reset form
      setRating(0);
      setComment("");

      // Refresh the server component to show the new review
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not logged in, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="text-center py-8 rounded-xl border bg-muted/30">
        <LogIn className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground mb-4">
          Please log in to leave a review.
        </p>
        <Button asChild>
          <Link href="/login">Login to Review</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-xl border bg-background space-y-4"
    >
      <div>
        <p className="text-sm font-medium text-foreground mb-2">
          Your Rating <span className="text-destructive">*</span>
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  star <= (hoveredStar || rating)
                    ? "fill-amber-500 text-amber-500"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="text-sm text-muted-foreground self-center ml-2">
              {rating} out of 5
            </span>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-2">
          Your Review <span className="text-destructive">*</span>
        </p>
        <Textarea
          placeholder="Share your experience with this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || rating === 0}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </div>
    </form>
  );
}
