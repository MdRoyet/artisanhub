// src/app/(main)/products/add/page.tsx

import { AuthGuard } from "@/components/layout/auth-guard";

export default function AddProductPage() {
  return (
    <AuthGuard>
      <div className="container-tight section-padding text-center">
        <h1 className="text-3xl font-heading font-bold text-secondary">
          Add Product
        </h1>
        <p className="mt-2 text-muted-foreground">
          Coming in Step 13 — Protected Page ✓
        </p>
      </div>
    </AuthGuard>
  );
}
