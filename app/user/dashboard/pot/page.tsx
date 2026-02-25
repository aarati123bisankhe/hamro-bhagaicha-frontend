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
import { useCatalog } from "../components/catalogStore";

type PotCategory = "All Pot" | "Hanging";

export default function PotPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PotCategory>("All Pot");
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
  const { items: pots } = useCatalog("pot");

  const filteredPots = useMemo(() => {
    const tabFiltered =
      activeTab === "All Pot"
        ? pots
        : pots.filter((pot) => pot.category === activeTab);

    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return tabFiltered;

    return tabFiltered.filter((pot) => {
      const haystack = `${pot.name} ${pot.description} ${pot.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeTab, pots, searchQuery]);

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
            <span className="font-semibold text-[#1f4f2a]">Pot</span>
          </div>

          <h2 className="text-3xl font-semibold text-[#1f4f2a]">
            Stylish Pots &amp; Planters
          </h2>
          <p className="mt-3 text-xl font-semibold text-[#1f1f1f]">
            Find the perfect home for your green friends
          </p>
          <div className="mt-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search pots by name or style..."
            />
          </div>

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
            {filteredPots.map((pot) => {
              const wishlistId = pot.id;
              const saved = isWishlisted(wishlistId);

              return (
                <article
                  key={pot.name}
                  className="overflow-hidden rounded-3xl border border-[#d5ddce] bg-[#dce7d7] shadow-sm"
                >
                  <div className="relative">
                    <img
                      src={pot.image}
                      alt={pot.name}
                      className="h-56 w-full bg-[#edf2e9] object-cover"
                    />
                    <button
                      onClick={() =>
                        toggleItem({
                          id: wishlistId,
                          type: "pot",
                          name: pot.name,
                          description: pot.description,
                          price: pot.price,
                          image: pot.image,
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

                      <button
                        onClick={() => {
                          addItem({
                            id: pot.id,
                            name: pot.name,
                            price: pot.price,
                            image: pot.image,
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
