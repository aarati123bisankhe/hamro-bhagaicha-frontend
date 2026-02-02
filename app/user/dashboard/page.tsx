"use client";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoriesSection from "./components/CategoriesSection";
import TodaysTip from "./components/TodaysTip";
import Footer from "./components/Footer";
import ProfileSidebar from "./components/ProfileSidebar";
import { useState } from "react";

export default function DashboardPage() {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <>
      <Header onProfileClick={() => setProfileOpen(true)} />
      <main className="px-10 py-8 space-y-10">
        <SearchBar />
        <CategoriesSection />
        <TodaysTip />
      </main>
      <Footer />

      <ProfileSidebar
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
}
