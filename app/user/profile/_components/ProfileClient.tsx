// "use client";

// import { useState } from "react";
// import EditProfileForm from "./EditProfileForm";
// import ProfileAvatar from "./ProfileAvatar";
// import ProfileInfo from "./ProfileInfo";

// export default function ProfileClient() {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <div className="relative max-w-4xl mx-auto p-6 space-y-6">
//       <ProfileAvatar />

//       <ProfileInfo onEdit={() => setIsEditing(true)} />

//       {isEditing && (
//         <EditProfileForm onClose={() => setIsEditing(false)} />
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import EditProfileForm from "./EditProfileForm";
import { UpdateUserData } from "@/app/user/profile/schema";

export default function ProfileClient() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UpdateUserData>({
    firstName: "Aarati",
    email: "aarati.sharma@email.com",
    phone: "+977 9812345678",
    address: "Kathmandu, Nepal",
    profileUrl: undefined,
  });

  const handleSave = (data: UpdateUserData) => {
    setUser(data);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProfileAvatar
        name={`${user.firstName}`}
        email={user.email}
        onEdit={() => setIsEditing(true)}
      />

      <ProfileInfo
        fullName={`${user.firstName}`}
        email={user.email}
        phone="+977 9812345678"
        address="Kathmandu, Nepal"
        onEdit={() => setIsEditing(true)}
      />

      {isEditing && <EditProfileForm onClose={() => setIsEditing(false)} defaultValues={user} />}
    </div>
  );
}
