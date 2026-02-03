"use client";

import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";

export default function ProfileClient({ user }: { user: any }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing ? (
        <ProfileInfo user={user} onEdit={() => setIsEditing(true)} />
      ) : (
        <EditProfileForm user={user} onCancel={() => setIsEditing(false)} />
      )}
    </>
  );
}

