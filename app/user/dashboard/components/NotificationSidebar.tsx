"use client";

import { Bell, CheckCircle2 } from "lucide-react";

interface NotificationSidebarProps {
  open: boolean;
  onClose: () => void;
}

const notifications = [
  {
    title: "Order Confirmed",
    message: "Your order #HB2041 has been confirmed.",
    time: "2 min ago",
  },
  {
    title: "Delivery Update",
    message: "Snake Plant is out for delivery.",
    time: "1 hour ago",
  },
  {
    title: "Plant Care Tip",
    message: "Water your Monstera today for healthy leaves.",
    time: "Today",
  },
  {
    title: "New Combo Offer",
    message: "Save 20% on selected plant combo bundles.",
    time: "Yesterday",
  },
];

export default function NotificationSidebar({
  open,
  onClose,
}: NotificationSidebarProps) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed right-0 top-0 z-50 flex h-full w-[360px] flex-col bg-[#f8f7f3] p-5 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#2f5d3a]" />
            <h2 className="text-lg font-bold text-[#2f5d3a]">Notifications</h2>
          </div>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <button className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-[#e3ebdf] p-3 font-medium text-[#2f5d3a] transition hover:bg-green-50">
          <CheckCircle2 className="h-4 w-4" />
          Mark all as read
        </button>

        <div className="flex-1 space-y-3 overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={`${item.title}-${item.time}`}
              className="rounded-xl bg-white p-3 shadow-sm"
            >
              <p className="font-semibold text-[#1e3424]">{item.title}</p>
              <p className="mt-1 text-sm text-gray-600">{item.message}</p>
              <p className="mt-2 text-xs text-gray-500">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
