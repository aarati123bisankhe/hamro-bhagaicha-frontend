// "use client";

// import { useRouter } from "next/navigation";

// interface ProfileSidebarProps {
//   open: boolean;
//   onClose: () => void;
// }

// export default function ProfileSidebar({ open, onClose }: ProfileSidebarProps) {
//   const router = useRouter();

//   if (!open) return null;

//   const menuItems = [
//     { label: "My Profile", path: "/user/profile" },
//     { label: "My Plants", path: "/user/plants" },
//     { label: "Orders", path: "/orders" },
//     { label: "Wishlist", path: "/wishlist" },
//     { label: "Care Schedule", path: "/care-schedule" },
//     { label: "Settings", path: "/settings" },
//   ];

//   return (
//     <>
//       {/* Blur background */}
//       <div
//         onClick={onClose}
//         className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//       />

//       {/* Sidebar */}
//       <div className="fixed right-0 top-0 h-full w-[360px] bg-[#f8f7f3] z-50 shadow-xl p-5 flex flex-col">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="font-bold text-lg text-[#2f5d3a]">Profile</h2>
//           <button onClick={onClose} className="text-xl">✕</button>
//         </div>

//         {/* Avatar + Camera */}
//         <div className="flex items-center gap-4 mb-6">
//           <div className="relative">
//             <div className="w-16 h-16 rounded-full bg-[#7c8f7a] text-white flex items-center justify-center text-xl">
//               A
//             </div>

//             <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
//               📷
//               <input type="file" hidden />
//             </label>
//           </div>

//           <div>
//             <h3 className="font-semibold">Aarati Sharma</h3>
//             <p className="text-sm text-gray-500">aarati@example.com</p>
//           </div>
//         </div>

//         {/* Menu */}
//         <div className="space-y-3 flex-1 mt-4">
//           {menuItems.map((item) => (
//             <div
//               key={item.label}
//               onClick={() => {
//                 router.push(item.path);
//                 onClose();
//               }}
//               className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center cursor-pointer hover:bg-green-50"
//             >
//               <span>{item.label}</span>
//               <span className="text-gray-400">›</span>
//             </div>
//           ))}
//         </div>

//         {/* Logout */}
//         <button
//           onClick={() => {
//             // add logout logic here
//             router.push("/login");
//           }}
//           className="bg-[#e3ebdf] p-3 rounded-xl shadow-sm flex items-center justify-center hover:bg-green-50 text-red-600 font-medium mt-4"
//         >
//           🚪 Logout
//         </button>
//       </div>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileModal from "../../profile/_components/ProfileModal";
import { UpdateUserData } from "@/app/user/profile/schema";

interface ProfileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ open, onClose }: ProfileSidebarProps) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [user, setUser] = useState<UpdateUserData>({
    firstName: "Aarati",
    email: "aarati@example.com",
    phone: "+977 9812345678",
    address: "Kathmandu, Nepal",
    profileUrl: undefined,
  });

  if (!open) return null;

  const menuItems = [
    { label: "My Profile", action: () => setIsProfileOpen(true) },
    { label: "My Plants", path: "/user/plants" },
    { label: "Orders", path: "/orders" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Care Schedule", path: "/care-schedule" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Sidebar background blur */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300`}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[360px] bg-[#f8f7f3] z-50 shadow-xl p-5 flex flex-col transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg text-[#2f5d3a]">Profile</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* Avatar + Camera */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#7c8f7a] text-white flex items-center justify-center text-xl">
              A
            </div>

            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
              📷
              <input type="file" hidden />
            </label>
          </div>

          <div>
            <h3 className="font-semibold">{user.firstName}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-3 flex-1 mt-4">
          {menuItems.map((item) => (
            <div
              key={item.label}
              onClick={() => {
                if (item.path) {
                  router.push(item.path);
                  onClose();
                } else if (item.action) {
                  item.action(); // open modal immediately
                }
              }}
              className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center cursor-pointer hover:bg-green-50 transition"
            >
              <span>{item.label}</span>
              <span className="text-gray-400">›</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => router.push("/login")}
          className="bg-[#e3ebdf] p-3 rounded-xl shadow-sm flex items-center justify-center hover:bg-green-50 text-red-600 font-medium mt-4 transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
        />
      )}
    </>
  );
}
