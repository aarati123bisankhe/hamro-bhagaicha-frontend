"use client";

import Image from "next/image";
import { AdminUser } from "../page";

export default function ViewUserModal({
  user,
  onClose,
}: {
  user: AdminUser;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-md rounded-md shadow p-6 space-y-5">
          
          {/* Title */}
          <h2 className="text-xl font-semibold">User Profile</h2>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden relative flex items-center justify-center">
              {user.profileUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/profile/${user.profileUrl}`}
                  alt={`${user.fullName} profile`}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-gray-600">
                  {user.fullName?.[0]}
                </span>
              )}
            </div>

            {/* Basic Info */}
            <div>
              <p className="font-semibold text-lg">
                {user.fullName}
              </p>
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {user.phoneNumber}
            </p>

            <p>
              <span className="font-medium">Role:</span>{" "}
              <span className="capitalize">{user.role}</span>
            </p>

          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
