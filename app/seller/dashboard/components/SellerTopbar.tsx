"use client";

import { useCurrentUser } from "@/app/user/dashboard/components/useCurrentUser";

export default function SellerTopbar() {
  const user = useCurrentUser();
  const displayName = user?.fullname || user?.fullName || user?.name || "Seller";
  const displayEmail = user?.email || "seller@example.com";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-end border-b border-[#d5e3d6] bg-white px-6 py-3">
      <div className="flex items-center gap-3 rounded-xl border border-[#d7e5d8] bg-[#f8fcf8] px-3 py-2">
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
          <p className="truncate text-sm font-semibold text-[#1e3d2c]">{displayName}</p>
          <p className="truncate text-xs text-[#5c7662]">{displayEmail}</p>
        </div>
      </div>
    </header>
  );
}
