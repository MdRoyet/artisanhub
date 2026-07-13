# ArtisanHub

A modern marketplace platform connecting skilled artisans with customers who appreciate handcrafted products. Built with Next.js 16, MongoDB, and Tailwind CSS.

![ArtisanHub](https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200&q=80)

## Features

### Core Marketplace

- **Product Listings** — Browse handcrafted products with detailed descriptions, multiple images, and pricing
- **Advanced Filtering** — Filter by category, price range, rating, and search terms
- **Sorting Options** — Sort by newest, oldest, price (low/high), rating, or most reviewed
- **Product Details** — View full product information with image gallery, specifications, and related items
- **Live View Counter** — Track product views in real-time
- **Review System** — Rate and review products with star ratings and comments

### User Features

- **Authentication** — Secure JWT-based login and registration
- **User Profiles** — Manage your artisan profile
- **Artisan Dashboard** — View statistics, manage products, and track performance
- **Add Products** — List your handcrafted items with images, descriptions, and pricing
- **My Products** — Manage your listed products

### User Interface

- **Responsive Design** — Seamless experience across desktop, tablet, and mobile
- **Dark/Light Theme** — Toggle between themes with system preference detection
- **Hero Slider** — Animated hero section with featured content
- **Quick View** — Preview products without leaving the current page
- **Image Gallery** — Full-screen product image viewer
- **Skeleton Loading** — Smooth loading states throughout the app

### Landing Page Sections

- Hero Section with animated slides
- Features showcase
- Product categories
- Featured products
- How it works guide
- Statistics counter
- Customer testimonials
- Newsletter signup
- FAQ accordion
- Call-to-action section

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI, shadcn/ui, Lucide Icons |
| Database | MongoDB with Mongoose 9 |
| Authentication | JWT (jsonwebtoken, bcryptjs) |
| Validation | Zod 4 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |

## Project Structure

```
artisanhub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Auth pages (login, register)
│   │   ├── (main)/             # Main layout pages
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── explore/        # Product exploration
│   │   │   ├── products/       # Product details
│   │   │   ├── about/          # About page
│   │   │   └── contact/        # Contact page
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── products/       # Product CRUD + views
│   │   │   ├── categories/     # Category endpoints
│   │   │   └── dashboard/      # Dashboard statistics
│   │   └── dashboard/          # Artisan dashboard
│   ├── components/             # React components
│   │   ├── landing/            # Landing page sections
│   │   ├── products/           # Product-related components
│   │   ├── shared/             # Shared UI components
│   │   ├── layout/             # Layout components (navbar, footer)
│   │   ├── auth/               # Auth forms
│   │   └── ui/                 # shadcn/ui components
│   ├── context/                # React contexts (auth, theme)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, constants, validations
│   ├── models/                 # Mongoose models
│   ├── types/                  # TypeScript type definitions
│   └── data/                   # Seed data
├── public/                     # Static assets
├── .env.example                # Environment variables template
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20)
- MongoDB instance (local or Atlas)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/artisanhub.git
   cd artisanhub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values:

   ```env
   MONGODB_URI=mongodb://localhost:27017/artisanhub
   JWT_SECRET=your-super-secret-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Seed the database** (optional)

   ```bash
   npm run seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with sample data |

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (with filters) |
| POST | `/api/products` | Create product |
| GET | `/api/products/[id]` | Get product details |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |
| POST | `/api/products/[id]/view` | Increment view count |
| GET | `/api/products/[id]/reviews` | Get product reviews |
| POST | `/api/products/[id]/reviews` | Add product review |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics |

## Database Models

### User

- `name` — User's display name
- `email` — Unique email address
- `password` — Hashed password
- `avatar` — Profile image URL
- `role` — "artisan" | "customer"

### Product

- `title` — Product name
- `shortDescription` — Brief description
- `fullDescription` — Detailed description
- `price` — Product price
- `category` — Reference to Category
- `images` — Array of image URLs
- `rating` — Average rating (0-5)
- `reviewCount` — Number of reviews
- `viewCount` — Number of views
- `location` — Artisan location
- `artisan` — Reference to User
- `featured` — Featured flag

### Category

- `name` — Category name
- `slug` — URL-friendly identifier
- `description` — Category description
- `image` — Category image URL
- `productCount` — Number of products

### Review

- `product` — Reference to Product
- `user` — Reference to User
- `userName` — Reviewer's name
- `rating` — Rating (1-5)
- `comment` — Review text

## Configuration

### Theme Customization

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: 38 92% 50%;      /* Amber */
  --secondary: 160 84% 20%;   /* Forest Green */
  --background: 60 9% 98%;    /* Off-white */
}
```

### Constants

Modify `src/lib/constants.ts` to customize:

- Navigation links
- Sort options
- Price ranges
- Hero slides
- Testimonials
- FAQ items

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
vercel deploy
```

### Docker

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

Built with care for artisans and their craft.
