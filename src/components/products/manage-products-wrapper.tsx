"use client";

import { useAuth } from "@/context/auth-context";
import { ManageProducts } from "./manage-products";

export function ManageProductsWrapper() {
  const { user } = useAuth();

  if (!user) return null;

  return <ManageProducts userId={user._id} />;
}
