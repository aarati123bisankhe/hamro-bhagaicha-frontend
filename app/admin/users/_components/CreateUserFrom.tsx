"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminCreateUserSchema,
  AdminCreateUserData,
} from "@/app/admin/scheme";
import { handleCreateUser } from "@/lib/actions/admin/user_action";
import { toast } from "react-toastify";
import { useState } from "react";

export default function CreateUserForm({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdminCreateUserData>({
    resolver: zodResolver(adminCreateUserSchema),
    defaultValues: {
      role: "user",
    },
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleFileChange = (file?: File) => {
    setValue("profileUrl", file);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: AdminCreateUserData) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);
      formData.append("role", data.role);

      if (data.profileUrl) {
        formData.append("profileUrl", data.profileUrl);
      }

      const res = await handleCreateUser(formData);

      if (!res.success) {
        toast.error(res.message || "Failed to create user");
        return;
      }

      toast.success("User created successfully!");

      reset();
      setProfilePreview(null);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-black"
    >
      <div>
        <input
          {...register("fullName")}
          placeholder="Full Name"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phoneNumber")}
          placeholder="Phone Number"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...register("address")}
          placeholder="Address"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium">Profile Picture</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
        />

        {profilePreview && (
          <img
            src={profilePreview}
            className="mt-2 w-24 h-24 rounded-full object-cover"
            alt="preview"
          />
        )}
      </div>

      <div>
        <select
          {...register("role")}
          className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-green-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create User"}
        </button>
      </div>
    </form>
  );
}
