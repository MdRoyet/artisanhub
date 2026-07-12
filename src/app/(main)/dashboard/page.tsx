// src/app/(main)/dashboard/page.tsx

import { AuthGuard } from "@/components/layout/auth-guard";
import { ArtisanDashboard } from "@/components/dashboard/artisan-dashboard";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="container-tight section-padding">
        <ArtisanDashboard />
      </div>
    </AuthGuard>
  );
}
