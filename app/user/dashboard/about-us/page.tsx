"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import NotificationSidebar from "../components/NotificationSidebar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../components/useCart";

export default function AboutUsPage() {
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
            <span className="font-semibold text-[#1f4f2a]">About Us</span>
          </div>

          <section className="rounded-3xl border border-[#d5ddce] bg-[#edf3e8] p-6 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#1f4f2a]">
              About Hamro Bhagaicha
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#35543c]">
              Hamro Bhagaicha is a local plant-first brand focused on making home
              gardening simple, joyful, and accessible. We curate healthy plants,
              quality pots, and ready-made combos that match modern homes and busy
              lifestyles.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#35543c]">
              Our goal is to help you build green spaces that feel calming and
              personal. From first-time plant parents to experienced collectors, we
              provide products and guidance you can trust.
            </p>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Our Mission</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">
                Bring nature into every Nepali home through thoughtful plant curation.
              </p>
            </article>
            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Our Promise</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">
                Healthy plants, careful packaging, and responsive support.
              </p>
            </article>
            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Our Community</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">
                We grow with plant lovers who care about greener living.
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
