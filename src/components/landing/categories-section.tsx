import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            Browse by Category
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore our curated collections across six traditional craft
            disciplines.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/explore?category=${category.slug}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-white font-heading font-bold text-lg md:text-xl">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  {category.productCount} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
