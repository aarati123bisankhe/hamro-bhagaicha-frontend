"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthCookies, getUserData } from "@/lib/cookie";
import { useEffect, useState } from "react";
import { useAdminUiSettings } from "./useAdminUiSettings";

type AdminUser = {
  fullname?: string;
  fullName?: string;
  name?: string;
  email?: string;
  profileUrl?: string;
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useAdminUiSettings();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const linkClass = (path: string) =>
  pathname === path
    ? "bg-green-600 text-white"
    : "text-white hover:bg-green-700";

  useEffect(() => {
    const fetchAdmin = async () => {
      const userData = (await getUserData()) as AdminUser | null;
      setAdmin(userData);
    };

    void fetchAdmin();
    window.addEventListener("user-data-updated", fetchAdmin);
    return () => {
      window.removeEventListener("user-data-updated", fetchAdmin);
    };
  }, []);

  const handleLogout = async () => {
    await clearAuthCookies();
    router.push("/login");
    router.refresh();
  };

  const displayName = admin?.fullname || admin?.fullName || admin?.name || "Admin";
  const displayEmail = admin?.email || "admin@example.com";
  const profileUrl = admin?.profileUrl
    ? `${backendUrl}/uploads/profile/${admin.profileUrl}`
    : "/placeholder-profile.png";

  return (
    <aside
      className={`flex min-h-screen w-64 flex-col text-white ${
        isDarkMode ? "bg-[#18222b]" : "bg-[#2A383B]"
      }`}
    >
      <div className="p-6 font-bold text-xl text-green-400">
        Admin Panel
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <Link href="/admin" className={`block px-4 py-2 rounded ${linkClass("/admin")}`}>
          📊 Dashboard
        </Link>

        <Link href="/admin/orders" className={`block px-4 py-2 rounded ${linkClass("/admin/orders")}`}>
          🛒 Order Management
        </Link>

        <Link href="/admin/users" className={`block px-4 py-2 rounded ${linkClass("/admin/users")}`}>
          👥 User Management
        </Link>

        <Link href="/admin/plants" className={`block px-4 py-2 rounded ${linkClass("/admin/plants")}`}>
          🌱 Plant & Plot
        </Link>

        <Link href="/admin/content" className={`block px-4 py-2 rounded ${linkClass("/admin/content")}`}>
          📄 Content Management
        </Link>
      </nav>

      <div className="border-t border-gray-700 p-4 space-y-3">
        <Link
          href="/admin/profile"
          className="flex items-center gap-3 rounded-md bg-white/10 p-2 transition hover:bg-white/20"
        >
          <img
            src={profileUrl}
            alt={displayName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="truncate text-xs text-gray-300">{displayEmail}</p>
          </div>
        </Link>

        <button
          onClick={toggleTheme}
          className="w-full rounded-md bg-white/10 py-2 text-sm font-semibold transition hover:bg-white/20"
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
