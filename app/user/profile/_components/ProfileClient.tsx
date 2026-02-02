// // "use client";

// // import { useState } from "react";
// // import ProfileAvatar from "./ProfileAvatar";
// // import ProfileInfo from "./ProfileInfo";
// // import EditProfileForm from "./EditProfileForm";
// // import { UpdateUserData } from "@/app/user/profile/schema";

// // export default function ProfileClient() {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [user, setUser] = useState<UpdateUserData>({
// //     firstName: "Aarati",
// //     email: "aarati.sharma@email.com",
// //     phone: "+977 9812345678",
// //     address: "Kathmandu, Nepal",
// //     profileUrl: undefined,
// //   });

// //   const handleSave = (data: UpdateUserData) => {
// //     setUser(data);
// //     setIsEditing(false);
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 space-y-6">
// //       <ProfileAvatar
// //         name={`${user.firstName}`}
// //         email={user.email}
// //         profileUrl={user.profileUrl}
// //         // onEdit={() => setIsEditing(true)}
// //       />

// //       <ProfileInfo
// //         fullName={`${user.firstName}`}
// //         email={user.email}
// //         phone="+977 9812345678"
// //         address="Kathmandu, Nepal"
// //         onEdit={() => setIsEditing(true)}
// //       />

// //       {isEditing && <EditProfileForm onClose={() => setIsEditing(false)} defaultValues={user} onSave={handleSave} />}
// //     </div>
// //   );
// // }



// // "use client";

// // import { useState } from "react";
// // import ProfileAvatar from "./ProfileAvatar";
// // import EditProfileForm from "./EditProfileForm";
// // import { UpdateUserData } from "@/app/user/profile/schema";

// // export default function ProfileClient() {
// //   const [isEditing, setIsEditing] = useState(false);

// //   const [user, setUser] = useState<UpdateUserData>({
// //     firstName: "Aarati Sharma",
// //     email: "aarati.sharma@email.com",
// //     phone: "+977 9812345678",
// //     address: "Kathmandu, Nepal",
// //     profileUrl: undefined,
// //   });

// //   const handleSave = (data: UpdateUserData) => {
// //     setUser(data);
// //     setIsEditing(false);
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       {/* Big Profile Card */}
// //       <div className="bg-white shadow-2xl rounded-2xl p-20 relative">
// //         {/* Avatar */}
// //         <div className="flex justify-center -mt-20">
// //           <ProfileAvatar profileUrl={user.profileUrl} name={user.firstName} email={user.email} />
// //         </div>

// //         {/* Name & Email */}
// //         <div className="text-center mt-6">
// //           <h2 className="text-2xl font-bold text-black">{user.firstName}</h2>
// //           <p className="text-gray-700 mt-1">{user.email}</p>
// //         </div>

// //         {/* Info Section */}
// //         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
// //           <div>
// //             <p className="font-medium">Phone</p>
// //             <p>{user.phone}</p>
// //           </div>
// //           <div>
// //             <p className="font-medium">Address</p>
// //             <p>{user.address}</p>
// //           </div>
// //         </div>

// //         {/* Edit Button */}
// //         <div className="mt-6 flex justify-center">
// //           <button
// //             onClick={() => setIsEditing(true)}
// //             className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
// //           >
// //             Edit Profile
// //           </button>
// //         </div>
// //       </div>

// //       {/* Edit Modal */}
// //       {isEditing && (
// //         <EditProfileForm
// //                   defaultValues={user}
// //                   onSave={handleSave} onClose={function (): void {
// //                       throw new Error("Function not implemented.");
// //                   } }        />
// //       )}
// //     </div>
// //   );
// // }





// "use client";

// import { useState } from "react";
// import ProfileAvatar from "./ProfileAvatar";
// import ProfileInfo from "./ProfileInfo";
// import EditProfileForm from "./EditProfileForm";
// import { UpdateUserData } from "@/app/user/profile/schema";

// export default function ProfileClient() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [user, setUser] = useState<UpdateUserData>({
//     firstName: "Aarati",
//     email: "aarati.sharma@email.com",
//     phone: "+977 9812345678",
//     address: "Kathmandu, Nepal",
//     profileUrl: undefined, // this will store the filename from backend
//   });

//   const handleSave = (data: UpdateUserData) => {
//     setUser(data); // update profile data immediately
//     setIsEditing(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <ProfileAvatar
//         profileUrl={user.profileUrl}
//       />

//       <ProfileInfo
//         fullName={user.firstName}
//         email={user.email}
//         phone={user.phone}
//         address={user.address}
//         onEdit={() => setIsEditing(true)}
//       />

//       {isEditing && (
//         <EditProfileForm
//           defaultValues={user}
//           onClose={() => setIsEditing(false)}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import ProfileAvatar from "./ProfileAvatar";
// import ProfileInfo from "./ProfileInfo";
// import EditProfileForm from "./EditProfileForm";
// import { UpdateUserData } from "@/app/user/profile/schema";

// export default function ProfileClient() {
//   const [isEditing, setIsEditing] = useState(false);

//   const [user, setUser] = useState<UpdateUserData>({
//     firstName: "Aarati",
//     email: "aarati.sharma@email.com",
//     phone: "+977 9812345678",
//     address: "Kathmandu, Nepal",
//     profileUrl: undefined,
//   });

//   const handleSave = (data: UpdateUserData) => {
//     setUser(data);       // save updated profile
//     setIsEditing(false); // go back to view mode
//   };

//   return (
//     <>
//       {!isEditing ? (
//         <div className="max-w-4xl mx-auto p-6 space-y-6">
//           {/* Avatar */}
//           <ProfileAvatar
//             profileUrl={user.profileUrl}
//           />

//           {/* THIS IS YOUR ProfileDetails */}
//           <ProfileInfo
//             fullName={user.firstName}
//             email={user.email}
//             phone={user.phone}
//             address={user.address}
//             onEdit={() => setIsEditing(true)}
//           />
//         </div>
//       ) : (
//         <EditProfileForm
//           defaultValues={user}
//           onClose={() => setIsEditing(false)}
//           onSave={handleSave}
//         />
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";
import { UpdateUserData } from "../schema";

export default function ProfileClient({ user }: { user: any }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing ? (
        <ProfileInfo
          fullName={user.firstName}
          email={user.email}
          phone={user.phone}
          address={user.address}
          onEdit={() => setIsEditing(true)}
        />
      ) : (
        <EditProfileForm
                      defaultValues={user}
                      onClose={() => setIsEditing(false)} onSave={function (data: UpdateUserData): void {
                          throw new Error("Function not implemented.");
                      } }        />
      )}
    </>
  );
}