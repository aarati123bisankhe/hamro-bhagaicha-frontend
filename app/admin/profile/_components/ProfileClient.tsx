"use client";

import { useEffect, useState } from "react";
import EditAdminProfileForm from "./EditProfileForm";
import AdminProfileInfo from "./ProfileInfo";
import ProfileAvatar from "./ProfileAvatar";

type AdminUser = {
  fullname?: string;
  fullName?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  address?: string;
  role?: string;
  status?: string;
  profileUrl?: string;
};

export default function AdminProfileClient({ admin }: { admin: AdminUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser>(admin);

  useEffect(() => {
    setCurrentAdmin(admin);
  }, [admin]);

  return (
    <>
      <ProfileAvatar profileUrl={currentAdmin.profileUrl} />
      {!isEditing ? (
        <AdminProfileInfo
          user={currentAdmin}
          onEdit={() => setIsEditing(true)}
        />
      ) : (
        <EditAdminProfileForm
          admin={currentAdmin}
          onCancel={() => setIsEditing(false)}
          onSaved={(updatedAdmin) => {
            setCurrentAdmin(updatedAdmin);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
}
