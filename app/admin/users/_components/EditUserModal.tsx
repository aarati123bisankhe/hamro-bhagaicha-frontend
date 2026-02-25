"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user_action";
import type { AdminUser } from "../page";

type EditUserModalProps = {
  user: AdminUser;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditUserModal({
  user,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [role, setRole] = useState<"user" | "admin">(user.role);
  const [address, setAddress] = useState(user.address ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user._id) return;

    setIsSaving(true);
    const result = await handleUpdateUser(user._id.toString(), {
      fullName,
      email,
      phoneNumber,
      role,
      address: address || undefined,
    });
    setIsSaving(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    onSuccess();
    onClose();
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-md bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-green-600">Edit User</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Full Name"
              className="w-full rounded border p-2 focus:ring-2 focus:ring-green-500"
              required
            />

            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Email"
              className="w-full rounded border p-2 focus:ring-2 focus:ring-green-500"
              required
            />

            <input
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Phone Number"
              className="w-full rounded border p-2 focus:ring-2 focus:ring-green-500"
              required
            />

            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Address"
              className="w-full rounded border p-2 focus:ring-2 focus:ring-green-500"
            />

            <select
              value={role}
              onChange={(event) => setRole(event.target.value as "user" | "admin")}
              className="w-full rounded border bg-white p-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
