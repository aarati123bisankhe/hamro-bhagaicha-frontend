"use client";

import { Key, useEffect, useState } from "react";
import UsersTable from "./_components/UsersTable";
import CreateUserModal from "./_components/CreateUserModel";
import { getUsers } from "@/lib/actions/admin/user_action";

export type AdminUser = {
    profileUrl: any;
    _id: Key | null | undefined;
    fullName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: "user" | "admin";
};

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [open, setOpen] = useState(false);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-6 p-6 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Create User
        </button>
      </div>

      <UsersTable users={users} />

      {open && (
        <CreateUserModal
          onClose={() => setOpen(false)}
          onSuccess={loadUsers}
        />
      )}
    </div>
  );
}
