"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/user/dashboard/components/useCurrentUser";
import { handleUpdateProfile } from "@/lib/actions/auth_action";

export default function SellerSettingsPage() {
  const router = useRouter();
  const user = useCurrentUser();
  const userRecord = user as
    | (typeof user & { phoneNumber?: string; phone?: string; address?: string })
    | null;
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const displayName = user?.fullname || user?.fullName || user?.name || "Seller";
  const displayEmail = user?.email || "";
  const displayRole = user?.role || "seller";
  const displayPhone = userRecord?.phoneNumber || userRecord?.phone || "";
  const displayAddress = userRecord?.address || "";

  const previewUrl = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    if (user?.profileUrl) {
      return `${backendUrl}/uploads/profile/${user.profileUrl}`;
    }

    return "";
  }, [selectedFile, user?.profileUrl, backendUrl]);

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!selectedFile) {
      setError("Please choose an image first.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullname", displayName);
      formData.append("email", displayEmail);
      formData.append("phoneNumber", displayPhone);
      formData.append("address", displayAddress);
      formData.append("role", displayRole);
      formData.append("profileUrl", selectedFile);

      const result = await handleUpdateProfile(formData);
      if (!result.success) {
        throw new Error(result.message || "Failed to update profile picture");
      }

      setSelectedFile(undefined);
      setSuccess("Profile picture updated successfully.");
      window.dispatchEvent(new Event("user-data-updated"));
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3d2c]">Settings</h2>
        <p className="text-sm text-[#48664f]">Update your seller profile picture.</p>
      </div>

      <div className="max-w-xl rounded-xl border border-[#d7e5d8] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-[#6f8f77] text-white flex items-center justify-center text-2xl font-semibold">
            {previewUrl ? (
              <img src={previewUrl} alt={displayName} className="h-full w-full object-cover" />
            ) : (
              displayName.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <p className="font-semibold text-[#23412d]">{displayName}</p>
            <p className="text-sm text-[#5c7662]">{displayEmail || "seller@gmail.com"}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <label className="inline-flex cursor-pointer items-center rounded-lg border border-[#cfe1d0] px-4 py-2 text-sm font-medium text-[#2f5d46] hover:bg-[#f3faf4]">
            Choose New Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => setSelectedFile(event.target.files?.[0])}
            />
          </label>

          <div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-lg bg-[#2f5d46] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#244937] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Profile Picture"}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-700">{success}</p>}
        </div>
      </div>
    </section>
  );
}
