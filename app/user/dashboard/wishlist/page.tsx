"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotificationSidebar from "../components/NotificationSidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../components/useCart";
import { useWishlist, type WishlistType } from "../components/useWishlist";

type WishlistTab = "All" | WishlistType;

const tabLabels: Record<WishlistType, string> = {
  plant: "Plants",
  pot: "Pots",
  combo: "Combos",
};

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState<WishlistTab>("All");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { items, removeItem, clearWishlist } = useWishlist();
  const {
    items: cartItems,
    itemCount,
    subtotal,
    addItem,
    increaseQty,
    decreaseQty,
    removeItem: removeCartItem,
  } = useCart();

  const filteredItems = useMemo(() => {
    if (activeTab === "All") return items;
    return items.filter((item) => item.type === activeTab);
  }, [activeTab, items]);

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
            <span className="font-semibold text-[#1f4f2a]">Wishlist</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-[#1f4f2a]">My Wishlist</h2>
              <p className="mt-2 text-base text-[#446549]">
                Save your favorite plants, pots, and combos here.
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="rounded-xl border border-[#e8c8c8] bg-[#fff2f2] px-4 py-2 text-sm font-semibold text-[#b74841] transition hover:bg-[#ffeaea]"
              >
                Clear Wishlist
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {(["All", "plant", "pot", "combo"] as WishlistTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-[#9fc8a5] text-[#264a2e]"
                    : "bg-[#dbe4d4] text-[#4e5e51] hover:bg-[#cfddc6]"
                }`}
              >
                {tab === "All" ? "All" : tabLabels[tab]}
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-[#c9d9c4] bg-[#f1f6ee] p-10 text-center">
              <Heart className="mx-auto h-10 w-10 text-[#567a5f]" />
              <h3 className="mt-3 text-xl font-semibold text-[#22462e]">
                No favorites yet
              </h3>
              <p className="mt-2 text-sm text-[#5f7d65]">
                Tap the heart icon on plants, pots, or combos to save them.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-3xl border border-[#d5ddce] bg-[#dce7d7] shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full bg-[#edf2e9] object-cover"
                  />

                  <div className="space-y-2 px-4 py-3 text-[#143519]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#56735d]">
                      {tabLabels[item.type]}
                    </p>
                    <h3 className="text-base font-semibold">{item.name}</h3>
                    <p className="line-clamp-2 text-xs text-[#35543c]">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-end justify-between border-t border-[#c6d1bf] pt-2">
                      <p className="text-lg font-bold text-[#1d4e2a]">NPR {item.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            addItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                            });
                            setCartOpen(true);
                          }}
                          className="rounded-full bg-[#8fc48f] p-2 text-[#1d4e2a] transition hover:bg-[#7fb77f]"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-full bg-[#fce9e8] p-2 text-[#b74841] transition hover:bg-[#f9dddd]"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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
        items={cartItems}
        subtotal={subtotal}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeCartItem}
      />
    </>
  );
}
