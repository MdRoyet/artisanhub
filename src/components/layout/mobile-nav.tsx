// src/components/layout/mobile-nav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, User } from "lucide-react";
import { NAV_LINKS_PUBLIC, NAV_LINKS_AUTHENTICATED } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();

  const links = isAuthenticated ? NAV_LINKS_AUTHENTICATED : NAV_LINKS_PUBLIC;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm transition-transform duration-300 md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <nav className="flex flex-col p-6 gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors",
              pathname === link.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}

        <Separator className="my-4" />

        {isAuthenticated ? (
          <div className="space-y-3 px-4">
            <div className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-4">
            <Button variant="outline" asChild onClick={onClose}>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild onClick={onClose}>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
