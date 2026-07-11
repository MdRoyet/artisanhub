// src/app/(main)/products/manage/page.tsx

import { AuthGuard } from "@/components/layout/auth-guard";

export default function ManageProductsPage() {
  return (
    <AuthGuard>
      <div className="container-tight section-padding text-center">
        <h1 className="text-3xl font-heading font-bold text-secondary">
          Manage Products
        </h1>
        <p className="mt-2 text-muted-foreground">
          Coming in Step 14 â€” Protected Page âœ“
        </p>
      </div>
    </AuthGuard>
  );
}
