"use client";

import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileSidebar from "../components/ProfileSidebar";

type ComboItem = {
  name: string;
  description: string;
  details: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice: number;
  image: string;
};

const combos: ComboItem[] = [
  {
    name: "Minimalist White Ceramic",
    description: "Two easy-care plants in matching modern ceramic pots.",
    details: "(Snake + two easy-care plants, ceramic pots)",
    rating: 4.9,
    reviews: 93,
    price: 5200,
    oldPrice: 6500,
    image:
      "/images/combo.png",
  },
  {
    name: "Desk Trio Delight",
    description: "Brighten your workspace with low-maintenance plants.",
    details: "(Includes three mini plants, modern pot set)",
    rating: 4.8,
    reviews: 82,
    price: 2800,
    oldPrice: 3500,
    image:
      "/images/combo1.png",
  },
  {
    name: "Succulent Garden Set",
    description: "Low-maintenance collection for sunny corners.",
    details: "(Succulents + terracotta pots, soil kit)",
    rating: 4.3,
    reviews: 204,
    price: 2400,
    oldPrice: 3000,
    image:
      "/images/combo2.png",
  },
  {
    name: "Air Purifier Trio",
    description: "Breathe better with leafy green friends.",
    details: "(Snake, peace lily, palm + ceramic pots)",
    rating: 4.8,
    reviews: 556,
    price: 4200,
    oldPrice: 5200,
    image:
      "/images/combo3.png",
  },
  {
    name: "Gift Box Special",
    description: "Ready to gift, wrapped beautifully.",
    details: "(Includes plant + pot + gift box + care kit)",
    rating: 4.9,
    reviews: 97,
    price: 3500,
    oldPrice: 4300,
    image:
      "/images/combo4.png",
  },
  {
    name: "Premium Monstera Combo",
    description: "Statement plant package for premium interiors.",
    details: "(Monstera + designer pot + moss pole)",
    rating: 4.8,
    reviews: 95,
    price: 5500,
    oldPrice: 7000,
    image:
      "/images/combo5.png",
  },
  {
    name: "Colorful Blooms Bundle",
    description: "Bring color to life with seasonal flowers.",
    details: "(Flowering pair + decorative pots)",
    rating: 4.8,
    reviews: 238,
    price: 3600,
    oldPrice: 4500,
    image:
      "/images/combo6.png",
  },
  {
    name: "Kitchen Herb Garden",
    description: "Fresh herbs at your fingertips.",
    details: "(Basil, mint, rosemary + terracotta pots)",
    rating: 4.9,
    reviews: 258,
    price: 2600,
    oldPrice: 3200,
    image:
      "/images/combo7.png",
  },
  {
    name: "Tropical Paradise Set",
    description: "Transform into tropical vibes.",
    details: "(Bird of paradise, areca palm, planters)",
    rating: 4.7,
    reviews: 129,
    price: 7500,
    oldPrice: 8900,
    image:
      "/images/combo8.png",
  },
];

export default function ComboPage() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <Header onProfileClick={() => setProfileOpen(true)} />

      <main className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-center gap-2 text-sm text-[#5f5f5f]">
            <Link href="/user/dashboard" className="hover:text-[#1f4f2a]">
              Home
            </Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#1f4f2a]">Combo</span>
          </div>

          <h2 className="text-3xl font-semibold text-[#1f4f2a]">
            Perfect Plant Combo
          </h2>
          <p className="mt-3 text-xl font-semibold text-[#1f1f1f]">
            Curated bundle for every need and occasion
          </p>

          <div className="mt-8">
            <button className="rounded-full bg-[#9fc8a5] px-7 py-3 text-base font-medium text-[#264a2e] shadow-sm">
              All Combo
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {combos.map((combo) => (
              <article
                key={combo.name}
                className="overflow-hidden rounded-3xl border border-[#d5ddce] bg-[#dce7d7] shadow-sm"
              >
                <div className="relative">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="h-56 w-full bg-[#edf2e9] object-cover"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-[#5ab991] px-3 py-1 text-[10px] font-semibold text-white shadow">
                    Save 20%
                  </span>
                </div>

                <div className="space-y-2 px-4 py-3 text-[#143519]">
                  <h3 className="text-base font-semibold">{combo.name}</h3>
                  <p className="text-xs text-[#35543c]">{combo.description}</p>
                  <p className="text-[10px] text-[#56735d]">{combo.details}</p>

                  <div className="flex items-center gap-1 text-xs text-[#244a2d]">
                    <Star className="h-3.5 w-3.5 fill-[#1f6a2f] text-[#1f6a2f]" />
                    <span>{combo.rating}</span>
                    <span className="text-[#45634b]">({combo.reviews} Reviews)</span>
                  </div>

                  <div className="mt-3 flex items-end justify-between border-t border-[#c6d1bf] pt-2">
                    <div>
                      <p className="text-xs text-[#56735d]">Started at</p>
                      <div className="flex items-end gap-2">
                        <p className="text-lg font-bold text-[#1d4e2a]">
                          NPR {combo.price}
                        </p>
                        <p className="pb-0.5 text-xs text-[#6f7e72] line-through">
                          NPR {combo.oldPrice}
                        </p>
                      </div>
                    </div>

                    <button className="rounded-full bg-[#8fc48f] p-2 text-[#1d4e2a] transition hover:bg-[#7fb77f]">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <ProfileSidebar open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
