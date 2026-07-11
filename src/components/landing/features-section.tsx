import { Shield, Truck, HandHeart, Globe } from "lucide-react";

const features = [
  {
    icon: HandHeart,
    title: "100% Handcrafted",
    description:
      "Every product is made by hand using traditional techniques. No factory lines, no mass production - just authentic artisan craftsmanship.",
  },
  {
    icon: Truck,
    title: "Worldwide Shipping",
    description:
      "We deliver globally with careful packaging that protects fragile handmade items. Free shipping on orders over $150 within the US.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description:
      "Every item comes with a certificate of authenticity. We personally vet every artisan and verify their materials and methods.",
  },
  {
    icon: Globe,
    title: "Support Artisans Directly",
    description:
      "Artisans receive a fair share of every sale. Your purchase funds their workshops, preserves traditions, and supports local communities.",
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            Why Choose ArtisanHub?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We bridge the gap between skilled artisans and people who value
            authentic, handmade goods.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center space-y-4 p-6 rounded-xl bg-background border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
