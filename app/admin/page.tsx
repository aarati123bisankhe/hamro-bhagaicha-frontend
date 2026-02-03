import Sidebar from "../admin/_components/AdminSidebar";
import DashboardCards from "../admin/_components/Dashboard";
import TopBar from "../admin/_components/AdminTopbar";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen font-sans">


      {/* Main Content */}
      <main className="flex-1 ml-3 p-6 bg-gradient-to-br from-green-100 to-gray-400">

        {/* Dashboard Cards */}
        <DashboardCards />

      </main>
    </div>
  );
}

export type AdminUser = {
    fullName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: "user" | "admin";
    
}
