import { getUserData } from "@/lib/cookie";

import ProfileClient from "./_components/ProfileClient";
import ProfileAvatar from "./_components/ProfileAvatar";
import ProfileInfo from "./_components/ProfileInfo";

export default async function ProfilePage() {
  const user = await getUserData();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">

      <div className="relative px-6">
        <ProfileAvatar profileUrl={user.profileUrl} />
        <ProfileClient user={user} />
        {/* <ProfileStats user={user} /> */}
       
      </div>
    </div>
  );
}