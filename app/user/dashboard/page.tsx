"use client";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoriesSection from "./components/CategoriesSection";
import TodaysTip from "./components/TodaysTip";
import Footer from "./components/Footer";
import ProfileSidebar from "./components/ProfileSidebar";
import NotificationSidebar from "./components/NotificationSidebar";
import CartSidebar from "./components/CartSidebar";
import { useCart } from "./components/useCart";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { items, itemCount, subtotal, increaseQty, decreaseQty, removeItem } =
    useCart();

  const handleHomeSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;

    const normalized = query.toLowerCase();
    const potKeywords = ["pot", "planter", "hanging", "ceramic", "terracotta"];
    const comboKeywords = ["combo", "bundle", "set", "gift"];

    if (comboKeywords.some((keyword) => normalized.includes(keyword))) {
      router.push(`/user/dashboard/combo?search=${encodeURIComponent(query)}`);
      return;
    }

    if (potKeywords.some((keyword) => normalized.includes(keyword))) {
      router.push(`/user/dashboard/pot?search=${encodeURIComponent(query)}`);
      return;
    }

    router.push(`/user/dashboard/plant?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Header
        onProfileClick={() => setProfileOpen(true)}
        onNotificationClick={() => setNotificationOpen(true)}
        onCartClick={() => setCartOpen(true)}
        cartCount={itemCount}
      />
      <main className="px-10 py-8 space-y-10">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleHomeSearch}
        />
        <CategoriesSection />
        <TodaysTip />
      </main>
      <Footer />

      <ProfileSidebar
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
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
