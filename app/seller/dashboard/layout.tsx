"use client";

import SellerSidebar from "./components/SellerSidebar";
import SellerTopbar from "./components/SellerTopbar";
import { useSellerUiSettings } from "./components/useSellerUiSettings";

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useSellerUiSettings();

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "bg-[#111a14]" : "bg-[#f2f7f2]"}`}>
      <SellerSidebar />
      <div className="flex flex-1 flex-col">
        <SellerTopbar />
        <main className={`flex-1 p-6 ${isDarkMode ? "text-[#e6f1e8]" : "text-[#1c1c1c]"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
