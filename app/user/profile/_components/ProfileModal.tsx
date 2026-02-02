"use client";

import { useState, useEffect } from "react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import EditProfileForm from "./EditProfileForm";
import { UpdateUserData } from "@/app/user/profile/schema";

type Props = {
  user: UpdateUserData;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileModal({ user, isOpen, onClose }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 z-10 p-6 space-y-6 transform transition-all duration-300 scale-95 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-9 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        {/* Profile Avatar */}
        <ProfileAvatar
          profileUrl={user.profileUrl}
        />

        {/* Profile Info */}
        <ProfileInfo
                  fullName={`${user.firstName}`}
                  email={user.email}
                  phone={user.phone}
                  address={user.address}
                  onEdit={() => setIsEditing(true)}
        />

        {/* Edit Form */}
        {isEditing && (
          <EditProfileForm
                      {...({
                        onClose: () => setIsEditing(false),
                        defaultValues: user,
                        onSave: (data: UpdateUserData) => {}
                      } as any)}
          />
        )}
      </div>
    </div>
  );
}
