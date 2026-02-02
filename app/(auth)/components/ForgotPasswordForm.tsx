"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ForgotPasswordData, forgotPasswordSchema } from "../schema";
import Button from "./Button";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const submit = async (values: ForgotPasswordData) => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Forgot password request for:", values.email);
      router.push("/auth/login");
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      
       <div className="relative mb-5">
     <span
     className="absolute left-0 cursor-pointer text-xl font-medium text-black"
     onClick={() => router.push("/auth/login")}
    >
      &lt;
    </span>

    <h2 className="text-2xl mb-20 font-semibold text-[#063c19ff] text-center">
    Forgot Password
    </h2>
   </div>

      <p className="text-sm text-gray-900 mb-10">
        Enter your email below. We'll send you instructions to reset your password.
      </p>

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full mb-5 px-4 py-3 rounded-lg border border-gray-300"
          style={{
            backgroundColor: "#b4c0aeff",
            color: "#1c1c1c",
            outline: "none",
            boxShadow: "none",
          }}
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || pending}
        style={{
          backgroundColor: "#020e36ff",
          color: "white",
          padding: "12px 39px",
          borderRadius: "30px",
          width: "100%",
        }}
      >
        {isSubmitting || pending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}

