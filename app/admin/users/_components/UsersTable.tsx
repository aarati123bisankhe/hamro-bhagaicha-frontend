// "use client";

// import { AdminUser } from "../page";

// export default function UsersTable({ users }: { users: AdminUser[] }) {
//   return (
//     <div className="bg-white rounded-md shadow overflow-x-auto">
//       <table className="w-full min-w-[600px]">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Email</th>
//             <th className="p-3 text-left">Phone</th>
//             <th className="p-3 text-left">Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id} className="border-t hover:bg-gray-50">
//               <td className="p-3">{u.fullName}</td>
//               <td className="p-3">{u.email}</td>
//               <td className="p-3">{u.phoneNumber}</td>
//               <td className="p-3 capitalize">{u.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Pencil, Trash2, Eye } from "lucide-react";
import { AdminUser } from "../page";

export default function UsersTable({
  users,
  onView,
  onEdit,
  onDelete,
}: {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="bg-white rounded-md shadow overflow-x-auto">
      <table className="w-full min-w-[700px] text-sm">
        {/* ================= HEADER ================= */}
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Role</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        {/* ================= BODY ================= */}
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              {/* -------- USER INFO -------- */}
              <td className="p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative flex items-center justify-center">
                  {u.profileUrl ? (
                    <Image
                      src={`${backendUrl}/uploads/profile/${u.profileUrl}`}
                      alt="profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-semibold text-gray-600">
                      {u.fullName?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div>
                  <p className="font-medium">{u.fullName}</p>
                </div>
              </td>

              {/* -------- EMAIL -------- */}
              <td className="p-3">{u.email}</td>

              {/* -------- PHONE -------- */}
              <td className="p-3">{u.phoneNumber}</td>

              {/* -------- ROLE BADGE -------- */}
              <td className="p-3 capitalize">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    u.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {u.role}
                </span>
              </td>

              {/* -------- ACTIONS -------- */}
              <td className="p-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(u)}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => onEdit(u)}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(u)}
                    className="p-2 rounded hover:bg-red-100 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
