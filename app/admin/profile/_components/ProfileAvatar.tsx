import Image from "next/image";

export default function AdminAvatar({
  profileUrl,
}: {
  profileUrl?: string;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const imageSrc = profileUrl
    ? `${backendUrl}/uploads/profile/${profileUrl}`
    : "/placeholder-profile.png";

  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden border bg-gray-300 flex items-center justify-center text-white text-xl mt-30">
      <Image
        src={imageSrc}
        alt="Admin Profile"
        fill
        className="object-cover"
      />
    </div>
  );
}
