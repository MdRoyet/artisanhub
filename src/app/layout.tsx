import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { QuickViewProvider } from "@/components/products/quick-view-context";
import { QuickViewModal } from "@/components/products/quick-view-modal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ArtisanHub — Handcrafted Marketplace",
    template: "%s | ArtisanHub",
  },
  description:
    "Discover unique handcrafted products from skilled artisans. Pottery, jewelry, textiles, woodwork and more.",
  keywords: [
    "handcrafted",
    "artisan",
    "handmade",
    "pottery",
    "jewelry",
    "textiles",
    "woodwork",
    "leather",
    "marketplace",
  ],
  authors: [{ name: "ArtisanHub" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "ArtisanHub",
    title: "ArtisanHub — Handcrafted Marketplace",
    description:
      "Discover unique handcrafted products from skilled artisans around the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtisanHub — Handcrafted Marketplace",
    description:
      "Discover unique handcrafted products from skilled artisans around the world.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#D97706",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <QuickViewProvider>
            <div className="flex-1">{children}</div>
            <QuickViewModal></QuickViewModal>
            <Toaster richColors position="top-right" />
          </QuickViewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
