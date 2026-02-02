// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { updateUserSchema, UpdateUserData } from "@/app/user/profile/schema";

// type Props = {
//   onClose: () => void;
// };

// export default function EditProfileForm({ onClose }: Props) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<UpdateUserData>({
//     resolver: zodResolver(updateUserSchema),
//   });

//   const onSubmit = (data: UpdateUserData) => {
//     console.log(data);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4"
//       >
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Edit Profile</h2>
//           <button type="button" onClick={onClose}>✕</button>
//         </div>

//         <Input label="First Name" {...register("firstName")} error={errors.firstName?.message} />
//         <Input label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
//         <Input label="Username" {...register("username")} error={errors.username?.message} />
//         <Input label="Email" {...register("email")} disabled />

//         <div>
//           <label className="text-sm">Profile Image</label>
//           <input type="file" {...register("profileUrl")} />
//           {errors.profileUrl && (
//             <p className="text-red-500 text-xs">{errors.profileUrl.message}</p>
//           )}
//         </div>

//         <button className="w-full bg-green-600 text-white py-2 rounded-lg">
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
//         className="w-full border rounded-lg px-3 py-2"
//       />
//       {error && <p className="text-red-500 text-xs">{error}</p>}
//     </div>
//   );
// }


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema, UpdateUserData } from "@/app/user/profile/schema";

type Props = {
  onClose: () => void;
  defaultValues: UpdateUserData;
};

export default function EditProfileForm({ onClose, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues,
  });

  const onSubmit = (data: UpdateUserData) => {
    console.log("Updated User:", data);
    onClose();
  };

  const getErrorMessage = (err: any): string | undefined =>
    typeof err === "string" ? err : err?.message;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4 shadow-lg"
      >
        <div className="flex justify-between items-center ">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <Input label="First Name" {...register("firstName")} error={errors.firstName?.message} />
        <Input label="Email" {...register("email")} disabled />

        <div>
          <label className="text-sm font-medium">Profile Image</label>
          <input type="file" {...register("profileUrl")} className="mt-1 w-full" />
          {errors.profileUrl && (
            <p className="text-red-500 text-xs">
              {getErrorMessage(errors.profileUrl)}
            </p>
          )}
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}

function Input({ label, error, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className={`w-full border rounded-lg px-3 py-2 mt-1 
          bg-white text-gray-900
          focus:outline-none focus:ring-2 focus:ring-green-500 
          ${props.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

