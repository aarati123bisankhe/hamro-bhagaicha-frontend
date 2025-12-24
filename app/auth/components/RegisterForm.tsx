"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";
import { RegisterData, registerSchema } from "../schema";
import Button from "./Button";

export default function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const submit = async (values: RegisterData) => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 1000));
      console.log(values);
      router.push("/auth/login");
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
      <h1
        className="text-4xl font-bold text-center mb-16"
        style={{ fontFamily: "var(--font-abhaya)", color: "#072010ff" }}
      >
        Hamro Bhagaicha 🌿
      </h1>

      <h2 className="text-lg font-semibold text-[#063c19ff]">Sign Up</h2>

      <div>
        <input
          placeholder="Full Name"
          {...register("name")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          style={inputStyle}
        />
        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <input
          placeholder="Email"
          {...register("email")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          style={inputStyle}
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

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

      <div>
        <input
          placeholder="Address"
          {...register("address")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          style={inputStyle}
        />
        {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
      </div>

      <div>
        <input
          placeholder="Number"
          {...register("number")}
          className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300"
          style={inputStyle}
        />
        {errors.number && <p className="text-xs text-red-600">{errors.number.message}</p>}
      </div>

      

      <Button
        type="submit"
        style={{
          backgroundColor: "#020e36ff",
          color: "white",
          padding: "12px 192px",
          borderRadius: "30px",
        }}
        disabled={pending || isSubmitting}
      >
        {pending ? "Creating account..." : "Sign Up"}
      </Button>

      <p className="text-center text-2 text-gray-900">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold hover:underline"
          style={{ color: "#020e36ff" }}
        >
          Login
        </Link>
      </p>
    </form>
  );
}
