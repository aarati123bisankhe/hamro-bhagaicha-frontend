"use client";

import { useCurrentUser } from "@/app/user/dashboard/components/useCurrentUser";
import { useSellerUiSettings } from "./useSellerUiSettings";

export default function SellerTopbar() {
  const user = useCurrentUser();
  const { isDarkMode } = useSellerUiSettings();
  const displayName = user?.fullname || user?.fullName || user?.name || "Seller";
  const displayEmail = user?.email || "seller@example.com";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header
      className={`flex items-center justify-end border-b px-6 py-3 ${
        isDarkMode ? "border-[#233429] bg-[#111a14]" : "border-[#d5e3d6] bg-white"
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-xl border px-3 py-2 ${
          isDarkMode
            ? "border-[#304337] bg-[#152219]"
            : "border-[#d7e5d8] bg-[#f8fcf8]"
        }`}
      >
        <div className="h-10 w-10 overflow-hidden rounded-full bg-[#6f8f77] text-white flex items-center justify-center font-semibold">
          {user?.profileUrl ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/profile/${user.profileUrl}`}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            initial
          )}
        </div>
        <div className="min-w-0">
          <p
            className={`truncate text-sm font-semibold ${
              isDarkMode ? "text-[#e8f3ea]" : "text-[#1e3d2c]"
            }`}
          >
            {displayName}
          </p>
          <p
            className={`truncate text-xs ${isDarkMode ? "text-[#9fb6a5]" : "text-[#5c7662]"}`}
          >
            {displayEmail}
          </p>
        </div>
      </div>
    </header>
  );
}
