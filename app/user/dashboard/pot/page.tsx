"use client";

import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileSidebar from "../components/ProfileSidebar";

type PotCategory = "All Pot" | "Hanging";

type PotItem = {
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  category: PotCategory;
  image: string;
};

const pots: PotItem[] = [
  {
    name: "Minimalist White Ceramic",
    description: "A beautiful planter for modern interiors.",
    rating: 4.8,
    reviews: 94,
    price: 500,
    category: "All Pot",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rustic Terracotta Classic",
    description: "Traditional clay, breathable for roots.",
    rating: 4.1,
    reviews: 128,
    price: 450,
    category: "All Pot",
    image:
      "https://images.unsplash.com/photo-1617098474202-0d0d7f60b4c7?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Geometric Modern Planter",
    description: "Angular design for statement spaces.",
    rating: 4.7,
    reviews: 204,
    price: 1200,
    category: "All Pot",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sage Green Ceramic Set",
    description: "Matching trio, calming color palette.",
    rating: 4.8,
    reviews: 930,
    price: 1500,
    category: "All Pot",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Textured Concrete Planter",
    description: "Industrial look with durable build.",
    rating: 4.7,
    reviews: 128,
    price: 950,
    category: "All Pot",
    image:
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Glazed Blue Ceramic",
    description: "Rich glaze with ocean-inspired tones.",
    rating: 4.8,
    reviews: 84,
    price: 1100,
    category: "All Pot",
    image:
      "https://images.unsplash.com/photo-1532499016263-f2f6f3f3b5f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Woven Seagrass Basket",
    description: "Natural fiber, eco-friendly feel.",
    rating: 4.9,
    reviews: 223,
    price: 750,
    category: "All Pot",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Marble Effect Ceramic",
    description: "Luxury look at an affordable price.",
    rating: 4.8,
    reviews: 363,
    price: 1350,
    category: "All Pot",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Copper Hanging Planter",
    description: "Metallic accent, eye-catching shape.",
    rating: 4.8,
    reviews: 65,
    price: 1400,
    category: "Hanging",
    image:
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
  },
];

export default function PotPage() {
  const [activeTab, setActiveTab] = useState<PotCategory>("All Pot");
  const [profileOpen, setProfileOpen] = useState(false);

  const filteredPots = useMemo(() => {
    if (activeTab === "All Pot") return pots;
    return pots.filter((pot) => pot.category === activeTab);
  }, [activeTab]);

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
            <span className="font-semibold text-[#1f4f2a]">Pot</span>
          </div>

          <h2 className="text-3xl font-semibold text-[#1f4f2a]">
            Stylish Pots &amp; Planters
          </h2>
          <p className="mt-3 text-xl font-semibold text-[#1f1f1f]">
            Find the perfect home for your green friends
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {(["All Pot", "Hanging"] as PotCategory[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-7 py-3 text-base font-medium shadow-sm transition ${
                  activeTab === tab
                    ? "bg-[#9fc8a5] text-[#264a2e]"
                    : "bg-[#dbe4d4] text-[#4e5e51] hover:bg-[#cfddc6]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredPots.map((pot) => (
              <article
                key={pot.name}
                className="overflow-hidden rounded-3xl border border-[#d5ddce] bg-[#dce7d7] shadow-sm"
              >
                <img
                  src={pot.image}
                  alt={pot.name}
                  className="h-56 w-full bg-[#edf2e9] object-cover"
                />

                <div className="space-y-2 px-4 py-3 text-[#143519]">
                  <h3 className="text-base font-semibold">{pot.name}</h3>
                  <p className="text-xs text-[#35543c]">{pot.description}</p>

                  <div className="flex items-center gap-1 text-xs text-[#244a2d]">
                    <Star className="h-3.5 w-3.5 fill-[#1f6a2f] text-[#1f6a2f]" />
                    <span>{pot.rating}</span>
                    <span className="text-[#45634b]">({pot.reviews} Reviews)</span>
                  </div>

                  <div className="mt-3 flex items-end justify-between border-t border-[#c6d1bf] pt-2">
                    <div>
                      <p className="text-xs text-[#56735d]">Started at</p>
                      <p className="text-lg font-bold text-[#1d4e2a]">
                        NPR {pot.price}
                      </p>
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
