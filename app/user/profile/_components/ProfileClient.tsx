"use client";

import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import EditProfileForm from "./EditProfileForm";

export default function ProfileClient() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative max-w-4xl mx-auto p-6 space-y-6">
      <ProfileAvatar />

      <ProfileInfo onEdit={() => setIsEditing(true)} />

      {isEditing && (
        <EditProfileForm onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
}
