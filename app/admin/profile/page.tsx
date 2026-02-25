import { getUserData } from "@/lib/cookie";

import ProfileClient from "./_components/ProfileClient";

export default async function ProfilePage() {
  const user = await getUserData();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative px-6">
        <ProfileClient admin={user} />
      </div>
    </div>
  );
}
