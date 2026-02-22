"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateUserSchema, UpdateUserData } from "@/app/user/profile/schema";
import { handleUpdateProfile } from "@/lib/actions/auth_action";

type ProfileUser = {
  fullname?: string;
  fullName?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  address?: string;
  role?: string;
  profileUrl?: string;
};

export default function EditProfileForm({
  user,
  onCancel,
  onSaved,
}: {
  user: ProfileUser;
  onCancel: () => void;
  onSaved: (updatedUser: ProfileUser) => void;
}) {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState<UpdateUserData>({
    fullname: user.fullname ?? user.fullName ?? user.name ?? "",
    email: user.email ?? "",
    phoneNumber: user.phoneNumber ?? user.phone ?? "",
    address: user.address ?? "",
    profileUrl: undefined,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const profilePreview = form.profileUrl
    ? URL.createObjectURL(form.profileUrl)
    : user.profileUrl
    ? `${backendUrl}/uploads/profile/${user.profileUrl}`
    : "";

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
      formData.append("phoneNumber", parsed.data.phoneNumber);
      formData.append("address", parsed.data.address);
      formData.append("role", user.role ?? "user");
      if (parsed.data.profileUrl) {
        formData.append("profileUrl", parsed.data.profileUrl);
      }

      const res = await handleUpdateProfile(formData);
      if (!res.success) throw new Error(res.message || "Update failed");

      const updatedUser = (res.data as ProfileUser) ?? {
        ...user,
        fullname: parsed.data.fullname,
        email: parsed.data.email,
        phoneNumber: parsed.data.phoneNumber,
        address: parsed.data.address,
      };

      onSaved(updatedUser);
      window.dispatchEvent(new Event("user-data-updated"));
      router.refresh();
      toast.success("Profile updated successfully");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-[#eef4e9] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#1d4125]">Edit Profile</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="space-y-3">
          <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-white bg-[#d9e7d4] shadow">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-[#2f5d3a]">
                {(form.fullname?.charAt(0) || "U").toUpperCase()}
              </div>
            )}
          </div>
          <label className="block cursor-pointer rounded-lg bg-white px-4 py-2 text-center text-sm font-medium text-[#2f5d3a] shadow-sm">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setForm({ ...form, profileUrl: event.target.files?.[0] })
              }
              className="hidden"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name">
            <input
              value={form.fullname}
              onChange={(event) =>
                setForm({ ...form, fullname: event.target.value })
              }
              className="w-full text-black rounded-lg border border-[#c8d9c5] bg-white px-3 py-2 outline-none focus:border-[#6f9b76]"
            />
          </Field>

          <Field label="Email">
            <input
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              className="w-full text-black rounded-lg border border-[#c8d9c5] bg-white px-3 py-2 outline-none focus:border-[#6f9b76]"
            />
          </Field>

          <Field label="Phone Number">
            <input
              value={form.phoneNumber}
              onChange={(event) =>
                setForm({ ...form, phoneNumber: event.target.value })
              }
              className="w-full text-black rounded-lg border border-[#c8d9c5] bg-white px-3 py-2 outline-none focus:border-[#6f9b76]"
            />
          </Field>

          <Field label="Address">
            <input
              value={form.address}
              onChange={(event) =>
                setForm({ ...form, address: event.target.value })
              }
              className="w-full text-black rounded-lg border border-[#c8d9c5] bg-white px-3 py-2 outline-none focus:border-[#6f9b76]"
            />
          </Field>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="rounded-lg bg-[#2f5d3a] px-5 py-2.5 font-medium text-white transition hover:bg-[#264a2e] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg bg-white px-5 py-2.5 font-medium text-[#2f5d3a] shadow-sm transition hover:bg-[#f2f7ef]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-sm font-medium text-[#45634b]">{label}</span>
      {children}
    </label>
  );
}
