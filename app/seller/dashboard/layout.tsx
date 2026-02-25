"use client";

import SellerSidebar from "./components/SellerSidebar";

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f2f7f2]">
      <SellerSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
