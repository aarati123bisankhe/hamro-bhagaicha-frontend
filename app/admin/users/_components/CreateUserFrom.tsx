// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { adminCreateUserSchema, AdminCreateUserData } from "@/app/admin/scheme";
// import { handleCreateUser } from "@/lib/actions/admin/user_action";
// import { toast } from "react-toastify";

// export default function CreateUserForm({
//   onCancel,
//   onSuccess,
// }: {
//   onCancel: () => void;
//   onSuccess: () => void;
// }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<AdminCreateUserData>({
//     resolver: zodResolver(adminCreateUserSchema),
//     defaultValues: { role: "user" },
//   });

//   const onSubmit = async (data: AdminCreateUserData) => {
//   const payload = {
//   fullName: data.fullName,
//   email: data.email,
//   password: data.password,
//   address: data.address,
//   phoneNumber: data.phoneNumber,
//   role: data.role,
//     };

//     const res = await handleCreateUser(payload as any);

//     if (!res.success) {
//       toast.error(res.message);
//       return;
//     }

//     toast.success("User created successfully!");
//     reset();
//     onSuccess();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">

//       <div>
//         <input
//           {...register("fullName")}
//           placeholder="Full Name"
//           className="w-full border border-gray-300 p-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//         {errors.fullName && (
//           <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
//         )}
//       </div>

//       <div>
//         <input
//           {...register("email")}
//           placeholder="Email"
//           className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       <div>
//         <input
//           type="password"
//           {...register("password")}
//           placeholder="Password"
//           className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//         {errors.password && (
//           <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//         )}
//       </div>

//       <div>
//         <input
//           {...register("phoneNumber")}
//           placeholder="Phone Number"
//           className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//         {errors.phoneNumber && (
//           <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
//         )}
//       </div>

//       <div>
//   <input
//     {...register("address")}
//     placeholder="Address"
//     className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-500"
//   />
//   {errors.address && (
//     <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
//   )}
// </div>



//       <div>
//         <select
//           {...register("role")}
//           className="w-full border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//       </div>

//       <div className="flex justify-end gap-3 pt-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
//         >
//           {isSubmitting ? "Creating..." : "Create User"}
//         </button>
//       </div>
//     </form>
//   );
// }



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

  /* ---------------- PROFILE IMAGE PREVIEW ---------------- */
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  /* ---------------- FILE CHANGE HANDLER ---------------- */
  const handleFileChange = (file?: File) => {
    setValue("profileUrl", file);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* ---------------- SUBMIT ---------------- */
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

  /* ---------------- UI ---------------- */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-black"
    >
      {/* Full Name */}
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

      {/* Email */}
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

      {/* Password */}
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

      {/* Phone */}
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

      {/* Address */}
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

      {/* Profile Image */}
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

      {/* Role */}
      <div>
        <select
          {...register("role")}
          className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-green-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Buttons */}
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
