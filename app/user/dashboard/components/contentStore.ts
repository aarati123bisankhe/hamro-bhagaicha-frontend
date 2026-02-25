"use client";

import { useSyncExternalStore } from "react";

export type CategoryContent = {
  id: string;
  title: string;
  subtitle: string;
  count: string;
  image: string;
  sideImage: string;
  href: string;
};

export type TipContent = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  frequency: string;
  level: string;
};

export type FooterLinkContent = {
  id: string;
  label: string;
  href: string;
};

export type SiteContent = {
  dashboard: {
    categoriesTitle: string;
    categories: CategoryContent[];
  };
  tips: {
    sectionLabel: string;
    heading: string;
    items: TipContent[];
  };
  footer: {
    brandName: string;
    tagline: string;
    aboutText: string;
    email: string;
    phone: string;
    quickLinks: FooterLinkContent[];
    copyright: string;
  };
};

const CONTENT_KEY = "hb_site_content";
const CONTENT_EVENT = "hb_site_content_change";

const DEFAULT_CONTENT: SiteContent = {
  dashboard: {
    categoriesTitle: "Explore Categories",
    categories: [
      {
        id: "cat-plants",
        title: "Plants",
        subtitle: "Give this plant a new home make your garden greener!",
        count: "150+ varieties",
        image: "/images/plantsimage1.jpg",
        sideImage: "/images/cart1.png",
        href: "/user/dashboard/plant",
      },
      {
        id: "cat-pots",
        title: "Pots",
        subtitle: "Style your Plant beautifully with our collection.",
        count: "80+ designs",
        image: "/images/plotsimage.jpg",
        sideImage: "/images/card2.png",
        href: "/user/dashboard/pot",
      },
      {
        id: "cat-combos",
        title: "Combos",
        subtitle: "Give this plant a new home make your garden greener!",
        count: "Plant + Pot set",
        image: "/images/combosimage.jpg",
        sideImage: "/images/card3.png",
        href: "/user/dashboard/combo",
      },
    ],
  },
  tips: {
    sectionLabel: "Daily Green Boost",
    heading: "Today's Plant Tip",
    items: [
      {
        id: "tip-watering",
        emoji: "💧",
        title: "Watering Wisdom",
        description:
          "Check the top inch of soil before watering. Most indoor plants prefer a light dry-out between waterings.",
        frequency: "Every 2-5 days",
        level: "Beginner",
      },
      {
        id: "tip-light",
        emoji: "🌤️",
        title: "Light Balance",
        description:
          "Rotate pots every week so each side receives equal light and the plant grows evenly.",
        frequency: "Weekly",
        level: "Easy",
      },
      {
        id: "tip-feeding",
        emoji: "🌱",
        title: "Feeding Time",
        description:
          "During active growth, use balanced liquid fertilizer in low dose every 2-4 weeks.",
        frequency: "Every 2-4 weeks",
        level: "Intermediate",
      },
    ],
  },
  footer: {
    brandName: "Hamro Bhagaicha",
    tagline: "Your Green Paradise",
    aboutText:
      "Bringing nature closer to you with a curated collection of plants, pots, and gardening essentials. Let's grow together!",
    email: "info@hamrobhagaicha.com",
    phone: "+977 981-2345678",
    quickLinks: [
      { id: "ql-about", label: "About Us", href: "/user/dashboard/about-us" },
      {
        id: "ql-care",
        label: "Plant Care Guide",
        href: "/user/dashboard/plant-care-guide",
      },
      {
        id: "ql-delivery",
        label: "Delivery Info",
        href: "/user/dashboard/delivery-info",
      },
      {
        id: "ql-contact",
        label: "Contact Us",
        href: "/user/dashboard/contact-us",
      },
    ],
    copyright: "© 2025 Hamro Bhagaicha. All rights reserved.",
  },
};

let cachedRaw = "";
let cachedContent: SiteContent = DEFAULT_CONTENT;

function readContent(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;

  try {
    const raw = localStorage.getItem(CONTENT_KEY) ?? "";
    if (!raw) {
      const serialized = JSON.stringify(DEFAULT_CONTENT);
      localStorage.setItem(CONTENT_KEY, serialized);
      cachedRaw = serialized;
      cachedContent = DEFAULT_CONTENT;
      return cachedContent;
    }

    if (raw === cachedRaw) return cachedContent;

    const parsed = JSON.parse(raw) as SiteContent;
    cachedRaw = raw;
    cachedContent = parsed;
    return cachedContent;
  } catch {
    cachedRaw = JSON.stringify(DEFAULT_CONTENT);
    cachedContent = DEFAULT_CONTENT;
    return DEFAULT_CONTENT;
  }
}

function writeContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  const serialized = JSON.stringify(content);
  cachedRaw = serialized;
  cachedContent = content;
  localStorage.setItem(CONTENT_KEY, serialized);
  window.dispatchEvent(new Event(CONTENT_EVENT));
}

export function useSiteContent() {
  const content = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const onStorage = (event: StorageEvent) => {
        if (event.key === CONTENT_KEY) onStoreChange();
      };
      window.addEventListener("storage", onStorage);
      window.addEventListener(CONTENT_EVENT, onStoreChange);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(CONTENT_EVENT, onStoreChange);
      };
    },
    readContent,
    () => DEFAULT_CONTENT
  );

  const updateContent = (next: SiteContent) => writeContent(next);
  const resetContent = () => writeContent(DEFAULT_CONTENT);

  return { content, updateContent, resetContent };
}
