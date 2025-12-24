// "use client";

// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Button from "./Button";

// export default function LoginPage() {
//   const router = useRouter();

//   const handleLogin = () => {
//     router.push("/auth/dashboard");
//   };

//   return (
//    <motion.div
//         initial={{ x: 0 }}
//         animate={{ x: 0 }}
//         exit={{ x: "-100%" }}
//         transition={{ duration: 0.6 }}
//         className="flex justify-center items-center min-h-screen bg-green-50 p-6"
//         style={{
//           background: "linear-gradient(135deg, #e3f8e6ff, #686868ff)",
//         }}
//       >
//       <div
//         className="flex flex-col md:flex-row w-full max-w-6xl h-[80vh] shadow-xl rounded-2xl overflow-hidden"
//         style={{
//           background: "linear-gradient(135deg, #D8F3DC, #475E4F)",
//         }}
//       >
//         {/* LEFT IMAGE */}
//          <div className="md:w-1/2 w-full h-1/2 md:h-full">
//           <img
//             src="/images/image1.png"
//             alt="Green plants in a garden"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* RIGHT FORM */}
//         <div className="md:w-1/2 w-full flex flex-col justify-center p-12 h-full">
//           <h1
//             className="text-4xl font-bold text-center mb-10"
//             style={{ fontFamily: "var(--font-abhaya)", color: "#072010ff" }}
//           >
//             Hamro Bhagaicha 🌿
//           </h1>

//           <h2 className="text-lg font-semibold mb-5 text-[#063c19ff]">
//             Login
//           </h2>

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
//             style={{
//               backgroundColor: "#b4c0aeff",
//               color: "#1c1c1c",
//               outline: "none",
//               boxShadow: "none",
//             }}
//           />

//           <input
//             type="password"
//             placeholder="password"
//             className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
//             style={{
//               backgroundColor: "#b4c0aeff",
//               color: "#1c1c1c",
//               outline: "none",
//               boxShadow: "none",
//             }}
//           />

//           <div className="w-full text-right mb-6">
//             <a
//               href="#"
//               className="text-sm hover:underline"
//               style={{ color: "#021c71ff" }}
//             >
//               Forgot Password?
//             </a>
//           </div>

//           <Button
//             onClick={handleLogin}
//             style={{
//               backgroundColor: "#020e36ff",
//               color: "white",
//               padding: "12px 39px",
//               borderRadius: "30px",
//             }}
//           >
//             Login
//           </Button>

//           {/* <p className="mt-6 text-center text-gray-700">
//             Don’t have an account?{" "}
//             <a
//               href="/auth/register"
//               className="font-semibold hover:underline"
//               style={{ color: "#020e36ff" }}
//             >
//               Create one.
//             </a>
//           </p> */}
//           <p className="mt-6 text-center text-gray-700">
//             Don’t have an account?{" "}
//            <span
//             onClick={() => router.push("/auth/register")}
//             className="font-semibold hover:underline cursor-pointer"
//             style={{ color: "#020e36ff" }}
//             >
//             Create one.
//           </span>
//          </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


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
      router.push("/auth/dashboard");
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

