"use client";

import { useMemo, useState } from "react";

const STORAGE_KEY = "hb_seller_products";

export type SellerProduct = {
  id: string;
  name: string;
  description: string;
  category: "plant" | "pot" | "combo";
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt: string;
};

const readProducts = (): SellerProduct[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as SellerProduct[];
  } catch {
    return [];
  }
};

const writeProducts = (items: SellerProduct[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export function useSellerProducts() {
  const [items, setItems] = useState<SellerProduct[]>(() => readProducts());

  const addProduct = (payload: Omit<SellerProduct, "id" | "createdAt">) => {
    const next: SellerProduct = {
      id: `seller-product-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...payload,
    };
    setItems((prev) => {
      const updated = [next, ...prev];
      writeProducts(updated);
      return updated;
    });
  };

  const removeProduct = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      writeProducts(updated);
      return updated;
    });
  };

  const totalStock = useMemo(
    () => items.reduce((sum, item) => sum + item.stock, 0),
    [items]
  );

  return { items, loaded: true, addProduct, removeProduct, totalStock };
}
