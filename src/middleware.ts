import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/products/add", "/products/manage"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    // Check for token in cookies or refer to client-side handling
    // Middleware can't access localStorage, so we rely on the AuthGuard client component
    // But we can still block direct server-side rendering for protected pages
    const token = request.cookies.get("token")?.value;

    // If no token in cookies, we let it through â€” the AuthGuard handles the redirect
    // This middleware is mainly for future cookie-based auth enhancement
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/add/:path*", "/products/manage/:path*"],
};
