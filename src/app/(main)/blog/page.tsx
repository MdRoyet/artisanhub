// src/app/(main)/blog/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "preserving-ancient-pottery-techniques",
    title: "Preserving Ancient Pottery Techniques in Modern India",
    excerpt:
      "A deep dive into how potters in Rajasthan are keeping 500-year-old techniques alive in a world that increasingly values speed over craft.",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    author: "Ananya Mehta",
    category: "Artisan Stories",
    date: "2024-11-15",
    readTime: "8 min read",
  },
  {
    slug: "japanese-kintsugi-philosophy",
    title: "Kintsugi: The Japanese Art of Finding Beauty in Brokenness",
    excerpt:
      "How the centuries-old practice of repairing broken pottery with gold has become a powerful metaphor for resilience and is influencing modern design worldwide.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    author: "Sophie Laurent",
    category: "Craft & Culture",
    date: "2024-10-28",
    readTime: "6 min read",
  },
  {
    slug: "sustainable-leather-tanning-process",
    title: "Why Vegetable-Tanned Leather Is the Future of Sustainable Fashion",
    excerpt:
      "Unlike chrome tanning which uses toxic chemicals, vegetable tanning uses natural bark extracts and produces leather that gets better with age.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    author: "Carlos Rivera",
    category: "Materials & Process",
    date: "2024-10-10",
    readTime: "7 min read",
  },
  {
    slug: "handwoven-textiles-oaxaca",
    title: "The Women of Oaxaca Keeping Textile Traditions Alive",
    excerpt:
      "In the mountains of southern Mexico, women artisans are passing down backstrap loom weaving techniques that predate the Spanish conquest.",
    image:
      "https://images.unsplash.com/photo-1528459105426-b9548367069b?w=800&q=80",
    author: "Ananya Mehta",
    category: "Artisan Stories",
    date: "2024-09-22",
    readTime: "9 min read",
  },
  {
    slug: "guide-to-buying-handmade-jewelry",
    title: "A Buyer's Guide to Authentic Handmade Jewelry",
    excerpt:
      "How to tell the difference between truly handcrafted jewelry and factory-made imitations. What to look for, questions to ask, and red flags to avoid.",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
    author: "Sophie Laurent",
    category: "Buying Guides",
    date: "2024-09-05",
    readTime: "5 min read",
  },
  {
    slug: "woodworking-hand-tools-vs-power",
    title: "Hand Tools vs Power Tools: Why Artisans Choose the Slow Path",
    excerpt:
      "In an age of CNC machines and laser cutters, some woodworkers are deliberately choosing hand tools. Here is why the slower path produces better results.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    author: "Kenji Yamamoto",
    category: "Craft & Culture",
    date: "2024-08-18",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="section-padding">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary">
            The Artisan Journal
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Stories about craft, culture, materials, and the people who make
            extraordinary things by hand.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-2xl border overflow-hidden bg-background hover:shadow-lg transition-shadow">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 lg:p-10 flex flex-col justify-center space-y-4">
              <Badge variant="secondary" className="w-fit">
                {posts[0].category}
              </Badge>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground leading-tight">
                {posts[0].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{posts[0].author}</span>
                <span>-</span>
                <span>{formatDate(posts[0].date)}</span>
                <span>-</span>
                <span>{posts[0].readTime}</span>
              </div>
              <div className="pt-2">
                <Button variant="outline" asChild>
                  <span>
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-xl border bg-background overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <Badge variant="secondary" className="w-fit text-xs">
                  {post.category}
                </Badge>
                <h3 className="font-heading font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex-1" />
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center p-10 rounded-2xl bg-accent/50">
          <h2 className="text-2xl font-heading font-bold text-secondary mb-2">
            Subscribe to The Artisan Journal
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Get our latest stories delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 rounded-lg border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
