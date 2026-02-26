"use client";

import { useMemo, useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CART_STORAGE_KEY = "hb_cart_items";
const CART_EVENT = "hb_cart_change";
const EMPTY_CART: CartItem[] = [];

let cachedRawCart = "";
let cachedCartItems: CartItem[] = EMPTY_CART;

function readCartItems(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY) ?? "";
    if (raw === cachedRawCart) return cachedCartItems;
    if (!raw) {
      cachedRawCart = "";
      cachedCartItems = EMPTY_CART;
      return cachedCartItems;
    }

    const parsed = JSON.parse(raw) as CartItem[];
    cachedRawCart = raw;
    cachedCartItems = Array.isArray(parsed) ? parsed : EMPTY_CART;
    return cachedCartItems;
  } catch {
    cachedRawCart = "";
    cachedCartItems = EMPTY_CART;
    return cachedCartItems;
  }
}

function writeCartItems(items: CartItem[]) {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(items);
  cachedRawCart = serialized;
  cachedCartItems = items;
  localStorage.setItem(CART_STORAGE_KEY, serialized);
  window.dispatchEvent(new Event(CART_EVENT));
}

export function useCart() {
  const items = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      const onStorage = (event: StorageEvent) => {
        if (event.key === CART_STORAGE_KEY) onStoreChange();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener(CART_EVENT, onStoreChange);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(CART_EVENT, onStoreChange);
      };
    },
    readCartItems,
    () => EMPTY_CART
  );

  const addItem = (item: Omit<CartItem, "quantity">) => {
    const current = readCartItems();
    const existing = current.find((entry) => entry.id === item.id);

    const next = existing
      ? current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        )
      : [...current, { ...item, quantity: 1 }];

    writeCartItems(next);
  };

  const increaseQty = (id: string) => {
    const next = readCartItems().map((entry) =>
      entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry
    );
    writeCartItems(next);
  };

  const decreaseQty = (id: string) => {
    const next = readCartItems()
      .map((entry) =>
        entry.id === id ? { ...entry, quantity: entry.quantity - 1 } : entry
      )
      .filter((entry) => entry.quantity > 0);

    writeCartItems(next);
  };

  const removeItem = (id: string) => {
    const next = readCartItems().filter((entry) => entry.id !== id);
    writeCartItems(next);
  };

  const clearCart = () => {
    writeCartItems([]);
  };

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  return {
    items,
    itemCount,
    subtotal,
    addItem,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  };
}
