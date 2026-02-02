"use client";

type Props = {
  onEdit: () => void;
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

export default function ProfileInfo({ onEdit, fullName, email, phone, address }: Props) {
  return (
    <div className="bg-[#c8d9c5] p-6 rounded-xl shadow space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center ">
        <h2 className="text-xl font-semibold text-black">Profile Information</h2>
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <Info label="Full Name" value={fullName} />
        <Info label="Email Address" value={email} />
        <Info label="Phone Number" value={phone} />
        <Info label="Address" value={address} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-900 font-medium">{label}</p> {/* Label in dark gray/black */}
      <p className="text-black font-semibold mt-1">{value}</p> {/* Value in black */}
    </div>
  );
}




