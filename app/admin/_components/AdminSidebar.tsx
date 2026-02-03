// "use client";

// import styles from "../styles/Dashboard.module.css";

// export default function Sidebar() {
//   return (
//     <aside className={styles.sidebar}>
//       {/* Changed logo text to "Admin Panel" */}
//       <h2 className={styles.logo}>Admin Panel</h2>
//       <ul>
//         <li className={styles.active}>📊 Dashboard</li>
//           <li>🛒 Order Management</li>
//         <li>👥 User Management</li>
//         <li>🌱 Plant & Plot</li>
//         <li>📄 Content Management</li>
//       </ul>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/cookie";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const linkClass = (path: string) =>
  pathname === path
    ? "bg-green-600 text-white"
    : "text-white hover:bg-green-700";

  const handleLogout = async () => {
    await clearAuthCookies();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#2A383B] text-white flex flex-col min-h-screen">
      <div className="p-6 font-bold text-xl text-green-400">
        Admin Panel
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <Link href="/admin" className={`block px-4 py-2 rounded ${linkClass("/admin")}`}>
          📊 Dashboard
        </Link>

        <Link href="/admin/orders" className={`block px-4 py-2 rounded ${linkClass("/admin/orders")}`}>
          🛒 Order Management
        </Link>

        <Link href="/admin/users" className={`block px-4 py-2 rounded ${linkClass("/admin/users")}`}>
          👥 User Management
        </Link>

        <Link href="/admin/plants" className={`block px-4 py-2 rounded ${linkClass("/admin/plants")}`}>
          🌱 Plant & Plot
        </Link>

        <Link href="/admin/content" className={`block px-4 py-2 rounded ${linkClass("/admin/content")}`}>
          📄 Content Management
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}