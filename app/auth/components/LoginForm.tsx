"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import Button from "./Button";

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (values: LoginData) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      router.push("/dashboard");
    });
  };

  const inputStyle = {
    backgroundColor: "#b4c0aeff",
    color: "#1c1c1c",
    outline: "none",
    boxShadow: "none",
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {/* HEADER */}
      <h1
        className="text-4xl font-bold text-center mb-16"
        style={{ fontFamily: "var(--font-abhaya)", color: "#072010ff" }}
      >
        Hamro Bhagaicha 🌿
      </h1>

      <h2 className="text-lg font-semibold text-[#063c19ff]">Login</h2>

      {/* EMAIL */}
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          style={inputStyle}
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* PASSWORD */}
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          style={inputStyle}
        />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
      </div>

      {/* FORGOT PASSWORD */}
      <div className="w-full text-right">
        <span
          className="text-sm hover:underline cursor-pointer"
          style={{ color: "#021c71ff" }}
          onClick={() => router.push("/auth/forgotpassword")}
        >
          Forgot Password?
        </span>
      </div>

      {/* LOGIN BUTTON */}
      <Button
        type="submit"
        style={{
          backgroundColor: "#020e36ff",
          color: "white",
          padding: "12px 192px",
          borderRadius: "30px",
          width: "100%",
        }}
        disabled={pending || isSubmitting}
      >
        {pending ? "Logging in..." : "Login"}
      </Button>

      {/* BOTTOM LINK */}
      <p className="text-center text-2 text-gray-900">
        Don’t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold hover:underline"
          style={{ color: "#020e36ff" }}
        >
          Create one
        </Link>
      </p>
    </form>
  );
}

