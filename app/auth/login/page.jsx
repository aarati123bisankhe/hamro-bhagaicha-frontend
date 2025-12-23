// "use client";

// import { useRouter } from "next/navigation";
// import Button from "../components/Button";

// export default function LoginPage() {
//   const router = useRouter();

//   const handleLogin = () => {
//     // You can add authentication logic here before navigating
//     router.push("/auth/dashboard");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen p-6 bg-green-50"
//     style={{
//           background: "linear-gradient(135deg, #D8F3DC, #475E4F)",
//         }}
//     >
//       <div className="flex flex-col md:flex-row w-full max-w-6xl h-[80vh] shadow-xl rounded-2xl overflow-hidden"
      
//       >
//         {/* Left Side: Image */}
//         <div className="md:w-1/2 w-full h-1/2 md:h-full">
//           <img
//             src="/images/image1.png"
//             alt="Plants background"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="md:w-1/2 w-full flex flex-col justify-center p-12 bg-gradient-to-b from-green-100 to-green-300"
//         >
//           <h1
//             className="text-4xl font-bold text-center mb-10"
//             style={{ fontFamily: "var(--font-abhaya)" }}
//           >
//             Hamro Bhagaicha 🌿
//           </h1>

//           <h2 className="text-lg font-semibold mb-5">Login</h2>

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />

//           <div className="w-full text-right mb-6">
//             <a href="#" className="text-sm text-blue-900 hover:underline">
//               Forgot Password?
//             </a>
//           </div>

//           <Button
//             onClick={handleLogin}
//             className="w-full bg-blue-900 text-white py-3 font-semibold rounded hover:bg-blue-800 transition"
//           >
//             Login
//           </Button>

//           <p className="mt-6 text-center text-gray-700">
//             Don’t have an account?{" "}
//             <a
//               href="/auth/register"
//               className="font-semibold text-blue-900 hover:underline"
//             >
//               Create one.
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Button";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/dashboard"); // Navigation after login
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #e3f8e6ff, #686868ff)", // same as Splash background
      }}
    >
      <div
        className="flex flex-col md:flex-row w-full max-w-6xl h-[80vh] shadow-xl rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #D8F3DC, #475E4F)", // same as Splash card
        }}
      >
        {/* Left Side: Image */}
        <div className="md:w-1/2 w-full h-1/2 md:h-full">
          <img
            src="/images/image1.png"
            alt="Plants background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-12 h-full">
          <h1
            className="text-4xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-abhaya)", color: "#072010ff" }}
          >
            Hamro Bhagaicha 🌿
          </h1>

          <h2 className="text-lg font-semibold mb-5 text-[#063c19ff]">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="w-full text-right mb-6">
            <a href="#" className="text-sm text-blue-900 hover:underline">
              Forgot Password?
            </a>
          </div>

          <Button
            onClick={handleLogin}
            style={{
              backgroundColor: "#020e36ff",
              color: "white",
              padding: "12px 39px",
              borderRadius: "30px",
            }}
          >
            Login
          </Button>

          <p className="mt-6 text-center text-gray-700">
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-blue-900 hover:underline"
            >
              Create one.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

