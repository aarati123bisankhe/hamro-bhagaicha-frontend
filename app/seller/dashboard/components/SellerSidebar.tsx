"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/cookie";

const menuItems = [
  { label: "Add New Product", href: "/seller/dashboard/add-product", icon: "➕" },
  { label: "My Products / Inventory", href: "/seller/dashboard/inventory", icon: "📦" },
  { label: "Sales / Stats", href: "/seller/dashboard/sales", icon: "📈" },
  { label: "Notifications", href: "/seller/dashboard/notifications", icon: "🔔" },
  { label: "Profile / Settings", href: "/seller/dashboard/settings", icon: "⚙️" },
];

export default function SellerSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await clearAuthCookies();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-72 min-h-screen bg-[#1f3b2e] text-white p-5">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.14em] text-[#b8d7c1]">Seller</p>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                isActive ? "bg-[#2f5d46] text-white" : "text-[#deede3] hover:bg-[#2a4f3c]"
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 w-full rounded-lg bg-[#ba3d3d] py-2 text-sm font-semibold transition hover:bg-[#a43131]"
      >
        Logout
      </button>
    </aside>
  );
}
