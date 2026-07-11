import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container-tight text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent">
          Ready to Discover Something Unique?
        </h2>
        <p className="text-secondary-foreground/70 max-w-xl mx-auto">
          Browse our full collection of handcrafted products and find the
          perfect piece that tells a story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/explore">Explore Collection</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
            asChild
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
