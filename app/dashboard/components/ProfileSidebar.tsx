import { div } from "framer-motion/client";

interface ProfileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ open, onClose }: ProfileSidebarProps) {
  if (!open) return null;

  return (
    <>
      {/* Blur background */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[360px] bg-[#f8f7f3] z-50 shadow-xl p-5 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg text-[#2ff 5d3a]">Profile</h2>
          <button onClick={onClose}>✕</button>
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
            <h3 className="font-semibold">Aarati Sharma</h3>
            <p className="text-sm text-gray-500">aarati@example.com</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-3 flex-1 mt-4" >
          {["My Plants", "Orders", "Wishlist", "Care Schedule", "Settings"].map(
            (item) => (
              <div
                key={item}
                className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center cursor-pointer hover:bg-green-50"
              >
                <span>{item}</span>
                <span className="text-gray-400">›</span>
              </div>
            )
          )}
        </div>

        {/* Logout */}
        <button className="bg-[#e3ebdf] p-3 rounded-xl shadow-sm flex items-center justify-center hover:bg-green-50 text-red-600 font-medium mt-4">
          🚪 Logout
        </button>
      </div>
    </>
  );
}
