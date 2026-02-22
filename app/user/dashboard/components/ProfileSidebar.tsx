"use client";

import { useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/cookie";
import { useCurrentUser } from "./useCurrentUser";

interface ProfileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ open, onClose }: ProfileSidebarProps) {
  const router = useRouter();
  const user = useCurrentUser();
  const displayName = user?.fullname || user?.fullName || user?.name || "Aarati";
  const displayEmail = user?.email || "aarati@example.com";
  const profileUrl = user?.profileUrl;
  const initial = displayName.charAt(0).toUpperCase();

  if (!open) return null;

  const menuItems = [
    { label: "My Profile", action: () => router.push("/user/profile") },
    { label: "My Plants", path: "/user/plants" },
    { label: "Orders", path: "/orders" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Care Schedule", path: "/care-schedule" },
    { label: "Settings", path: "/settings" },
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
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300`}
      />

      <div className="fixed right-0 top-0 h-full w-[360px] bg-[#f8f7f3] z-50 shadow-xl p-5 flex flex-col transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg text-[#2f5d3a]">Profile</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-[#7c8f7a] text-white flex items-center justify-center text-xl">
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

          <div>
            <h3 className="font-semibold">{displayName}</h3>
            <p className="text-sm text-gray-500">{displayEmail}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-3 flex-1 mt-4">
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
              className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center cursor-pointer hover:bg-green-50 transition"
            >
              <span>{item.label}</span>
              <span className="text-gray-400">›</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-[#e3ebdf] p-3 rounded-xl shadow-sm flex items-center justify-center hover:bg-green-50 text-red-600 font-medium mt-4 transition"
        >
          🚪 Logout
        </button>
      </div>
    </>
  );
}
