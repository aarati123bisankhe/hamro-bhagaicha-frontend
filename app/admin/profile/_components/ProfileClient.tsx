"use client";

import { useState } from "react";
import EditAdminProfileForm from "./EditProfileForm";
import AdminProfileInfo from "./ProfileInfo";

export default function AdminProfileClient({ admin }: { admin: any }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing ? (
        <AdminProfileInfo
          user={admin}
          onEdit={() => setIsEditing(true)}
        />
      ) : (
        <EditAdminProfileForm
          admin={admin}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
