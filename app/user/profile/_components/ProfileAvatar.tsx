"use client";

import Image from "next/image";

export default function ProfileAvatar() {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
      <div className="relative">
        <Image
          src="/avatar-placeholder.png"
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />

        <button className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full text-white text-xs">
          ✎
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Your Name</h3>
        <p className="text-gray-500 text-sm">yourname@gmail.com</p>
      </div>
    </div>
  );
}
