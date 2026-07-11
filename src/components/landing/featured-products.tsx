import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
              Featured Collection
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked favorites from our artisans
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/explore?featured=true">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group bg-background rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 space-y-2">
                <p className="text-xs text-primary font-medium uppercase tracking-wider">
                  {product.categoryName}
                </p>
                <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-secondary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
