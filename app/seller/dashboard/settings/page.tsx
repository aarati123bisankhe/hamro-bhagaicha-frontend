"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/user/dashboard/components/useCurrentUser";
import { handleUpdateProfile } from "@/lib/actions/auth_action";
import { useSellerUiSettings } from "../components/useSellerUiSettings";

function ToggleRow({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#d7e2d1] bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-[#23412d]">{label}</p>
        <p className="text-xs text-[#5f7d65]">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-7 w-16 items-center rounded-full transition ${
          checked ? "bg-[#2f5d3a]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-9" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function SellerSettingsPage() {
  const router = useRouter();
  const user = useCurrentUser();
  const { settings, updateSetting, resetSettings } = useSellerUiSettings();
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
        <p className="text-sm text-[#48664f]">
          Manage your seller profile, theme and dashboard preferences.
        </p>
      </div>

      <div className="max-w-4xl rounded-xl border border-[#d7e5d8] bg-white p-5 shadow-sm">
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

      <div className="max-w-4xl rounded-xl border border-[#d7e5d8] bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#23412d]">Appearance</h3>
          <button
            onClick={resetSettings}
            className="rounded-lg border border-[#e8c8c8] bg-[#fff2f2] px-3 py-1.5 text-xs font-semibold text-[#b74841] hover:bg-[#ffeaea]"
          >
            Reset Defaults
          </button>
        </div>
        <div className="rounded-2xl border border-[#d7e2d1] bg-white p-4">
          <p className="text-sm font-semibold text-[#23412d]">Theme</p>
          <p className="mb-3 text-xs text-[#5f7d65]">
            Choose how your seller dashboard should look.
          </p>
          <select
            value={settings.theme}
            onChange={(event) => updateSetting("theme", event.target.value as "light" | "dark")}
            className="w-full rounded-xl border border-[#c6d4be] bg-white px-3 py-2 text-sm outline-none ring-[#8fb494] focus:ring-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="max-w-4xl rounded-xl border border-[#d7e5d8] bg-white p-5 shadow-sm space-y-3">
        <h3 className="text-lg font-semibold text-[#23412d]">Notifications & Store</h3>
        <ToggleRow
          label="Email Notifications"
          description="Receive order and account notifications by email."
          checked={settings.emailNotifications}
          onToggle={() => updateSetting("emailNotifications", !settings.emailNotifications)}
        />
        <ToggleRow
          label="Order Alerts"
          description="Notify immediately when a new order arrives."
          checked={settings.orderAlerts}
          onToggle={() => updateSetting("orderAlerts", !settings.orderAlerts)}
        />
        <ToggleRow
          label="Low Stock Alerts"
          description="Alert when stock goes below your threshold."
          checked={settings.lowStockAlerts}
          onToggle={() => updateSetting("lowStockAlerts", !settings.lowStockAlerts)}
        />
        <ToggleRow
          label="Weekly Sales Report"
          description="Get one weekly sales summary in notifications."
          checked={settings.weeklySalesReport}
          onToggle={() => updateSetting("weeklySalesReport", !settings.weeklySalesReport)}
        />
        <ToggleRow
          label="Auto Accept Orders"
          description="Automatically accept incoming orders."
          checked={settings.autoAcceptOrders}
          onToggle={() => updateSetting("autoAcceptOrders", !settings.autoAcceptOrders)}
        />
      </div>
    </section>
  );
}
