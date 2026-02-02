import Sidebar from "../admin/_components/AdminSidebar";
import DashboardCards from "../admin/_components/Dashboard";
import TopBar from "../admin/_components/AdminTopbar";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen font-sans">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 bg-gradient-to-br from-green-100 to-gray-400">

        {/* Top Bar */}
        <TopBar />

        {/* Dashboard Cards */}
        <DashboardCards />

      </main>
    </div>
  );
}
