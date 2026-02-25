"use client";

import SellerSidebar from "./components/SellerSidebar";
import SellerTopbar from "./components/SellerTopbar";

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f2f7f2]">
      <SellerSidebar />
      <div className="flex flex-1 flex-col">
        <SellerTopbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
