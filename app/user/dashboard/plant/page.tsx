"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotificationSidebar from "../components/NotificationSidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../components/useCart";
import SearchBar from "../components/SearchBar";
import { useWishlist } from "../components/useWishlist";

type PlantCategory = "All Plant" | "Indoor Plant" | "Outdoor Plant";

type PlantItem = {
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  category: Exclude<PlantCategory, "All Plant">;
  image: string;
};

const plants: PlantItem[] = [
  {
    name: "Monstera Deliciosa",
    description: "Large, glossy leaves with natural splits.",
    rating: 4.8,
    reviews: 84,
    price: 1200,
    category: "Indoor Plant",
    image:
      "/images/monsteradeliciosa.webp",
  },
  {
    name: "Snake Plant",
    description: "Low maintenance, air purifying champion.",
    rating: 4.9,
    reviews: 90,
    price: 500,
    category: "Indoor Plant",
    image:
      "/images/snakeplant1.webp",
  },
  {
    name: "Fiddle Leaf Fig",
    description: "Statement plant with violin shaped leaves.",
    rating: 4.7,
    reviews: 204,
    price: 3500,
    category: "Indoor Plant",
    image:
      "/images/Fiddle Leaf Fig.webp",
  },
  {
    name: "Jade Plant",
    description: "Lucky plant with thick and glossy leaves.",
    rating: 4.8,
    reviews: 566,
    price: 1500,
    category: "Indoor Plant",
    image:
      "/images/Jade Plant.webp",
  },
  {
    name: "Aloe Vera Plant",
    description: "Medicinal wonder, easy to care.",
    rating: 4.9,
    reviews: 39,
    price: 900,
    category: "Outdoor Plant",
    image:
      "/images/Aloe Vera Plant.webp",
  },
  {
    name: "Peace Lily",
    description: "White blooms and elegant dark foliage.",
    rating: 4.9,
    reviews: 26,
    price: 1800,
    category: "Indoor Plant",
    image:
      "/images/peacelily.png",
  },
  {
    name: "Hibiscus",
    description: "Tropical beauty with vibrant blooms.",
    rating: 4.8,
    reviews: 134,
    price: 2200,
    category: "Outdoor Plant",
    image:
      "/images/habiscus.png",
  },
  {
    name: "Rubber Plant",
    description: "Bold, glossy leaves in deep green.",
    rating: 4.8,
    reviews: 82,
    price: 2800,
    category: "Indoor Plant",
    image:
      "/images/Rubber Plant.png",
  },
  {
    name: "Bird of Paradise",
    description: "Dramatic tropical statement plant.",
    rating: 4.8,
    reviews: 64,
    price: 2400,
    category: "Outdoor Plant",
    image:
      "/images/birdofpradise.png",
  },
  {
    name: "ZZ Plant",
    description: "Nearly indestructible, perfect for office.",
    rating: 4.8,
    reviews: 74,
    price: 1600,
    category: "Indoor Plant",
    image:
      "/images/zz.png",
  },
];

export default function PlantPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PlantCategory>("All Plant");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") ?? ""
  );
  const {
    items,
    itemCount,
    subtotal,
    addItem,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();

  const filteredPlants = useMemo(() => {
    const tabFiltered =
      activeTab === "All Plant"
        ? plants
        : plants.filter((plant) => plant.category === activeTab);

    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return tabFiltered;

    return tabFiltered.filter((plant) => {
      const haystack = `${plant.name} ${plant.description} ${plant.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeTab, searchQuery]);

  return (
    <>
      <Header
        onProfileClick={() => setProfileOpen(true)}
        onNotificationClick={() => setNotificationOpen(true)}
        onCartClick={() => setCartOpen(true)}
        cartCount={itemCount}
      />

      <main className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-center gap-2 text-sm text-[#5f5f5f]">
            <Link href="/user/dashboard" className="hover:text-[#1f4f2a]">
              Home
            </Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#1f4f2a]">Plant</span>
          </div>

          <h2 className="text-3xl font-semibold text-[#1f4f2a]">
            Our Plant Collection
          </h2>
          <p className="mt-5 text-xl font-semibold text-[#1f1f1f]">
            Discover your perfect green companion from our curated selection
          </p>
          <div className="mt-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search plants by name or type..."
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {(["All Plant", "Indoor Plant", "Outdoor Plant"] as PlantCategory[]).map(
              (tab) => (
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
              )
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredPlants.map((plant) => {
              const wishlistId = `plant-${plant.name}`;
              const saved = isWishlisted(wishlistId);

              return (
                <article
                  key={plant.name}
                  className="overflow-hidden rounded-3xl border border-[#d5ddce] bg-[#dce7d7] shadow-sm"
                >
                  <div className="relative">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="h-56 w-full bg-[#edf2e9] object-cover"
                    />
                    <button
                      onClick={() =>
                        toggleItem({
                          id: wishlistId,
                          type: "plant",
                          name: plant.name,
                          description: plant.description,
                          price: plant.price,
                          image: plant.image,
                        })
                      }
                      className={`absolute right-3 top-3 rounded-full p-2 shadow-sm transition ${
                        saved
                          ? "bg-[#2f5d3a] text-white"
                          : "bg-white/90 text-[#2f5d3a] hover:bg-white"
                      }`}
                      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                    >
                      <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <div className="space-y-2 px-4 py-3 text-[#143519]">
                    <h3 className="text-base font-semibold">{plant.name}</h3>
                    <p className="text-xs text-[#35543c]">{plant.description}</p>

                    <div className="flex items-center gap-1 text-xs text-[#244a2d]">
                      <Star className="h-3.5 w-3.5 fill-[#1f6a2f] text-[#1f6a2f]" />
                      <span>{plant.rating}</span>
                      <span className="text-[#45634b]">
                        ({plant.reviews} Reviews)
                      </span>
                    </div>

                    <div className="mt-3 flex items-end justify-between border-t border-[#c6d1bf] pt-2">
                      <div>
                        <p className="text-xs text-[#56735d]">Price</p>
                        <p className="text-lg font-bold text-[#1d4e2a]">
                          NPR {plant.price}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          addItem({
                            id: plant.name,
                            name: plant.name,
                            price: plant.price,
                            image: plant.image,
                          });
                          setCartOpen(true);
                        }}
                        className="rounded-full bg-[#8fc48f] p-2 text-[#1d4e2a] transition hover:bg-[#7fb77f]"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <ProfileSidebar open={profileOpen} onClose={() => setProfileOpen(false)} />
      <NotificationSidebar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        subtotal={subtotal}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
      />
    </>
  );
}
