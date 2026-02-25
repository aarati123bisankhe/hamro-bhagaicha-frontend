"use client";

import { useMemo, useSyncExternalStore } from "react";

export type WishlistType = "plant" | "pot" | "combo";

export type WishlistItem = {
  id: string;
  type: WishlistType;
  name: string;
  description: string;
  price: number;
  image: string;
};

const WISHLIST_STORAGE_KEY = "hb_wishlist_items";
const WISHLIST_EVENT = "hb_wishlist_change";
const EMPTY_WISHLIST: WishlistItem[] = [];

let cachedRawWishlist = "";
let cachedWishlistItems: WishlistItem[] = EMPTY_WISHLIST;

function readWishlistItems(): WishlistItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY) ?? "";
    if (raw === cachedRawWishlist) return cachedWishlistItems;
    if (!raw) {
      cachedRawWishlist = "";
      cachedWishlistItems = EMPTY_WISHLIST;
      return cachedWishlistItems;
    }

    const parsed = JSON.parse(raw) as WishlistItem[];
    cachedRawWishlist = raw;
    cachedWishlistItems = Array.isArray(parsed) ? parsed : EMPTY_WISHLIST;
    return cachedWishlistItems;
  } catch {
    cachedRawWishlist = "";
    cachedWishlistItems = EMPTY_WISHLIST;
    return cachedWishlistItems;
  }
}

function writeWishlistItems(items: WishlistItem[]) {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(items);
  cachedRawWishlist = serialized;
  cachedWishlistItems = items;
  localStorage.setItem(WISHLIST_STORAGE_KEY, serialized);
  window.dispatchEvent(new Event(WISHLIST_EVENT));
}

export function useWishlist() {
  const items = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      const onStorage = (event: StorageEvent) => {
        if (event.key === WISHLIST_STORAGE_KEY) onStoreChange();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener(WISHLIST_EVENT, onStoreChange);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(WISHLIST_EVENT, onStoreChange);
      };
    },
    readWishlistItems,
    () => []
  );

  const isWishlisted = (id: string) => {
    return readWishlistItems().some((entry) => entry.id === id);
  };

  const toggleItem = (item: WishlistItem) => {
    const current = readWishlistItems();
    const exists = current.some((entry) => entry.id === item.id);
    const next = exists
      ? current.filter((entry) => entry.id !== item.id)
      : [item, ...current];
    writeWishlistItems(next);
    return !exists;
  };

  const removeItem = (id: string) => {
    const next = readWishlistItems().filter((entry) => entry.id !== id);
    writeWishlistItems(next);
  };

  const clearWishlist = () => {
    writeWishlistItems([]);
  };

  const itemCount = useMemo(() => items.length, [items]);

  return {
    items,
    itemCount,
    isWishlisted,
    toggleItem,
    removeItem,
    clearWishlist,
  };
}
