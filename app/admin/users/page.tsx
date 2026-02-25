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

import { Key, useEffect, useMemo, useState } from "react";
import UsersTable from "./_components/UsersTable";
import CreateUserModal from "./_components/CreateUserModel";
import ViewUserModal from "./_components/ViewUserModel";
import EditUserModal from "./_components/EditUserModal";
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
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 8;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(users.length / USERS_PER_PAGE)),
    [users.length]
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedUsers = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * USERS_PER_PAGE;
    return users.slice(startIndex, startIndex + USERS_PER_PAGE);
  }, [safeCurrentPage, users]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  };

  useEffect(() => {
    let active = true;

    const run = async () => {
      const res = await getUsers();
      if (!active) return;
      setUsers(res);
    };

    void run();

    return () => {
      active = false;
    };
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
      await loadUsers();
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
        users={paginatedUsers}
        onView={(u) => setViewUser(u)}
        onEdit={(u) => setEditUser(u)}
        onDelete={handleDeleteClick}
      />

      {users.length > USERS_PER_PAGE && (
        <div className="flex items-center justify-between gap-4 rounded-md bg-white px-4 py-3 shadow">
          <p className="text-sm text-gray-600">
            Showing {(safeCurrentPage - 1) * USERS_PER_PAGE + 1}-
            {Math.min(safeCurrentPage * USERS_PER_PAGE, users.length)} of {users.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={safeCurrentPage === 1}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {safeCurrentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={safeCurrentPage === totalPages}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

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

      {editUser && (
        <EditUserModal
          key={editUser._id?.toString() ?? "edit-user"}
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={loadUsers}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description={`Are you sure you want to delete ${deleteUser?.fullName}?`}
      />
    </div>
  );
}
