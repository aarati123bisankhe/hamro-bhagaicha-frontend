"use client";

import { AdminUser } from "../page";

export default function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="bg-white rounded-md shadow overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{u.fullName}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.phoneNumber}</td>
              <td className="p-3 capitalize">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}