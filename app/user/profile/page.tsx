import { getUserData } from "@/lib/cookie";
import Link from "next/link";

import ProfileClient from "./_components/ProfileClient";
import ProfileAvatar from "./_components/ProfileAvatar";

export default async function ProfilePage() {
  const user = await getUserData();

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  const displayName = user.fullname || user.fullName || user.name || "User";
  const displayEmail = user.email || "No email";
  const displayRole = user.role || "Customer";

  return (
    <div className="min-h-screen bg-[#f3f2ed] px-4 py-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-[#4b5f50]">My Account</p>
            <h1 className="text-3xl font-semibold text-[#1f4f2a]">My Profile</h1>
          </div>

          <Link
            href="/user/dashboard"
            className="rounded-lg bg-[#dbe7d7] px-4 py-2 text-sm font-medium text-[#264a2e] transition hover:bg-[#cfe0c9]"
          >
            Close ✕
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl bg-[#dbe7d7] p-5 shadow-sm">
            <ProfileAvatar profileUrl={user.profileUrl} fullname={displayName} />
            <h2 className="mt-4 text-lg font-semibold text-[#1d4125]">
              {displayName}
            </h2>
            <p className="text-sm text-[#4f6354]">{displayEmail}</p>
            <div className="mt-4 inline-flex rounded-full bg-[#b9d2b4] px-3 py-1 text-xs font-semibold text-[#1f4f2a]">
              {displayRole}
            </div>
          </aside>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <ProfileClient user={user} />
          </section>
        </div>
      </div>
    </div>
  );
}
