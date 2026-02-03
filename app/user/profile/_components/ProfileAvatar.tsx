import Image from "next/image";

export default function ProfileAvatar({
  profileUrl,
}: {
  profileUrl?: string;
}) {
  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden border bg-gray-300 flex items-center justify-center text-white text-xl mt-30">
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

