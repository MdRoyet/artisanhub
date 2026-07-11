// src/lib/constants.ts

export const APP_NAME = "ArtisanHub";
export const APP_DESCRIPTION =
  "Discover unique handcrafted products from skilled artisans around the world.";

export const ITEMS_PER_PAGE = 8;

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating-desc" },
  { label: "Most Reviewed", value: "reviews-desc" },
] as const;

export const RATING_FILTER_OPTIONS = [
  { label: "All Ratings", value: "" },
  { label: "4â˜… & above", value: "4" },
  { label: "3â˜… & above", value: "3" },
  { label: "2â˜… & above", value: "2" },
] as const;

export const PRICE_RANGES = [
  { label: "All Prices", value: "" },
  { label: "Under $25", min: "0", max: "25" },
  { label: "$25 â€“ $50", min: "25", max: "50" },
  { label: "$50 â€“ $100", min: "50", max: "100" },
  { label: "$100 â€“ $200", min: "100", max: "200" },
  { label: "Over $200", min: "200", max: "" },
] as const;

export const NAV_LINKS_PUBLIC = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const NAV_LINKS_AUTHENTICATED = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Add Product", href: "/products/add" },
  { label: "My Products", href: "/products/manage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  marketplace: [
    { label: "Explore Products", href: "/explore" },
    { label: "Categories", href: "/explore" },
    { label: "New Arrivals", href: "/explore?sort=newest" },
    { label: "Featured", href: "/explore?featured=true" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  support: [
    { label: "Help Center", href: "/contact" },
    { label: "Shipping Info", href: "/contact" },
    { label: "Returns", href: "/contact" },
    { label: "Terms of Service", href: "/privacy" },
  ],
} as const;

export const HERO_SLIDES = [
  {
    title: "Handcrafted with Passion",
    subtitle:
      "Discover unique artisan products made with traditional techniques passed down through generations.",
    cta: "Explore Collection",
    ctaHref: "/explore",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200&q=80",
  },
  {
    title: "Support Local Artisans",
    subtitle:
      "Every purchase directly supports skilled craftspeople and keeps ancient art forms alive.",
    cta: "Meet Our Artisans",
    ctaHref: "/about",
    image:
      "https://images.unsplash.com/photo-1556442261-e5e1dade909e?w=1200&q=80",
  },
  {
    title: "One of a Kind",
    subtitle:
      "No two pieces are identical. Find something truly unique that tells a story.",
    cta: "Shop Now",
    ctaHref: "/explore",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&q=80",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Interior Designer",
    avatar:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&q=80",
    comment:
      "ArtisanHub transformed my clients' homes. The terracotta dinner set and handwoven throws are always conversation starters. The quality is unmatched by anything I've found in retail stores.",
    rating: 5,
  },
  {
    name: "James Walker",
    role: "Collector",
    avatar:
      "https://images.unsplash.com/photo-1556442261-e5e1dade909e?w=200&q=80",
    comment:
      "I've ordered six different pieces over the past year and each one exceeded my expectations. The hammered gold band is my daily wear now. You can feel the craftsmanship in every detail.",
    rating: 5,
  },
  {
    name: "Nina Kowalski",
    role: "Fashion Stylist",
    avatar:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&q=80",
    comment:
      "The silk scarf I ordered has the most beautiful gradient I've ever seen. My clients always ask where I find these unique pieces. ArtisanHub is my secret weapon for styling.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Restaurant Owner",
    avatar:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=200&q=80",
    comment:
      "We replaced all our serving ware with ArtisanHub pieces. The block-printed cotton throws and Blue Willow platters give our restaurant an authentic, curated feel that our customers love.",
    rating: 4,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Are the products truly handcrafted?",
    answer:
      "Yes, every product on ArtisanHub is made entirely by hand. We work directly with artisans who use traditional techniques passed down through generations. No two pieces are exactly alike, which is part of their charm and value.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Since each item is made to order or sourced from artisan workshops, please allow 7-14 business days for domestic orders and 14-21 business days for international orders. You will receive tracking information once your order ships.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery for items in their original condition. Due to the handmade nature of our products, slight variations in color, size, and texture are not considered defects but rather hallmarks of authentic craftsmanship.",
  },
  {
    question: "How do I care for my handcrafted item?",
    answer:
      "Each product comes with specific care instructions. Generally, hand-washing is recommended for ceramics and textiles. Leather goods should be kept dry and conditioned periodically. Wood items should be treated with food-safe mineral oil every few months.",
  },
  {
    question: "Can I commission a custom piece?",
    answer:
      "Many of our artisans accept custom commissions. You can browse their profiles and reach out directly through the 'Contact Artisan' button on any product page. Custom orders typically take 3-6 weeks depending on complexity.",
  },
  {
    question: "How are artisans verified on ArtisanHub?",
    answer:
      "We have a rigorous vetting process that includes studio visits, quality assessments of their work, and verification of their techniques and materials. We only partner with artisans who meet our standards for skill, ethical sourcing, and sustainable practices.",
  },
] as const;
