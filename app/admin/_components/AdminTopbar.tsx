"use client";

import { useEffect, useState } from "react";
import { getUserData } from "@/lib/cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminUiSettings } from "./useAdminUiSettings";

type AdminUser = {
  fullname?: string;
  fullName?: string;
  name?: string;
  email?: string;
  profileUrl?: string;
};

export default function TopBar() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useAdminUiSettings();
  const [admin, setAdmin] = useState<AdminUser | null>(null);

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

  if (!admin) return null;

  const profileUrl = admin.profileUrl
    ? `${backendUrl}/uploads/profile/${admin.profileUrl}`
    : "/placeholder-profile.png";
  const displayName = admin.fullname || admin.fullName || admin.name || "Admin";
  const pageTitle =
    pathname === "/admin"
      ? "Dashboard"
      : pathname
          .split("/")
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) || "Admin";

  return (
    <div
      className={`mb-6 flex items-center justify-between rounded-md p-4 ${
        isDarkMode ? "bg-[#1e2936] text-white" : "bg-[#2A383B] text-white"
      }`}
    >
      <h2 className="text-xl font-bold">{pageTitle}</h2>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white/20"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <Link
          href="/admin/profile"
          className="flex items-center gap-2 rounded-md bg-white/10 px-2 py-1.5 transition hover:bg-white/20"
        >
          <img
            src={profileUrl}
            alt={displayName}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{displayName}</span>
        </Link>
      </div>
    </div>
  );
}
