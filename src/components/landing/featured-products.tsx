import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
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

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
