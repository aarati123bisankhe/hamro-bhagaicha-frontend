"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import z from "zod";
import { toast } from "react-toastify";
import Button from "./Button";
import { resetPassword } from "@/lib/api/auth";
import { Link } from "lucide-react";
import { handleResetPassword } from "@/lib/actions/auth_action";

export const ResetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});

export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm({
    token,
}: {
    token: string;
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordDTO>({
        resolver: zodResolver(ResetPasswordSchema)
    });
    const router = useRouter();
    const onSubmit = async (data: ResetPasswordDTO) => {
        try {
            const response = await handleResetPassword(token, data.password);
            if (response.success) {
                toast.success("Password reset successfully");
                router.replace('/login');
            } else {
                toast.error(response.message || "Failed to reset password");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        }
    }

  return (
   <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto mt-5">
  <div className="relative mb-5">
    <h2 className="text-2xl mb-10 font-semibold text-[#063c19ff] text-center">
      Reset Password
    </h2>
  </div>

  <p className="text-sm text-gray-900 mb-10 text-center">
    Enter your new password below to reset your account password.
  </p>

  <div>
    <input
      type="password"
      placeholder="New password"
      {...register("password")}
      className="w-full mb-5 px-4 py-3 rounded-lg border border-gray-300 text-base"
      style={{
        backgroundColor: "#b4c0aeff",
        color: "#1c1c1c",
        outline: "none",
        boxShadow: "none",
      }}
    />
    {errors.password && (
      <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
    )}
  </div>

  <div>
    <input
      type="password"
      placeholder="Confirm new password"
      {...register("confirmPassword")}
      className="w-full mb-5 px-4 py-3 rounded-lg border border-gray-300 text-base"
      style={{
        backgroundColor: "#b4c0aeff",
        color: "#1c1c1c",
        outline: "none",
        boxShadow: "none",
      }}
    />
    {errors.confirmPassword && (
      <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
    )}
  </div>

  <Button
    type="submit"
    disabled={isSubmitting}
    style={{
      backgroundColor: "#020e36ff",
      color: "white",
      padding: "12px 39px",
      borderRadius: "30px",
      width: "100%",
    }}
  >
    {isSubmitting ? "Resetting..." : "Reset Password"}
  </Button>
</form>

  );
}
