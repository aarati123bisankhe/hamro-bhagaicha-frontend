// import Image from "next/image";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <section
//       className="flex justify-center items-center min-h-screen p-6"
//       style={{
//         background: "linear-gradient(135deg, #e3f8e6ff, #686868ff)",
//       }}
//     >
//       <div
//         className="flex flex-col md:flex-row w-full max-w-6xl h-[80vh] shadow-xl rounded-2xl overflow-hidden"
//         style={{
//           background: "linear-gradient(135deg, #D8F3DC, #475E4F)",
//         }}
//       >
//         <div className="relative hidden md:block md:w-1/2 h-full">
//           <Image
//             src="/images/image1.png"
//             alt="Plants"
//             fill
//             className="object-cover"
//           />
//         </div>

//         <div className="md:w-1/2 w-full flex items-center justify-center p-12">
//           <div className="w-full max-w-md">{children}</div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex justify-center items-center min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #e3f8e6ff, #686868ff)",
      }}
    >
      <div
        className="flex flex-col md:flex-row w-full max-w-6xl h-[80vh] shadow-xl rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #D8F3DC, #475E4F)",
        }}
      >
        {/* LEFT IMAGE (STATIC) */}
        <div className="md:w-1/2 w-full h-1/2 md:h-full">
          <img
            src="/images/image1.png"
            alt="Green plants"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT (LOGIN / REGISTER SWAPS HERE) */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
