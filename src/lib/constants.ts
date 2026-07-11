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
  { label: "4★ & above", value: "4" },
  { label: "3★ & above", value: "3" },
  { label: "2★ & above", value: "2" },
] as const;

export const PRICE_RANGES = [
  { label: "All Prices", value: "" },
  { label: "Under $25", min: "0", max: "25" },
  { label: "$25 – $50", min: "25", max: "50" },
  { label: "$50 – $100", min: "50", max: "100" },
  { label: "$100 – $200", min: "100", max: "200" },
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
