"use client";

import { useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/cookie";
import { useCurrentUser } from "./useCurrentUser";
import { useWishlist } from "./useWishlist";
import { useCareSchedule } from "./useCareSchedule";
import { useUserSettings } from "./useUserSettings";

interface ProfileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ open, onClose }: ProfileSidebarProps) {
  const router = useRouter();
  const user = useCurrentUser();
  const { itemCount: wishlistCount } = useWishlist();
  const { pendingCount: carePendingCount } = useCareSchedule();
  const { settings, updateSetting } = useUserSettings();
  const darkMode = settings.theme === "dark";
  const displayName = user?.fullname || user?.fullName || user?.name || "Aarati";
  const displayEmail = user?.email || "aarati@example.com";
  const profileUrl = user?.profileUrl;
  const initial = displayName.charAt(0).toUpperCase();

  const handleDarkModeToggle = () => {
    updateSetting("theme", darkMode ? "light" : "dark");
  };

  if (!open) return null;

  const menuItems = [
    {
      label: "My Profile",
      description: "Manage your personal details",
      icon: "👤",
      action: () => router.push("/user/profile"),
    },
    {
      label: "My Plants",
      description: "View and shop plants",
      icon: "🌿",
      path: "/user/dashboard/plant",
    },
    {
      label: "Orders",
      description: "Track active and past orders",
      icon: "📦",
      path: "/user/orders",
    },
    {
      label: "Wishlist",
      description: "Your saved favorites",
      icon: "💚",
      path: "/user/dashboard/wishlist",
      count: wishlistCount,
    },
    {
      label: "Care Schedule",
      description: "Watering and care reminders",
      icon: "🗓️",
      path: "/user/dashboard/care-schedule",
      count: carePendingCount,
    },
    {
      label: "Settings",
      description: "Preferences and privacy",
      icon: "⚙️",
      path: "/user/dashboard/settings",
    },
  ];

  const handleLogout = async () => {
    await clearAuthCookies();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#122015]/35 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[390px] flex-col overflow-hidden border-l border-[#d5e1cd] bg-gradient-to-b from-[#f4f8ee] via-[#f9f7f3] to-[#eef4e8] shadow-2xl transition-transform duration-300">
        <div className="relative overflow-hidden px-5 pb-6 pt-5">
          <div className="pointer-events-none absolute -right-14 -top-20 h-40 w-40 rounded-full bg-[#bad4b2]/70 blur-2xl" />
          <div className="pointer-events-none absolute -left-12 top-14 h-32 w-32 rounded-full bg-[#e1efdb]/80 blur-2xl" />

          <div className="relative mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#678469]">
                Account
              </p>
              <h2 className="text-2xl font-bold text-[#22462e]">Profile Hub</h2>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c6d8bc] bg-white/80 text-lg text-[#35543c] transition hover:bg-white"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <div className="relative rounded-2xl border border-[#d4e2cc] bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[#dbe8d4] bg-[#7c8f7a] text-white flex items-center justify-center text-2xl shadow-sm">
                {profileUrl ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/profile/${profileUrl}`}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initial
                )}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-[#23412d]">
                  {displayName}
                </h3>
                <p className="truncate text-sm text-[#57725b]">{displayEmail}</p>
              </div>
            </div>

            <div className="rounded-xl bg-[#edf5e8] px-3 py-2 text-xs font-medium text-[#436648]">
              🌱 Keep growing. Your garden journey is on track.
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6f8d71]">
            Quick Access
          </p>
          {menuItems.map((item) => (
            <div
              key={item.label}
              onClick={() => {
                if (item.path) {
                  router.push(item.path);
                  onClose();
                } else if (item.action) {
                  item.action();
                  onClose();
                }
              }}
              className="group flex cursor-pointer items-center justify-between rounded-2xl border border-[#d7e5cf] bg-white/90 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b8cfb2] hover:bg-[#f6fbf2] hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef6e7] text-lg">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#23412d]">{item.label}</p>
                  <p className="text-xs text-[#68846b]">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {typeof item.count === "number" && (
                  <span className="rounded-full bg-[#e2f0dd] px-2 py-0.5 text-xs font-semibold text-[#355c3f]">
                    {item.count}
                  </span>
                )}
                <span className="text-lg text-[#8aa58d] transition group-hover:translate-x-0.5">
                  ›
                </span>
              </div>
            </div>
          ))}

          <div className="mt-2 rounded-2xl border border-[#d7e5cf] bg-white/90 p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#23412d]">Dark Mode</p>
                <p className="text-xs text-[#68846b]">
                  Switch theme for low-light browsing
                </p>
              </div>
            <button
              onClick={handleDarkModeToggle}
              className={`relative inline-flex h-7 w-16 items-center rounded-full transition ${
                darkMode ? "bg-[#2f5d3a]" : "bg-gray-300"
              }`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${
                  darkMode ? "translate-x-9" : "translate-x-1"
                }`}
              />
              <span className="absolute right-2 text-[10px] font-semibold text-white">
                {darkMode ? "ON" : ""}
              </span>
              <span className="absolute left-2 text-[10px] font-semibold text-[#4b5563]">
                {darkMode ? "" : "OFF"}
              </span>
            </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#f0d0ce] bg-[#fff3f2] p-3 font-semibold text-[#b74841] shadow-sm transition hover:bg-[#ffe9e8]"
          >
            <span aria-hidden>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
