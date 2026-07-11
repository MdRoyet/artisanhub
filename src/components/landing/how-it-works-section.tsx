// src/components/landing/how-it-works-section.tsx

import { Search, ShoppingCart, Package } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    description:
      "Browse our curated collection of handcrafted products across six artisan categories. Use filters to find exactly what you're looking for.",
  },
  {
    icon: ShoppingCart,
    step: "02",
    title: "Select & Order",
    description:
      "Choose your favorite piece and place your order securely. Each item page shows detailed photos, artisan stories, and care instructions.",
  },
  {
    icon: Package,
    step: "03",
    title: "Receive & Cherish",
    description:
      "Your handmade item is carefully packaged and shipped to your door. Unbox a piece of art that carries the maker's story and skill.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three simple steps to own a piece of authentic craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-border" />

          {steps.map((item) => (
            <div key={item.step} className="relative text-center space-y-4">
              <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto border-4 border-background">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-5xl font-heading font-bold text-primary/10 absolute -top-2 right-4">
                {item.step}
              </span>
              <h3 className="text-xl font-heading font-semibold text-foreground pt-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
