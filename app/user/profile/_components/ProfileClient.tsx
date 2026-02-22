"use client";

import { useEffect, useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";

type ProfileUser = {
  fullname?: string;
  fullName?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  address?: string;
  role?: string;
  profileUrl?: string;
};

export default function ProfileClient({ user }: { user: ProfileUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<ProfileUser>(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <>
      {!isEditing ? (
        <ProfileInfo user={currentUser} onEdit={() => setIsEditing(true)} />
      ) : (
        <EditProfileForm
          user={currentUser}
          onCancel={() => setIsEditing(false)}
          onSaved={(updatedUser) => {
            setCurrentUser(updatedUser);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
}
