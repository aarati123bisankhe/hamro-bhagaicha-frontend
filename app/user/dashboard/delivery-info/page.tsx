"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import NotificationSidebar from "../components/NotificationSidebar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../components/useCart";

export default function DeliveryInfoPage() {
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
            <span className="font-semibold text-[#1f4f2a]">Delivery Info</span>
          </div>

          <section className="rounded-3xl border border-[#d5ddce] bg-[#edf3e8] p-6 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#1f4f2a]">Delivery Information</h2>
            <p className="mt-3 text-sm text-[#35543c]">
              Delivery timelines and handling details for plants, pots, and combos.
            </p>
          </section>

          <section className="mt-6 space-y-4">
            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Inside Valley</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">
                Usually delivered within 24-48 hours after order confirmation.
              </p>
            </article>

            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Outside Valley</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">
                Delivered within 2-5 business days depending on location and courier.
              </p>
            </article>

            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Packaging & Handling</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">
                Plants are secured with breathable wraps and shock-safe packaging to
                reduce transit stress.
              </p>
            </article>

            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Delivery Charges</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">
                Final shipping fee is shown at checkout based on your delivery address.
              </p>
            </article>
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
