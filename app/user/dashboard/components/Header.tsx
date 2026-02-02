// "use client";

// export default function Header() {
//   return (
//     <>
//       <div className="flex justify-between items-center px-10 py-4 bg-[#f9f7f2]">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 ">
//              <img
//           src="/images/logo.png"
//          alt="Plant"
//         className="w-12 h-12 object-cover"
//         />
            
//           </div>
//           <div>
//             <h1 className="font-bold text-lg">Hamro Bhagaicha 🌿</h1>
//             <p className="text-sm text-gray-600">Your Green Paradise</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="w-10 h-10 rounded-full bg-[#c8d9c5] shadow flex items-center justify-center">
//             🔔
//           </div>
//           <div className="w-10 h-10 rounded-full bg-[#c8d9c5] shadow flex items-center justify-center">
//             🛒
//           </div>
//           <div className="w-10 h-10 rounded-full bg-[#7c8f7a] text-white flex items-center justify-center">
//             A
//           </div>
//         </div>
//       </div>

//       <div className="bg-[#c8d9c5] px-10 py-4">
//         <h2 className="text-lg font-semibold">Welcome, Aarati</h2>
//         <p className="text-sm text-gray-700">
//           Let's make your garden beautiful today
//         </p>
//       </div>
//     </>
//   );
// }



"use client";

interface HeaderProps {
  onProfileClick: () => void;
}

export default function Header({ onProfileClick }: HeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center px-10 py-4 bg-[#f9f7f2]">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11">
            <img
              src="/images/logo.png"
              alt="Plant"
              className="w-12 h-12 object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg">Hamro Bhagaicha 🌿</h1>
            <p className="text-sm text-gray-600">Your Green Paradise</p>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#c8d9c5] shadow flex items-center justify-center">
            🔔
          </div>

          <div className="w-10 h-10 rounded-full bg-[#c8d9c5] shadow flex items-center justify-center">
            🛒
          </div>

          {/* Profile Avatar */}
          <div
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full bg-[#7c8f7a] text-white flex items-center justify-center cursor-pointer"
          >
            A
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-[#c8d9c5] px-10 py-4">
        <h2 className="text-lg font-semibold">Welcome, Aarati</h2>
        <p className="text-sm text-gray-700">
          Let's make your garden beautiful today
        </p>
      </div>
    </>
  );
}
