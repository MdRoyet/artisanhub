# ArtisanHub - Handcrafted Marketplace

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47a248?style=flat-square&logo=mongodb)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)

A full-stack, production-ready e-commerce platform connecting skilled artisans with people who value authentic, handcrafted goods. Built with a modern tech stack focusing on clean architecture, type safety, and premium UI/UX.

---

## Live Demo & Credentials

**Live URL:** [Your Vercel URL Here](https://artisanhub.vercel.app)
**GitHub Repo:** [https://github.com/MdRoyet/artisanhub](https://github.com/MdRoyet/artisanhub)

### Demo Accounts
| Role | Email | Password |
| :--- | :--- | :--- |
| **User** | `demo@artisanhub.com` | `password123` |
| **Admin** | `admin@artisanhub.com` | `admin123` |

---

## Key Features

### Frontend & UI/UX
*   **Design System:** Consistent 3-color palette (Amber, Brown, Gray) with uniform border radius and typography.
*   **Fully Responsive:** Mobile-first design adapting seamlessly to tablets and desktops.
*   **Skeleton Loaders:** Smooth loading states for product grids and dashboard data.
*   **Image Gallery:** Interactive gallery with crosshair hover-to-zoom functionality.
*   **Quick View Modal:** Preview product details without leaving the explore page.
*   **Dynamic Charts:** Recharts dashboard visualizing real-time database metrics (Area, Bar, Pie charts).
*   **Hero Slider:** Auto-playing, interactive image carousel with smooth transitions.

### Backend & Architecture
*   **TypeScript First:** Strict typing across frontend, backend, and database models.
*   **Next.js App Router:** Utilizing Server Components for fast initial loads and Client Components for interactivity.
*   **API Design:** RESTful API routes with standardized JSON responses.
*   **Data Validation:** Zod schemas for secure login, registration, product creation, and review submission.
*   **SEO Optimized:** Dynamic metadata generation, sitemap.xml, and robots.txt.

### Authentication & Security
*   **JWT Authentication:** Secure stateless auth with access tokens.
*   **Route Protection:** AuthGuard component redirecting unauthenticated users.
*   **Password Hashing:** Bcrypt hashing via Mongoose pre-save hooks.
*   **Role-Based Access:** Distinct UI and capabilities for Users vs. Admins.

### Core Pages (10+ Routes)
*   **Landing Page:** 10 distinct sections (Hero, Features, Categories, Products, How it Works, Stats, Testimonials, Newsletter, FAQ, CTA).
*   **Explore Page:** Advanced filtering (Category, Price, Rating), sorting, and pagination.
*   **Product Details:** Image gallery, specs table, related items, and review system.
*   **Dashboard:** Protected analytics page displaying live database aggregations.
*   **Manage Products:** Table view for admins/users to edit or delete listings.
*   **Additional Pages:** About, Contact (with form validation), Blog, Privacy Policy.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4, Shadcn UI |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Validation** | Zod |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Notifications** | Sonner (Toast) |
| **Deployment** | Vercel, MongoDB Atlas |

---

## Project Structure

```text
src/
├── app/
│   ├── (auth)/          # Login & Register layouts
│   ├── (main)/          # Main app layout (Navbar, Footer)
│   │   ├── dashboard/   # Protected Recharts dashboard
│   │   ├── explore/     # Product listing with filters
│   │   └── products/    # Add, Manage, Details pages
│   └── api/             # Next.js API Routes
│       ├── auth/        # login, register, me
│       ├── products/    # CRUD operations, [id] dynamic routes
│       └── dashboard/   # Aggregation pipelines for stats
├── components/
│   ├── auth/            # Login/Register forms
│   ├── dashboard/       # ArtisanDashboard (Recharts)
│   ├── landing/         # 10 landing page sections
│   ├── layout/          # Navbar, Footer, AuthGuard
│   ├── products/        # Cards, Grids, Quick View Modal
│   ├── shared/          # ImageGallery, RatingStars, ReviewForm
│   └── ui/              # Shadcn UI primitives
├── context/             # React Context (Auth)
├── hooks/               # Custom hooks (useDebounce, useProducts)
├── lib/                 # DB connection, JWT utils, Zod schemas
├── models/              # Mongoose schemas (User, Product, Category, Review)
├── types/               # Global TypeScript interfaces
└── middleware.ts         # Next.js routing protection


