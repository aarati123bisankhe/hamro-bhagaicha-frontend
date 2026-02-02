// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// type Props = {
//   profileUrl?: string | File; // can be a filename or a local File
//   name?: string;
//   email: string;
// };

// export default function ProfileAvatar({ profileUrl, name, email }: Props) {
//   const [preview, setPreview] = useState<string | null>(null);

//   useEffect(() => {
//     if (!profileUrl) {
//       setPreview(null);
//       return;
//     }

//     if (typeof profileUrl === "string") {
//       // Already uploaded file
//       setPreview(`${process.env.NEXT_PUBLIC_API_URL}/uploads/profile/${profileUrl}`);
//     } else {
//       // Local file preview
//       setPreview(URL.createObjectURL(profileUrl));
//     }

//     return () => {
//       if (typeof profileUrl !== "string") URL.revokeObjectURL(preview!);
//     };
//   }, [profileUrl]);

//   return (
//     <div className="relative w-32 h-32 -mt-16 rounded-full overflow-hidden border-4 border-white bg-gray-300 flex items-center justify-center text-2xl text-white font-bold">
//       {preview ? (
//         <Image
//           src={preview}
//           alt="Profile"
//           fill
//           className="object-cover"
//         />
//       ) : (
//         <span>{name ? name[0].toUpperCase() : "A"}</span>
//       )}
//     </div>
//   );
// }

// "use client";
// import Image from "next/image";

// export default function ProfileAvatar({
//   profileUrl,
//   name,
// }: {
//   profileUrl?: string;
//   name?: string;
// }) {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;

//   const isValid =
//     typeof profileUrl === "string" &&
//     profileUrl.length > 0;

//   return (
//     <div className="relative w-32 h-32 rounded-full overflow-hidden border bg-gray-300 flex items-center justify-center text-white text-xl">
//       {isValid ? (
//         <Image
//           src={`${baseUrl}/uploads/profile/${profileUrl}`}
//           fill
//           alt="Profile"
//           className="object-cover"
//           unoptimized
//         />
//       ) : (
//         <span>{name?.[0] ?? "A"}</span>
//       )}
//     </div>
//   );
// }

import Image from "next/image";

export default function ProfileAvatar({
  profileUrl,
}: {
  profileUrl?: string;
}) {
  return (
    <div className="relative w-32 h-32 -mt-16 rounded-full overflow-hidden border-4 border-white bg-gray-300">
      {profileUrl && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/profile/${profileUrl}`}
          alt="Profile"
          fill
          className="object-cover"
        />
      )}
    </div>
  );
}