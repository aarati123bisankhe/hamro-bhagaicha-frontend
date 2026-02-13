// "use client";

// import { Key, useEffect, useState } from "react";
// import UsersTable from "./_components/UsersTable";
// import CreateUserModal from "./_components/CreateUserModel";
// import { getUsers } from "@/lib/actions/admin/user_action";

// export type AdminUser = {
//     profileUrl: any;
//     _id: Key | null | undefined;
//     fullName: string;
//     lastName: string;
//     email: string;
//     phoneNumber: string;
//     role: "user" | "admin";
// };

// export default function UsersPage() {
//   const [users, setUsers] = useState<AdminUser[]>([]);
//   const [open, setOpen] = useState(false);

//   const loadUsers = async () => {
//     const res = await getUsers();
//     setUsers(res);
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   return (
//     <div className="space-y-6 p-6 text-black">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Users</h1>
//         <button
//           onClick={() => setOpen(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//         >
//           + Create User
//         </button>
//       </div>

//       <UsersTable users={users} />

//       {open && (
//         <CreateUserModal
//           onClose={() => setOpen(false)}
//           onSuccess={loadUsers}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { Key, useEffect, useState } from "react";
import UsersTable from "./_components/UsersTable";
import CreateUserModal from "./_components/CreateUserModel";
import ViewUserModal from "./_components/ViewUserModel";
import DeleteModal from "@/app/_components/DeleteModel";
import { getUsers, handleDeleteUser } from "@/lib/actions/admin/user_action";
import { toast } from "react-toastify";

export type AdminUser = {
  _id: Key | null | undefined;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "user" | "admin";
  profileUrl?: string;
  address?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [viewUser, setViewUser] = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Load users from backend
  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Trash icon click → open delete modal
  const handleDeleteClick = (user: AdminUser) => {
    setDeleteUser(user);
    setIsDeleteModalOpen(true);
  };

  // Delete confirmed
  const handleDeleteConfirm = async () => {
    if (!deleteUser?._id) return;

    const res = await handleDeleteUser(deleteUser._id.toString());
    if (res.success) {
      toast.success(res.message);
      loadUsers(); // refresh table
    } else {
      toast.error(res.message);
    }

    setIsDeleteModalOpen(false);
    setDeleteUser(null);
  };

  return (
    <div className="space-y-6 p-6 text-black">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Create User
        </button>
      </div>

      {/* Users Table */}
      <UsersTable
        users={users}
        onView={(u) => setViewUser(u)}
        onEdit={(u) => console.log("Edit", u)} // Replace with edit modal later
        onDelete={handleDeleteClick}
      />

      {/* Create User Modal */}
      {openCreate && (
        <CreateUserModal
          onClose={() => setOpenCreate(false)}
          onSuccess={loadUsers}
        />
      )}

      {/* View User Modal */}
      {viewUser && (
        <ViewUserModal user={viewUser} onClose={() => setViewUser(null)} />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description={`Are you sure you want to delete ${deleteUser?.role} @${deleteUser?.fullName}?`}
      />
    </div>
  );
}

