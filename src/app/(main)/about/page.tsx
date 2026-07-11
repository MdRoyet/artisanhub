import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const values = [
  {
    title: "Authentic Craftsmanship",
    description:
      "Every product in our marketplace is verified to be genuinely handcrafted. We visit workshops, test techniques, and ensure no mass-produced items slip through.",
    icon: "craft",
  },
  {
    title: "Fair Compensation",
    description:
      "Artisans receive a minimum of 70% of every sale. We believe makers deserve to be paid fairly for their skill, time, and creativity.",
    icon: "fair",
  },
  {
    title: "Cultural Preservation",
    description:
      "Many techniques we support are centuries old and at risk of dying out. Each purchase helps keep these traditions alive for future generations.",
    icon: "culture",
  },
  {
    title: "Sustainable Materials",
    description:
      "We prioritize artisans who use locally sourced, natural, and sustainable materials. No harmful chemicals, no plastic packaging.",
    icon: "eco",
  },
];

const team = [
  {
    name: "Ananya Mehta",
    role: "Founder & CEO",
    bio: "Former textile designer who spent 5 years living with artisan communities across India before founding ArtisanHub in 2021.",
    avatar:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&q=80",
  },
  {
    name: "Carlos Rivera",
    role: "Head of Artisan Relations",
    bio: "A third-generation leather worker from Mexico who now travels the world finding and vetting new artisan partners for our marketplace.",
    avatar:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80",
  },
  {
    name: "Sophie Laurent",
    role: "Creative Director",
    bio: "Trained in fine arts in Paris, Sophie curates our collections and ensures every product meets our aesthetic and quality standards.",
    avatar:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&q=80",
  },
  {
    name: "Kenji Yamamoto",
    role: "Head of Operations",
    bio: "With a background in supply chain management, Kenji ensures every order is carefully packaged and delivered to customers worldwide.",
    avatar:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=200&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="section-padding">
      {/* Hero */}
      <section className="container-tight text-center mb-20">
        <Badge variant="secondary" className="mb-4">
          Our Story
        </Badge>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary max-w-3xl mx-auto leading-tight">
          Connecting Makers with People Who Value Their Craft
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          ArtisanHub was born from a simple belief: the things we use every day
          should be made with care, skill, and intention. We built a platform
          where talented artisans can reach people who appreciate the difference
          between handmade and mass-produced.
        </p>
      </section>

      {/* Mission Section */}
      <section className="container-tight mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
              alt="Artisan working in a workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-secondary">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We exist to create a sustainable ecosystem for traditional
              artisans. In a world increasingly dominated by factory production,
              skilled craftspeople are struggling to find markets for their
              work. We bridge that gap by providing the technology, logistics,
              and community that artisans need to thrive in the modern economy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Since 2021, we have partnered with over 200 artisans across 18
              countries, helping them reach customers who value authenticity and
              are willing to pay fair prices for exceptional handcrafted goods.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-primary">
                  200+
                </p>
                <p className="text-xs text-muted-foreground mt-1">Artisans</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-primary">
                  18
                </p>
                <p className="text-xs text-muted-foreground mt-1">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-primary">
                  15K+
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Products Sold
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-tight mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            What We Stand For
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Our values guide every decision we make, from which artisans we
            partner with to how we package your orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-xl border bg-background hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl">
                  {value.icon === "craft" && "🔥"}
                  {value.icon === "fair" && "⚖️"}
                  {value.icon === "culture" && "🌍"}
                  {value.icon === "eco" && "🌱"}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="container-tight" />

      {/* Team */}
      <section className="container-tight pt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
            The People Behind ArtisanHub
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A small, passionate team dedicated to supporting craftsmanship
            around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="text-center space-y-3 p-6 rounded-xl border bg-background"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-xs text-primary font-medium">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
