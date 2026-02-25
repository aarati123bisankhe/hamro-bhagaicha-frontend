"use client";

import { Bell, Settings2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotificationSidebar from "../components/NotificationSidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../components/useCart";
import { useUserSettings } from "../components/useUserSettings";

function ToggleRow({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#d7e2d1] bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-[#23412d]">{label}</p>
        <p className="text-xs text-[#5f7d65]">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-7 w-16 items-center rounded-full transition ${
          checked ? "bg-[#2f5d3a]" : "bg-gray-300"
        }`}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-9" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { settings, updateSetting, resetSettings } = useUserSettings();
  const {
    items,
    itemCount,
    subtotal,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();

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
            <span className="font-semibold text-[#1f4f2a]">Settings</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-[#1f4f2a]">Account Settings</h2>
              <p className="mt-2 text-base text-[#446549]">
                Manage your app preferences and notifications.
              </p>
            </div>
            <button
              onClick={resetSettings}
              className="rounded-xl border border-[#e8c8c8] bg-[#fff2f2] px-4 py-2 text-sm font-semibold text-[#b74841] transition hover:bg-[#ffeaea]"
            >
              Reset to defaults
            </button>
          </div>

          <section className="mt-8 rounded-3xl border border-[#d5ddce] bg-[#edf3e8] p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-[#1f4f2a]">
              <Bell className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>

            <div className="space-y-3">
              <ToggleRow
                label="Email Notifications"
                description="Receive order and reminder updates by email."
                checked={settings.emailNotifications}
                onToggle={() =>
                  updateSetting("emailNotifications", !settings.emailNotifications)
                }
              />
              <ToggleRow
                label="SMS Notifications"
                description="Get urgent updates and delivery alerts via SMS."
                checked={settings.smsNotifications}
                onToggle={() =>
                  updateSetting("smsNotifications", !settings.smsNotifications)
                }
              />
              <ToggleRow
                label="Order Status Updates"
                description="Notify when order is packed, shipped, and delivered."
                checked={settings.orderUpdates}
                onToggle={() => updateSetting("orderUpdates", !settings.orderUpdates)}
              />
              <ToggleRow
                label="Weekly Gardening Tips"
                description="Send one curated plant care tip each week."
                checked={settings.weeklyTips}
                onToggle={() => updateSetting("weeklyTips", !settings.weeklyTips)}
              />
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-[#d5ddce] bg-[#edf3e8] p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-[#1f4f2a]">
              <Settings2 className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Preferences</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-[#d7e2d1] bg-white p-4">
                <p className="text-sm font-semibold text-[#23412d]">Theme</p>
                <p className="mb-3 text-xs text-[#5f7d65]">
                  Choose your preferred app appearance.
                </p>
                <select
                  value={settings.theme}
                  onChange={(event) =>
                    updateSetting("theme", event.target.value as "light" | "dark")
                  }
                  className="w-full rounded-xl border border-[#c6d4be] bg-white px-3 py-2 text-sm outline-none ring-[#8fb494] focus:ring-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="rounded-2xl border border-[#d7e2d1] bg-white p-4">
                <p className="text-sm font-semibold text-[#23412d]">Language</p>
                <p className="mb-3 text-xs text-[#5f7d65]">
                  Select the language used in your dashboard.
                </p>
                <select
                  value={settings.language}
                  onChange={(event) =>
                    updateSetting("language", event.target.value as "english" | "nepali")
                  }
                  className="w-full rounded-xl border border-[#c6d4be] bg-white px-3 py-2 text-sm outline-none ring-[#8fb494] focus:ring-2"
                >
                  <option value="english">English</option>
                  <option value="nepali">Nepali</option>
                </select>
              </div>
            </div>
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
