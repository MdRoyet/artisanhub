"use client";

import {
  useState,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from "react";

interface QuickViewContextType {
  productId: string | null;
  isOpen: boolean;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(
  undefined,
);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [productId, setProductId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = useCallback((id: string) => {
    setProductId(id);
    setIsOpen(true);
  }, []);

  const closeQuickView = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setProductId(null), 200);
  }, []);

  return (
    <QuickViewContext.Provider
      value={{ productId, isOpen, openQuickView, closeQuickView }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error("useQuickView must be used within QuickViewProvider");
  }
  return context;
}
