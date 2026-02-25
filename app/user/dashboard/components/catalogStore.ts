"use client";

import { useMemo, useSyncExternalStore } from "react";

export type PlantCatalogItem = {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  category: "Indoor Plant" | "Outdoor Plant";
  image: string;
};

export type PotCatalogItem = {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  category: "All Pot" | "Hanging";
  image: string;
};

export type ComboCatalogItem = {
  id: string;
  name: string;
  description: string;
  details: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice: number;
  image: string;
};

export type CatalogType = "plant" | "pot" | "combo";

type CatalogMap = {
  plant: PlantCatalogItem;
  pot: PotCatalogItem;
  combo: ComboCatalogItem;
};

const CATALOG_EVENT = "hb_catalog_change";
const CATALOG_KEYS: Record<CatalogType, string> = {
  plant: "hb_catalog_plants",
  pot: "hb_catalog_pots",
  combo: "hb_catalog_combos",
};

const defaultPlants: PlantCatalogItem[] = [
  { id: "plant-monstera-deliciosa", name: "Monstera Deliciosa", description: "Large, glossy leaves with natural splits.", rating: 4.8, reviews: 84, price: 1200, category: "Indoor Plant", image: "/images/monsteradeliciosa.webp" },
  { id: "plant-snake-plant", name: "Snake Plant", description: "Low maintenance, air purifying champion.", rating: 4.9, reviews: 90, price: 500, category: "Indoor Plant", image: "/images/snakeplant1.webp" },
  { id: "plant-fiddle-leaf-fig", name: "Fiddle Leaf Fig", description: "Statement plant with violin shaped leaves.", rating: 4.7, reviews: 204, price: 3500, category: "Indoor Plant", image: "/images/Fiddle Leaf Fig.webp" },
  { id: "plant-jade-plant", name: "Jade Plant", description: "Lucky plant with thick and glossy leaves.", rating: 4.8, reviews: 566, price: 1500, category: "Indoor Plant", image: "/images/Jade Plant.webp" },
  { id: "plant-aloe-vera", name: "Aloe Vera Plant", description: "Medicinal wonder, easy to care.", rating: 4.9, reviews: 39, price: 900, category: "Outdoor Plant", image: "/images/Aloe Vera Plant.webp" },
  { id: "plant-peace-lily", name: "Peace Lily", description: "White blooms and elegant dark foliage.", rating: 4.9, reviews: 26, price: 1800, category: "Indoor Plant", image: "/images/peacelily.png" },
  { id: "plant-hibiscus", name: "Hibiscus", description: "Tropical beauty with vibrant blooms.", rating: 4.8, reviews: 134, price: 2200, category: "Outdoor Plant", image: "/images/habiscus.png" },
  { id: "plant-rubber-plant", name: "Rubber Plant", description: "Bold, glossy leaves in deep green.", rating: 4.8, reviews: 82, price: 2800, category: "Indoor Plant", image: "/images/Rubber Plant.png" },
  { id: "plant-bird-of-paradise", name: "Bird of Paradise", description: "Dramatic tropical statement plant.", rating: 4.8, reviews: 64, price: 2400, category: "Outdoor Plant", image: "/images/birdofpradise.png" },
  { id: "plant-zz-plant", name: "ZZ Plant", description: "Nearly indestructible, perfect for office.", rating: 4.8, reviews: 74, price: 1600, category: "Indoor Plant", image: "/images/zz.png" },
];

const defaultPots: PotCatalogItem[] = [
  { id: "pot-minimalist-white-ceramic", name: "Minimalist White Ceramic", description: "A beautiful planter for modern interiors.", rating: 4.8, reviews: 94, price: 500, category: "All Pot", image: "/images/ceramic.png" },
  { id: "pot-rustic-terracotta-classic", name: "Rustic Terracotta Classic", description: "Traditional clay, breathable for roots.", rating: 4.1, reviews: 128, price: 450, category: "All Pot", image: "/images/rustic.png" },
  { id: "pot-geometric-modern-planter", name: "Geometric Modern Planter", description: "Angular design for statement spaces.", rating: 4.7, reviews: 204, price: 1200, category: "All Pot", image: "/images/geometric.png" },
  { id: "pot-sage-green-ceramic-set", name: "Sage Green Ceramic Set", description: "Matching trio, calming color palette.", rating: 4.8, reviews: 930, price: 1500, category: "All Pot", image: "/images/sage.png" },
  { id: "pot-textured-concrete-planter", name: "Textured Concrete Planter", description: "Industrial look with durable build.", rating: 4.7, reviews: 128, price: 950, category: "All Pot", image: "/images/Textured.png" },
  { id: "pot-glazed-blue-ceramic", name: "Glazed Blue Ceramic", description: "Rich glaze with ocean-inspired tones.", rating: 4.8, reviews: 84, price: 1100, category: "All Pot", image: "/images/Glazed.png" },
  { id: "pot-woven-seagrass-basket", name: "Woven Seagrass Basket", description: "Natural fiber, eco-friendly feel.", rating: 4.9, reviews: 223, price: 750, category: "All Pot", image: "/images/basket.png" },
  { id: "pot-marble-effect-ceramic", name: "Marble Effect Ceramic", description: "Luxury look at an affordable price.", rating: 4.8, reviews: 363, price: 1350, category: "All Pot", image: "/images/creamy.png" },
  { id: "pot-copper-hanging-planter", name: "Copper Hanging Planter", description: "Metallic accent, eye-catching shape.", rating: 4.8, reviews: 65, price: 1400, category: "Hanging", image: "/images/hanging.png" },
];

const defaultCombos: ComboCatalogItem[] = [
  { id: "combo-minimalist-white-ceramic", name: "Minimalist White Ceramic", description: "Two easy-care plants in matching modern ceramic pots.", details: "(Snake + two easy-care plants, ceramic pots)", rating: 4.9, reviews: 93, price: 5200, oldPrice: 6500, image: "/images/combo.png" },
  { id: "combo-desk-trio-delight", name: "Desk Trio Delight", description: "Brighten your workspace with low-maintenance plants.", details: "(Includes three mini plants, modern pot set)", rating: 4.8, reviews: 82, price: 2800, oldPrice: 3500, image: "/images/combo1.png" },
  { id: "combo-succulent-garden-set", name: "Succulent Garden Set", description: "Low-maintenance collection for sunny corners.", details: "(Succulents + terracotta pots, soil kit)", rating: 4.3, reviews: 204, price: 2400, oldPrice: 3000, image: "/images/combo2.png" },
  { id: "combo-air-purifier-trio", name: "Air Purifier Trio", description: "Breathe better with leafy green friends.", details: "(Snake, peace lily, palm + ceramic pots)", rating: 4.8, reviews: 556, price: 4200, oldPrice: 5200, image: "/images/combo3.png" },
  { id: "combo-gift-box-special", name: "Gift Box Special", description: "Ready to gift, wrapped beautifully.", details: "(Includes plant + pot + gift box + care kit)", rating: 4.9, reviews: 97, price: 3500, oldPrice: 4300, image: "/images/combo4.png" },
  { id: "combo-premium-monstera", name: "Premium Monstera Combo", description: "Statement plant package for premium interiors.", details: "(Monstera + designer pot + moss pole)", rating: 4.8, reviews: 95, price: 5500, oldPrice: 7000, image: "/images/combo5.png" },
  { id: "combo-colorful-blooms", name: "Colorful Blooms Bundle", description: "Bring color to life with seasonal flowers.", details: "(Flowering pair + decorative pots)", rating: 4.8, reviews: 238, price: 3600, oldPrice: 4500, image: "/images/combo6.png" },
  { id: "combo-kitchen-herb-garden", name: "Kitchen Herb Garden", description: "Fresh herbs at your fingertips.", details: "(Basil, mint, rosemary + terracotta pots)", rating: 4.9, reviews: 258, price: 2600, oldPrice: 3200, image: "/images/combo7.png" },
  { id: "combo-tropical-paradise", name: "Tropical Paradise Set", description: "Transform into tropical vibes.", details: "(Bird of paradise, areca palm, planters)", rating: 4.7, reviews: 129, price: 7500, oldPrice: 8900, image: "/images/combo8.png" },
];

const defaults: { [K in CatalogType]: CatalogMap[K][] } = {
  plant: defaultPlants,
  pot: defaultPots,
  combo: defaultCombos,
};

const cacheRaw: Partial<Record<CatalogType, string>> = {};
const cacheParsed: Partial<Record<CatalogType, CatalogMap[CatalogType][]>> = {};

function readCatalog<K extends CatalogType>(type: K): CatalogMap[K][] {
  if (typeof window === "undefined") return [];

  const key = CATALOG_KEYS[type];
  const fallback = defaults[type];

  try {
    const raw = localStorage.getItem(key) ?? "";
    if (!raw) {
      const serialized = JSON.stringify(fallback);
      localStorage.setItem(key, serialized);
      cacheRaw[type] = serialized;
      cacheParsed[type] = fallback;
      return fallback;
    }

    if (cacheRaw[type] === raw && cacheParsed[type]) {
      return cacheParsed[type] as CatalogMap[K][];
    }

    const parsed = JSON.parse(raw) as CatalogMap[K][];
    if (!Array.isArray(parsed)) return fallback;
    cacheRaw[type] = raw;
    cacheParsed[type] = parsed as CatalogMap[CatalogType][];
    return parsed;
  } catch {
    return fallback;
  }
}

function writeCatalog<K extends CatalogType>(type: K, items: CatalogMap[K][]) {
  if (typeof window === "undefined") return;
  const key = CATALOG_KEYS[type];
  const serialized = JSON.stringify(items);
  cacheRaw[type] = serialized;
  cacheParsed[type] = items as CatalogMap[CatalogType][];
  localStorage.setItem(key, serialized);
  window.dispatchEvent(new Event(CATALOG_EVENT));
}

export function useCatalog<K extends CatalogType>(type: K) {
  const items = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      const onStorage = (event: StorageEvent) => {
        if (event.key === CATALOG_KEYS[type]) onStoreChange();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener(CATALOG_EVENT, onStoreChange);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(CATALOG_EVENT, onStoreChange);
      };
    },
    () => readCatalog(type),
    () => defaults[type]
  );

  const addItem = (item: CatalogMap[K]) => {
    writeCatalog(type, [item, ...readCatalog(type)]);
  };

  const updateItem = (id: string, patch: Partial<CatalogMap[K]>) => {
    const next = readCatalog(type).map((entry) =>
      entry.id === id ? ({ ...entry, ...patch } as CatalogMap[K]) : entry
    );
    writeCatalog(type, next);
  };

  const deleteItem = (id: string) => {
    const next = readCatalog(type).filter((entry) => entry.id !== id);
    writeCatalog(type, next);
  };

  const count = useMemo(() => items.length, [items]);

  return {
    items,
    count,
    addItem,
    updateItem,
    deleteItem,
  };
}
