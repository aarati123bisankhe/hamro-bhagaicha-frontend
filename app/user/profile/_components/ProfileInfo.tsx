"use client";

export default function ProfileInfo({
    user,
    onEdit }: {

    user: {
      fullname?: string;
      fullName?: string;
      name?: string;
      email?: string;
      phoneNumber?: string;
      phone?: string;
      address?: string;
    },
    onEdit: () => void;
}) {
  const fullName = user.fullname || user.fullName || user.name || "Not provided";
  const email = user.email || "Not provided";
  const phoneNumber = user.phoneNumber || user.phone || "Not provided";
  const address = user.address || "Not provided";

  return (
    <div className="space-y-2">
    <div className="space-y-8 rounded-xl bg-[#eaf1e5] p-6 shadow">
      <div className="flex justify-between items-center ">
        <h2 className="text-xl font-semibold text-[#1d4125]">Profile Information</h2>
        <button
          onClick={onEdit}
          className="rounded-lg bg-[#2f5d3a] px-4 py-2 text-white transition hover:bg-[#264a2e]"
        >
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <Info label="Full Name" value={fullName} />
        <Info label="Email Address" value={email} />
        <Info label="Phone Number" value={phoneNumber} />
        <Info label="Address" value={address} />
      </div>
    </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-[#5e7263]">{label}</p>
      <p className="mt-1 font-semibold text-[#1d4125]">{value}</p>
    </div>
  );
}
