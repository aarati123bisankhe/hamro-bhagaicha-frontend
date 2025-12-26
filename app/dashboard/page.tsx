import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoriesSection from "./components/CategoriesSection";
import TodaysTip from "./components/TodaysTip";
import Footer from "./components/Footer";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="px-10 py-8 space-y-10">
        <SearchBar />
        <CategoriesSection />
        <TodaysTip />
      </main>
      <Footer />
    </>
  );
}
