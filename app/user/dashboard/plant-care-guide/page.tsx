"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import NotificationSidebar from "../components/NotificationSidebar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../components/useCart";

const guideItems = [
  {
    title: "Watering Basics",
    text: "Check the top inch of soil before watering. Most indoor plants prefer slightly dry soil between watering cycles.",
  },
  {
    title: "Sunlight Rules",
    text: "Place bright-light plants near east/south windows, while low-light plants do better in indirect light.",
  },
  {
    title: "Soil & Drainage",
    text: "Always use pots with drainage holes and a loose potting mix to prevent root rot.",
  },
  {
    title: "Feeding Schedule",
    text: "Use balanced liquid fertilizer every 2-4 weeks during active growth seasons.",
  },
];

export default function PlantCareGuidePage() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, itemCount, subtotal, increaseQty, decreaseQty, removeItem } =
    useCart();

  return (
    <>
      <Header
        onProfileClick={() => setProfileOpen(true)}
        onNotificationClick={() => setNotificationOpen(true)}
        onCartClick={() => setCartOpen(true)}
        cartCount={itemCount}
      />

      <main className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7 flex items-center gap-2 text-sm text-[#5f5f5f]">
            <Link href="/user/dashboard" className="hover:text-[#1f4f2a]">
              Home
            </Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#1f4f2a]">Plant Care Guide</span>
          </div>

          <section className="rounded-3xl border border-[#d5ddce] bg-[#edf3e8] p-6 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#1f4f2a]">Plant Care Guide</h2>
            <p className="mt-3 text-sm text-[#35543c]">
              Simple care practices to keep your plants healthy all year round.
            </p>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {guideItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm"
              >
                <h3 className="text-base font-semibold text-[#1f4f2a]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#4a6a51]">{item.text}</p>
              </article>
            ))}
          </section>
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
