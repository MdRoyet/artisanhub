import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Product, Review, Category } from "@/models";
import { ImageGallery } from "@/components/shared/image-gallery";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { RatingStars } from "@/components/shared/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDate } from "@/lib/utils";
import { ProductGrid } from "@/components/products/product-grid";
import type { Product as ProductType, Review as ReviewType } from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).lean();

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  await connectDB();

  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  const reviews = await Review.find({ product: id })
    .sort({ createdAt: -1 })
    .lean();

  // Related products: same category, exclude current
  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  const serialized: ProductType = JSON.parse(JSON.stringify(product));
  const serializedReviews: ReviewType[] = JSON.parse(JSON.stringify(reviews));
  const serializedRelated: ProductType[] = JSON.parse(JSON.stringify(related));

  const category = await Category.findById(product.category).lean();
  const categorySlug = category ? (category as { slug: string }).slug : "";

  return (
    <div className="container-tight section-padding">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Explore", href: "/explore" },
          {
            label: serialized.categoryName,
            href: `/explore?category=${categorySlug}`,
          },
          { label: serialized.title },
        ]}
      />

      {/* Main Content: Image + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image Gallery */}
        <ImageGallery images={serialized.images} title={serialized.title} />

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category Badge */}
          <Badge variant="secondary" className="text-xs font-medium">
            {serialized.categoryName}
          </Badge>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
            {serialized.title}
          </h1>

          {/* Rating */}
          <RatingStars
            rating={serialized.rating}
            reviewCount={serialized.reviewCount}
            size="md"
          />

          {/* Price */}
          <div className="text-3xl font-bold text-secondary">
            {formatPrice(serialized.price)}
          </div>

          <Separator />

          {/* Short Description */}
          <p className="text-muted-foreground leading-relaxed">
            {serialized.shortDescription}
          </p>

          <Separator />

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Location" value={serialized.location} />
            <InfoItem label="Artisan" value={serialized.artisanName} />
            <InfoItem
              label="Category"
              value={serialized.categoryName}
              href={`/explore?category=${categorySlug}`}
            />
            <InfoItem
              label="Reviews"
              value={`${serialized.reviewCount} reviews`}
            />
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Full Description Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-secondary mb-4">
          Description
        </h2>
        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
          {serialized.fullDescription}
        </div>
      </section>

      {/* Specifications Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-secondary mb-4">
          Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 rounded-xl border overflow-hidden">
          <SpecRow label="Category" value={serialized.categoryName} />
          <SpecRow label="Price" value={formatPrice(serialized.price)} />
          <SpecRow label="Rating" value={`${serialized.rating} out of 5`} />
          <SpecRow label="Location" value={serialized.location} />
          <SpecRow label="Artisan" value={serialized.artisanName} />
          <SpecRow label="Listed On" value={formatDate(serialized.createdAt)} />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-secondary">
            Reviews ({serializedReviews.length})
          </h2>
        </div>

        {serializedReviews.length === 0 ? (
          <div className="text-center py-12 rounded-xl border bg-muted/30">
            <p className="text-muted-foreground">
              No reviews yet. Be the first to share your experience with this
              product.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {serializedReviews.map((review) => (
              <div
                key={review._id}
                className="p-5 rounded-xl border bg-background"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {review.userName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <RatingStars
                    rating={review.rating}
                    showCount={false}
                    size="sm"
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Products */}
      {serializedRelated.length > 0 && (
        <section>
          <h2 className="text-2xl font-heading font-bold text-secondary mb-6">
            More from {serialized.categoryName}
          </h2>
          <ProductGrid products={serializedRelated} />
        </section>
      )}
    </div>
  );
}

// --- Sub-components ---

function InfoItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center px-5 py-3.5 bg-background even:bg-muted/30">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
