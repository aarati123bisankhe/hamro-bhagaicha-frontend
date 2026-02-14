"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  ChangePasswordData,
  changePasswordSchema,
} from "../schema";
import Button from "./Button";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const submit = async (values: ChangePasswordData) => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 1000));

      console.log("Password Updated:", values.password);
      router.push("/login");
    });
  };

  return (
    /* CENTER WHOLE FORM */
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-6 w-full max-w-sm"
      >
        {/* HEADER */}
        <div className="relative mb-20">
          <span
            className="absolute left-0 cursor-pointer text-xl font-medium text-black"
            onClick={() => router.back()}
          >
            &lt;
          </span>

          <h2 className="text-2xl font-semibold text-[#063c19ff] text-center">
            Changed Password
          </h2>
        </div>

        {/* NEW PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="New password"
            {...register("password")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            style={{
              backgroundColor: "#b4c0aeff",
              color: "#1c1c1c",
              outline: "none",
              boxShadow: "none",
            }}
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            style={{
              backgroundColor: "#b4c0aeff",
              color: "#1c1c1c",
              outline: "none",
              boxShadow: "none",
            }}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* BUTTON */}
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
          {isSubmitting || pending ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
}
