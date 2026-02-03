"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { updateUserSchema, UpdateUserData } from "@/app/user/profile/schema";
import { handleUpdateProfile } from "@/lib/actions/auth_action";

export default function EditProfileForm({
  user,
  onCancel,
}: {
  user: any;
  onCancel: () => void;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState<UpdateUserData>({
    fullname: user.fullname || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    profileUrl: user.profileUrl,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /** Profile preview (File OR string) */
  const profilePreview = form.profileUrl
    ? form.profileUrl instanceof File
      ? URL.createObjectURL(form.profileUrl)
      : `${backendUrl}/uploads/profile/${form.profileUrl}`
    : user.profileUrl
    ? `${backendUrl}/uploads/profile/${user.profileUrl}`
    : "/placeholder-profile.png";

  const onSubmit = async () => {
    setError(null);
    setLoading(true);

    const parsed = updateUserSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullname", parsed.data.fullname);
      formData.append("email", parsed.data.email);
      formData.append("phone", parsed.data.phone);
      formData.append("address", parsed.data.address);
      formData.append("role", user.role);

      if (parsed.data.profileUrl instanceof File) {
        formData.append("profileUrl", parsed.data.profileUrl);
      }

      const res = await handleUpdateProfile(formData);
      if (!res.success) throw new Error(res.message || "Update failed");

      toast.success("Profile updated successfully");
      onCancel();
    } catch (err: any) {
      toast.error(err.message || "Update failed");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/100 text-black">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative space-y-4 text-black">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-black hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-black">Edit Profile</h2>

        <Input
          label="Full Name"
          value={form.fullname}
          onChange={(e: any) =>
            setForm({ ...form, fullname: e.target.value })
          }
        />

        <Input
          label="Email"
          value={form.email}
          onChange={(e: any) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <Input
          label="Phone"
          value={form.phone}
          onChange={(e: any) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <Input
          label="Address"
          value={form.address}
          onChange={(e: any) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        {/* Profile Image */}
        <div className="flex items-start gap-6">
          <div className="relative group">
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, profileUrl: e.target.files?.[0] })
              }
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition pointer-events-none text-center px-2">
              Tap the profile image to change
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 mt-4">
          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex-1 bg-green-600 text-black py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-black py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm text-black">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
      />
    </div>
  );
}


