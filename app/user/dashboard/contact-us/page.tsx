"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import NotificationSidebar from "../components/NotificationSidebar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../components/useCart";

export default function ContactUsPage() {
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
            <span className="font-semibold text-[#1f4f2a]">Contact Us</span>
          </div>

          <section className="rounded-3xl border border-[#d5ddce] bg-[#edf3e8] p-6 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#1f4f2a]">Contact Us</h2>
            <p className="mt-3 text-sm text-[#35543c]">
              We are here to help with orders, delivery, and plant-care support.
            </p>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Customer Support</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">Phone: +977 981-2345678</p>
              <p className="mt-1 text-sm text-[#4a6a51]">
                Email: info@hamrobhagaicha.com
              </p>
            </article>

            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Business Hours</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">Sun - Fri: 9:00 AM - 6:00 PM</p>
              <p className="mt-1 text-sm text-[#4a6a51]">Saturday: 10:00 AM - 3:00 PM</p>
            </article>

            <article className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm md:col-span-2">
              <h3 className="text-base font-semibold text-[#1f4f2a]">Store Address</h3>
              <p className="mt-2 text-sm text-[#4a6a51]">
                Hamro Bhagaicha, Kathmandu, Nepal
              </p>
              <p className="mt-1 text-sm text-[#4a6a51]">
                Our support team usually responds within one business day.
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
