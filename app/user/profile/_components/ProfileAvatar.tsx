import Image from "next/image";

export default function ProfileAvatar({
  profileUrl,
  fullname,
}: {
  profileUrl?: string;
  fullname?: string;
}) {
  const initial = (fullname?.trim()?.charAt(0) || "U").toUpperCase();

  return (
    <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#7c8f7a] text-3xl font-semibold text-white shadow">
      {profileUrl ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/profile/${profileUrl}`}
          alt="Profile"
          fill
          className="object-cover"
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}

