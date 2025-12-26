// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// interface Props {
//   children: React.ReactNode;
// }

// export default function DashboardLayout({ children }: Props) {
//   return (
//     <div className="bg-beige min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">{children}</main>
//       <Footer />
//     </div>
//   );
// }
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#1c1c1c]">
      {children}
    </div>
  );
}

