"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { updateAdminSchema, UpdateAdminData } from "@/app/admin/profile/schema";
import { handleUpdateProfile } from "@/lib/actions/auth_action";

export default function EditAdminProfileForm({
  admin,
  onCancel,
}: {
  admin: any;
  onCancel: () => void;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState<UpdateAdminData>({
    fullname: admin.fullName ?? "",
    email: admin.email ?? "",
    phoneNumber: admin.phone ?? "",
    address: admin.address ?? "",
    profileUrl: undefined,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const profilePreview = form.profileUrl
    ? form.profileUrl instanceof File
      ? URL.createObjectURL(form.profileUrl)
      : `${backendUrl}/uploads/profile/${form.profileUrl}`
    : admin.profileUrl
    ? `${backendUrl}/uploads/profile/${admin.profileUrl}`
    : "/placeholder-profile.png";

  const onSubmit = async () => {
    setError(null);
    setLoading(true);

    const parsed = updateAdminSchema.safeParse(form);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("fullname", admin.fullname);
      formData.append("email", admin.email);
      formData.append("phoneNumber", admin.phoneNumber);
      formData.append("address", admin.address);
      formData.append("role", admin.role);
      formData.append("status", admin.status);

      if (parsed.data.profileUrl) {
        formData.append("profileUrl", parsed.data.profileUrl);
      }

      const res = await handleUpdateProfile(formData);

      if (!res.success) throw new Error(res.message || "Update failed");

      toast.success("Admin profile updated successfully");
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

        <h2 className="text-xl font-semibold text-black">
          Edit Admin Profile
        </h2>

        <input
          placeholder="FullName"
          value={form.fullname}
          onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="PhoneNumber"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm({ ...form, phoneNumber: e.target.value })
          }
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

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
                setForm({
                  ...form,
                  profileUrl: e.target.files?.[0],
                })
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
