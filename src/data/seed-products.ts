// src/data/seed-products.ts

export interface SeedProduct {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  categorySlug: string;
  images: string[];
  rating: number;
  reviewCount: number;
  location: string;
  artisanEmail: string;
  featured: boolean;
}

export const products: SeedProduct[] = [
  {
    title: "Terracotta Dinner Set - Earth Tones",
    shortDescription:
      "A complete hand-thrown dinner set for four in warm terracotta glazes with subtle organic variations.",
    fullDescription:
      "This stunning dinner set includes four dinner plates, four salad plates, four bowls, and four mugs, each hand-thrown on a traditional kick wheel. The terracotta glaze is applied in multiple layers and fired at 1200 degrees Celsius for a durable, food-safe finish.",
    price: 245,
    categorySlug: "pottery",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 42,
    location: "Jaipur, Rajasthan",
    artisanEmail: "artisan@demo.com",
    featured: true,
  },
  {
    title: "Celadon Glaze Vase - Moonlight Series",
    shortDescription:
      "A tall elegant vase with a crackled celadon glaze inspired by Song Dynasty ceramics.",
    fullDescription:
      "Standing at 35cm tall, this vase is thrown from fine porcelain clay and coated with a traditional celadon glaze that develops its characteristic crackle pattern during cooling. The pale green-blue tone shifts subtly in different lighting.",
    price: 189,
    categorySlug: "pottery",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 28,
    location: "Kyoto, Japan",
    artisanEmail: "yuki@demo.com",
    featured: true,
  },
  {
    title: "Hand-Painted Serving Platter - Blue Willow",
    shortDescription:
      "A large oval serving platter featuring hand-painted Blue Willow pattern on cream stoneware.",
    fullDescription:
      "This generous 40cm oval platter is hand-painted with the iconic Blue Willow pattern using cobalt oxide underglaze. Each piece requires over two hours of detailed brushwork. Dishwasher and microwave safe.",
    price: 95,
    categorySlug: "pottery",
    images: [
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 19,
    location: "Stoke-on-Trent, UK",
    artisanEmail: "marco@demo.com",
    featured: false,
  },
  {
    title: "Raku-Fired Tea Bowl - Chawan",
    shortDescription:
      "A traditional Japanese tea bowl with unique raku-fired copper glaze patterns.",
    fullDescription:
      "This chawan is created using the ancient raku firing technique, where the glowing hot bowl is pulled from the kiln at 1000 degrees and placed in combustible material. The rapid cooling creates unpredictable copper and gold luster patterns.",
    price: 135,
    categorySlug: "pottery",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
    ],
    rating: 5.0,
    reviewCount: 14,
    location: "Mashiko, Japan",
    artisanEmail: "yuki@demo.com",
    featured: false,
  },
  {
    title: "Hammered Gold Band - Organic Texture",
    shortDescription:
      "A wide 14k gold band with a hand-hammered organic texture that catches light beautifully.",
    fullDescription:
      "This statement band is crafted from solid 14k yellow gold, hand-hammered to create an organic, cratered texture that sparkles in any light. The 8mm width makes it suitable as a wedding band or standalone piece.",
    price: 385,
    categorySlug: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 36,
    location: "Florence, Italy",
    artisanEmail: "marco@demo.com",
    featured: true,
  },
  {
    title: "Silver Leaf Pendant - Nature Collection",
    shortDescription:
      "A delicate sterling silver pendant hand-sculpted into a realistic maple leaf shape.",
    fullDescription:
      "Each leaf pendant is individually sculpted from sterling silver sheet using chasing and repousse techniques. The veins are hand-engraved. Comes with an 18-inch sterling silver chain.",
    price: 78,
    categorySlug: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 53,
    location: "Santa Fe, New Mexico",
    artisanEmail: "artisan@demo.com",
    featured: true,
  },
  {
    title: "Beaded Bohemian Necklace - Multicolor",
    shortDescription:
      "A layered bohemian necklace featuring hand-knotted glass beads, brass accents, and silk tassels.",
    fullDescription:
      "This eye-catching three-strand necklace combines hand-blown glass beads in amber, teal, and cream with tiny brass spacer beads. Each strand is hand-knotted on silk thread. Adjustable length from 16 to 22 inches.",
    price: 62,
    categorySlug: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    ],
    rating: 4.4,
    reviewCount: 27,
    location: "Istanbul, Turkey",
    artisanEmail: "marco@demo.com",
    featured: false,
  },
  {
    title: "Turquoise Cuff Bracelet - Southwest Style",
    shortDescription:
      "A wide sterling silver cuff bracelet set with a natural turquoise cabochon.",
    fullDescription:
      "This bold cuff bracelet features a 20x15mm natural turquoise stone set in a handmade sterling silver bezel. The cuff is decorated with hand-stamped geometric patterns inspired by Navajo silversmithing traditions.",
    price: 220,
    categorySlug: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 31,
    location: "Gallup, New Mexico",
    artisanEmail: "artisan@demo.com",
    featured: false,
  },
  {
    title: "Handwoven Silk Scarf - Indigo Gradient",
    shortDescription:
      "A luxurious silk scarf with a hand-dyed indigo gradient pattern on a traditional floor loom.",
    fullDescription:
      "This 180x50cm scarf is woven from pure mulberry silk on a traditional handloom, then dip-dyed in natural indigo to create a stunning gradient from deep midnight blue to pale sky blue. The natural indigo dye improves with washing.",
    price: 145,
    categorySlug: "textiles",
    images: [
      "https://images.unsplash.com/photo-1528459105426-b9548367069b?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 44,
    location: "Okinawa, Japan",
    artisanEmail: "yuki@demo.com",
    featured: true,
  },
  {
    title: "Block-Printed Cotton Throw - Mughal Garden",
    shortDescription:
      "A large cotton throw blanket with hand block-printed Mughal floral motifs in crimson and gold.",
    fullDescription:
      "This generous 150x200cm throw is printed entirely by hand using carved wooden blocks dipped in natural pigment dyes. The Mughal Garden pattern features intertwining vines and ornate borders. A single throw involves over 300 block impressions.",
    price: 85,
    categorySlug: "textiles",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1528459105426-b9548367069b?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 38,
    location: "Jaipur, Rajasthan",
    artisanEmail: "artisan@demo.com",
    featured: false,
  },
  {
    title: "Embroidered Table Runner - Oaxacan Flowers",
    shortDescription:
      "A vibrant hand-embroidered table runner featuring traditional Oaxacan floral designs on natural linen.",
    fullDescription:
      "This 180x40cm table runner is hand-embroidered by artisans in Oaxaca using the traditional satin stitch technique. The colorful floral motifs feature dahlias, marigolds, and bougainvillea in vivid colors. Machine washable on gentle cycle.",
    price: 72,
    categorySlug: "textiles",
    images: [
      "https://images.unsplash.com/photo-1528459105426-b9548367069b?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 22,
    location: "Oaxaca, Mexico",
    artisanEmail: "marco@demo.com",
    featured: false,
  },
  {
    title: "Walnut Cutting Board - Live Edge",
    shortDescription:
      "A hand-finished black walnut cutting board with a natural live edge and food-safe mineral oil finish.",
    fullDescription:
      "This cutting board is crafted from a single slab of locally sourced black walnut, preserving the natural live edge. The surface is hand-planed and sanded to a 2000-grit finish, then sealed with three coats of food-safe mineral oil and beeswax. Measures 45x25cm.",
    price: 120,
    categorySlug: "woodwork",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 65,
    location: "Vermont, USA",
    artisanEmail: "marco@demo.com",
    featured: true,
  },
  {
    title: "Hand-Carved Wooden Spoon Set",
    shortDescription:
      "A set of five hand-carved olive wood cooking spoons with unique natural grain patterns.",
    fullDescription:
      "Each spoon in this set of five is carved by hand from Mediterranean olive wood using traditional hook knives. The set includes a stirring spoon, slotted spoon, flat spatula, tasting spoon, and a small serving spoon. Olive wood is naturally antibacterial.",
    price: 68,
    categorySlug: "woodwork",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 49,
    location: "Tuscany, Italy",
    artisanEmail: "marco@demo.com",
    featured: false,
  },
  {
    title: "Japanese Joinery Shelf - No Screws",
    shortDescription:
      "A floating wall shelf assembled entirely with traditional Japanese joinery.",
    fullDescription:
      "This 60cm wall shelf demonstrates the ancient Japanese art of wood joinery, where complex interlocking cuts hold the piece together without any metal hardware. Made from solid ash wood with a through-tenon and wedge joint.",
    price: 195,
    categorySlug: "woodwork",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 17,
    location: "Kyoto, Japan",
    artisanEmail: "yuki@demo.com",
    featured: false,
  },
  {
    title: "Full-Grain Leather Tote - Vegetable Tanned",
    shortDescription:
      "A spacious hand-stitched tote bag made from Italian vegetable-tanned leather.",
    fullDescription:
      "This classic tote is cut from a single hide of Italian full-grain vegetable-tanned leather and hand-stitched with waxed linen thread using a traditional saddle stitch. The 40x35x12cm interior features a zip pocket and two slip pockets.",
    price: 310,
    categorySlug: "leather-goods",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 56,
    location: "Florence, Italy",
    artisanEmail: "marco@demo.com",
    featured: true,
  },
  {
    title: "Leather Journal - Hand-Bound",
    shortDescription:
      "A refillable leather journal with hand-stitched Coptic binding and 200 pages of cotton paper.",
    fullDescription:
      "This A5 journal features a wrap-around leather cover with a natural bark texture and hand-braided leather closure. Inside, 200 pages of acid-free cotton rag paper are bound using the Coptic stitch method, allowing the journal to lay completely flat.",
    price: 55,
    categorySlug: "leather-goods",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 71,
    location: "Jaipur, Rajasthan",
    artisanEmail: "artisan@demo.com",
    featured: false,
  },
  {
    title: "Minimalist Leather Wallet - Bifold",
    shortDescription:
      "A slim bifold wallet in Horween leather with hand-burnished edges and six card slots.",
    fullDescription:
      "This minimalist bifold is crafted from Horween Chromexcel leather, renowned for its rich pull-up effect and exceptional durability. Features six card slots, two bill compartments, and a hidden pocket in a compact 11x9cm package.",
    price: 89,
    categorySlug: "leather-goods",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 83,
    location: "Chicago, USA",
    artisanEmail: "marco@demo.com",
    featured: false,
  },
  {
    title: "Hand-Forged Wok - Carbon Steel",
    shortDescription:
      "A 14-inch carbon steel wok hand-forged from a single sheet and seasoned with flaxseed oil.",
    fullDescription:
      "This wok is hammer-forged by hand from a single disc of 2mm carbon steel, creating a slightly irregular shape that improves stir-fry performance by creating hot and cool zones. Pre-seasoned with three coats of flaxseed oil.",
    price: 135,
    categorySlug: "metalwork",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 39,
    location: "Bangkok, Thailand",
    artisanEmail: "yuki@demo.com",
    featured: true,
  },
  {
    title: "Copper Hammered Planter - Medium",
    shortDescription:
      "A hand-hammered pure copper planter with a living patina that evolves over time.",
    fullDescription:
      "This 25cm diameter planter is formed from 1.2mm pure copper sheet, hand-hammered into a rounded form. No lacquer is applied, allowing the copper to develop a natural living patina. Includes a matching copper drip tray and drainage holes.",
    price: 165,
    categorySlug: "metalwork",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 24,
    location: "Santa Clara del Cobre, Mexico",
    artisanEmail: "marco@demo.com",
    featured: false,
  },
];
