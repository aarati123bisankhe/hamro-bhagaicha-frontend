"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import z from "zod";
import Button from "@/app/(auth)/components/Button";
import { requestPasswordReset } from "@/lib/api/auth";
import router from "next/router";

export const RequestPasswordResetSchema = z.object({
    email: z.email()
});

export type RequestPasswordResetDTO = z.infer<typeof RequestPasswordResetSchema>;
export default function Page() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RequestPasswordResetDTO>({
        resolver: zodResolver(RequestPasswordResetSchema)
    });
    const onSubmit = async (data: RequestPasswordResetDTO) => {
        try{
            const response = await requestPasswordReset(data.email);
            if (response.success) {
                toast.success('Password reset link sent to your email.');
            }else{
                toast.error(response.message || 'Failed to request password reset.');
            }
        }catch(error){
            toast.error((error as Error).message || 'Failed to request password reset.');
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto mt-5">
      <div className="relative mb-5">
        {/* <span
          className="absolute left-0 cursor-pointer text-xl font-medium text-black"
          onClick={() => router.back()}
        >
          &lt;
        </span> */}

        <h2 className="text-2xl mb-20 font-semibold text-[#063c19ff] text-center">
          Forgot Password
        </h2>
      </div>

      <p className="text-sm text-gray-900 mb-10 text-center">
        Enter your email below. We'll send you instructions to reset your password.
      </p>

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full mb-5 px-4 py-3 rounded-lg border border-gray-300"
          style={{ backgroundColor: "#b4c0aeff", color: "#1c1c1c", outline: "none", boxShadow: "none" }}
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        style={{ backgroundColor: "#020e36ff", color: "white", padding: "12px 39px", borderRadius: "30px", width: "100%" }}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
