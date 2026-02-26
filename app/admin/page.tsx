import DashboardCards from "../admin/_components/Dashboard";

export default function AdminDashboard() {
  return <DashboardCards />;
}

export type AdminUser = {
    fullName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: "user" | "admin";
    
}
