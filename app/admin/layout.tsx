"use client";

import AdminSidebar from "./_components/AdminSidebar";
import AdminTopbar from "./_components/AdminTopbar";
import { useAdminUiSettings } from "./_components/useAdminUiSettings";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useAdminUiSettings();

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "bg-[#101418]" : "bg-gray-100"}`}>
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main
          className={`p-6 ${
            isDarkMode ? "bg-[#0f1720] text-gray-100" : "bg-gray-100 text-black"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
