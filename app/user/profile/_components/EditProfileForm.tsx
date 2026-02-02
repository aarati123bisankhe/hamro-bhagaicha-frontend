// // "use client";

// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { updateUserSchema, UpdateUserData } from "@/app/user/profile/schema";
// // import { useState } from "react";

// // type Props = {
// //   onClose: () => void;
// //   defaultValues?: UpdateUserData;
// //   onSave: (data: UpdateUserData) => void;
// // };

// // export default function EditProfileForm({ onClose, defaultValues }: Props) {
// //   const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateUserData>({
// //     resolver: zodResolver(updateUserSchema),
// //     defaultValues,
// //   });

// //   const [preview, setPreview] = useState<string | null>(defaultValues?.profileUrl || null);

// //   const onSubmit = (data: UpdateUserData) => {
// //      onSave(data); 
// //     console.log(data);
// //     onClose();
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //       <form
// //         onSubmit={handleSubmit(onSubmit)}
// //         className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4"
// //       >
// //         <div className="flex justify-between items-center">
// //           <h2 className="text-lg font-semibold">Edit Profile</h2>
// //           <button type="button" onClick={onClose}>✕</button>
// //         </div>

// //         <Input label="First Name" {...register("firstName")} error={errors.firstName?.message} />
// //         <Input label="Phone" {...register("phone")} error={errors.phone?.message} />
// //         <Input label="Address" {...register("address")} error={errors.address?.message} />
// //         <Input label="Email" {...register("email")} disabled />

// //         {/* File input */}
// //         <div>
// //           <label className="text-sm">Profile Image</label>
// //           <input
// //             type="file"
// //             accept=".jpg,.jpeg,.png,.webp"
// //             onChange={(e) => {
// //               const file = e.target.files?.[0];
// //               setValue("profileUrl", file as any); // pass to react-hook-form
// //               if (file) setPreview(URL.createObjectURL(file));
// //             }}
// //           />
// //           {preview && (
// //             <img src={preview} className="w-24 h-24 rounded-full mt-2 object-cover" alt="Preview" />
// //           )}
// //           {errors.profileUrl && (
// //             <p className="text-red-500 text-xs">
// //               {typeof errors.profileUrl === "string"
// //                 ? errors.profileUrl
// //                 : (errors.profileUrl as any)?.message}
// //             </p>
// //           )}
// //         </div>

// //         <button className="w-full bg-green-600 text-white py-2 rounded-lg">
// //           Save Changes
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // function Input({ label, error, ...props }: any) {
// //   return (
// //     <div>
// //       <label className="text-sm">{label}</label>
// //       <input
// //         {...props}
// //         className="w-full border rounded-lg px-3 py-2"
// //       />
// //       {error && <p className="text-red-500 text-xs">{error}</p>}
// //     </div>
// //   );
// // }
// // function onSave(data: { firstName: string; email: string; phone: string; address: string; profileUrl?: any; }) {
// //     throw new Error("Function not implemented.");
// // }



// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { updateUserSchema, UpdateUserData } from "@/app/user/profile/schema";
// import { handleUpdateProfile } from "@/lib/actions/auth_action";
// import { useState } from "react";

// type Props = {
//   defaultValues?: UpdateUserData;
//   onClose: () => void;
//   onSave: (data: UpdateUserData) => void;
// };

// export default function EditProfileForm({ defaultValues, onClose, onSave }: Props) {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateUserData>({
//     resolver: zodResolver(updateUserSchema),
//     defaultValues,
//   });

//   const [preview, setPreview] = useState<string | null>(
//     defaultValues?.profileUrl ? URL.createObjectURL(defaultValues.profileUrl as File) : null
//   );

//   const profileUrlError = typeof errors.profileUrl === "string"
//     ? errors.profileUrl
//     : (errors.profileUrl as any)?.message;

//   const submitHandler = (data: UpdateUserData) => {
//     onSave(data); // save changes to parent
//     onClose();    // close modal
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <form
//         onSubmit={handleSubmit(submitHandler)}
//         className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4 relative"
//       >
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Edit Profile</h2>
//           <button type="button" onClick={onClose}>✕</button>
//         </div>

//         <Input label="First Name" {...register("firstName")} error={errors.firstName?.message} />
//         <Input label="Phone" {...register("phone")} error={errors.phone?.message} />
//         <Input label="Address" {...register("address")} error={errors.address?.message} />
//         <Input label="Email" {...register("email")} disabled />

//         {/* File input */}
//         <div>
//           <label className="text-sm">Profile Image</label>
//           <input
//             type="file"
//             accept=".jpg,.jpeg,.png,.webp"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               setValue("profileUrl", file as any);
//               if (file) setPreview(URL.createObjectURL(file));
//             }}
//           />
//           {preview && (
//             <img src={preview} alt="Preview" className="w-24 h-24 mt-2 rounded-full object-cover" />
//           )}
//           {profileUrlError && (
//             <p className="text-red-500 text-xs">{profileUrlError}</p>
//           )}
//         </div>

//         <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

// function Input({ label, error, ...props }: any) {
//   return (
//     <div>
//       <label className="text-sm">{label}</label>
//       <input
//         {...props}
//         className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//       />
//       {error && <p className="text-red-500 text-xs">{error}</p>}
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { updateUserSchema, UpdateUserData } from "@/app/user/profile/schema";
import { handleUpdateProfile } from "@/lib/actions/auth_action"; // your API call

type Props = {
  defaultValues?: UpdateUserData;
  onClose: () => void;
  onSave: (data: UpdateUserData) => void;
};

export default function EditProfileForm({ defaultValues, onClose, onSave }: Props) {
  const [form, setForm] = useState<UpdateUserData>({
    firstName: defaultValues?.firstName || "",
    email: defaultValues?.email || "",
    phone: defaultValues?.phone || "",
    address: defaultValues?.address || "",
    profileUrl: defaultValues?.profileUrl,
  });

  const [preview, setPreview] = useState<string | null>(
    defaultValues?.profileUrl ? URL.createObjectURL(defaultValues.profileUrl as File) : null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

//   const onSubmit = async () => {
//     setError(null);
//     setLoading(true);

//     // Validate form using zod
//     const parsed = updateUserSchema.safeParse(form);
//     if (!parsed.success) {
//       setError(parsed.error.issues[0].message);
//       setLoading(false);
//       return;
//     }

//     try {
//       // Create FormData to send to backend
//       const formData = new FormData();
//       formData.append("firstName", parsed.data.firstName);
//       formData.append("email", parsed.data.email);
//       formData.append("phone", parsed.data.phone);
//       formData.append("address", parsed.data.address);

//       if (parsed.data.profileUrl instanceof File) {
//         formData.append("profileUrl", parsed.data.profileUrl);
//       }

//       // Call backend API
//       const res = await handleUpdateProfile(formData);

//       if (!res.success) throw new Error(res.message || "Update failed");

//       // Update parent state
//       onSave({
//         firstName: parsed.data.firstName,
//         email: parsed.data.email,
//         phone: parsed.data.phone,
//         address: parsed.data.address,
//         profileUrl: parsed.data.profileUrl instanceof File ? parsed.data.profileUrl : parsed.data.profileUrl,
//       });

//       toast.success("Profile updated successfully");
//       onClose();
//     } catch (err: any) {
//       setError(err.message);
//       toast.error(err.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

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
    formData.append("firstName", parsed.data.firstName);
    formData.append("email", parsed.data.email);
    formData.append("phone", parsed.data.phone);
    formData.append("address", parsed.data.address);

    if (parsed.data.profileUrl instanceof File) {
      formData.append("profileUrl", parsed.data.profileUrl);
    }

    const res = await handleUpdateProfile(formData);

    if (!res.success) {
      throw new Error(res.message || "Update failed");
    }

    // Extract profileUrl from response safely (support res.data.user.profileUrl or res.data.profileUrl)
    let serverProfileUrl: string | undefined;
    if ("data" in res && res.data) {
      // use 'any' here because backend response shape may vary
      serverProfileUrl = (res.data as any).user?.profileUrl ?? (res.data as any).profileUrl;
    }

    // ✅ SAVE STRING filename ONLY (fallback to parsed.data.profileUrl if server didn't return one)
    onSave({
      ...parsed.data,
      profileUrl: serverProfileUrl ?? parsed.data.profileUrl,
    });

    toast.success("Profile updated successfully");
    onClose();
  } catch (err: any) {
    setError(err.message);
    toast.error(err.message || "Update failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold">Edit Profile</h2>

        <Input
          label="First Name"
          value={form.firstName}
          onChange={(e: { target: { value: any; }; }) => setForm({ ...form, firstName: e.target.value })}
        />

        <Input
          label="Email"
          value={form.email}
          onChange={(e: { target: { value: any; }; }) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          label="Phone"
          value={form.phone || ""}
          onChange={(e: { target: { value: any; }; }) => setForm({ ...form, phone: e.target.value })}
        />

        <Input
          label="Address"
          value={form.address || ""}
          onChange={(e: { target: { value: any; }; }) => setForm({ ...form, address: e.target.value })}
        />

        <div>
          <label className="text-sm text-gray-600">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setForm({ ...form, profileUrl: file });
              setPreview(URL.createObjectURL(file));
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full mt-2 object-cover"
            />
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 mt-4">
          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
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
      <label className="text-sm">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
