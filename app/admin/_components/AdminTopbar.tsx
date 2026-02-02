"use client";
import { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { getUserData } from "@/lib/cookie";

export default function TopBar() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const [admin, setAdmin] = useState<any | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const userData = await getUserData(); 
      setAdmin(userData);
    };
    fetchAdmin();
  }, []);

  if (!admin) return null; 

  const profileUrl = admin.profileUrl
    ? `${backendUrl}/uploads/profile/${admin.profileUrl}`
    : "/placeholder-profile.png";
  return (
    <div className={styles.topBar}>
      <h2 className={styles.adminTitle}>Admin Panel</h2>
      <span className={styles.currentPage}>Dashboard</span>
    </div>
  );
}
