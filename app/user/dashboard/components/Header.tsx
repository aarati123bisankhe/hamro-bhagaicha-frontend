"use client";

import { useCurrentUser } from "./useCurrentUser";

interface HeaderProps {
  onProfileClick?: () => void;
  onNotificationClick?: () => void;
  onCartClick?: () => void;
  cartCount?: number;
}

export default function Header({
  onProfileClick,
  onNotificationClick,
  onCartClick,
  cartCount = 0,
}: HeaderProps) {
  const user = useCurrentUser();
  const displayName = user?.fullname || user?.fullName || user?.name || "Aarati";
  const profileUrl = user?.profileUrl;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <div className="flex justify-between items-center px-10 py-4 bg-[#f9f7f2]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11">
            <img
              src="/images/logo.png"
              alt="Plant"
              className="w-12 h-12 object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg">Hamro Bhagaicha 🌿</h1>
            <p className="text-sm text-gray-600">Your Green Paradise</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            onClick={onNotificationClick}
            className="w-10 h-10 rounded-full bg-[#c8d9c5] shadow flex items-center justify-center cursor-pointer"
          >
            🔔
          </div>

          <button
            onClick={onCartClick}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#c8d9c5] shadow"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-[#2f5d3a] px-1.5 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <div
            onClick={onProfileClick}
            className="h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-[#7c8f7a] text-white flex items-center justify-center"
          >
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
        </div>
      </div>

      <div className="bg-[#c8d9c5] px-10 py-4">
        <h2 className="text-lg font-semibold">Welcome, {displayName}</h2>
        <p className="text-sm text-gray-700">
          Let&apos;s make your garden beautiful today
        </p>
      </div>
    </>
  );
}
