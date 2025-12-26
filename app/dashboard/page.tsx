// import DashboardLayout from "./layout";
// import CategoryCard from "./components/CategoryCard";
// import SearchBar from "./components/SearchBar";
// import TipCard from "./components/TipCard";

// export default function DashboardPage() {
//   const categories = [
//     {
//       title: "Plants",
//       description: "Give this plant a new home make your garden greener!",
//       varieties: "150+ varieties",
//       image: "/plants.jpg",
//     },
//     {
//       title: "Pots",
//       description: "Style your Plant beautifully with our collection.",
//       varieties: "80+ designs",
//       image: "/pots.jpg",
//     },
//     {
//       title: "Combos",
//       description: "Give this plant a new home make your garden greener!",
//       varieties: "150+ varieties",
//       image: "/combos.jpg",
//     },
//   ];

//   return (
//     <DashboardLayout>
//       <div className="text-green p-6">
//         <h1 className="text-xl font-semibold">Welcome, Aarati</h1>
//         <p className="text-sm text-gray-600">Let's make your garden beautiful today</p>
//       </div>

//       <div className="p-6">
//         <SearchBar placeholder="Search for plants, pots and combos..." />
//       </div>

//       <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {categories.map((cat, idx) => (
//           <CategoryCard key={idx} {...cat} />
//         ))}
//       </div>

//       <div className="p-6">
//         <TipCard
//           title="Today's Tip"
//           subtitle="Humidity Helper"
//           tip="Group plants together to create a micro-climate with higher humidity, or use a pebble tray with water."
//         />
//       </div>
//     </DashboardLayout>
//   );
// }

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
