"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "../components/Button";

export default function Splash() {
  const router = useRouter();


  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center min-h-screen bg-green-50 p-6"
      style={{
        background: "linear-gradient(135deg, #e3f8e6ff, #686868ff)",
      }}
    >
      <div
        className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-6xl h-[80vh]"
        style={{
          background: "linear-gradient(135deg, #D8F3DC, #475E4F)",
        }}
      >
      
        <div className="md:w-1/2 w-full h-1/2 md:h-full">
          <img
            src="/images/image1.png"
            alt="Green plants in a garden"
            className="w-full h-full object-cover"
          />
        </div>

      
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start p-12 h-full">
          <h2
            className="text-2xl font-medium mb-5"
            style={{ color: "#063c19ff" }}
          >
            Welcome to
          </h2>
          <h1
            className="text-5xl font-bold mb-5 flex items-center"
            style={{ color: "#072010ff" }}
          >
            Hamro Bhagaicha <span className="ml-3">🌿</span>
          </h1>
          <p
            className="text-lg text-gray-700 mb-8"
            style={{ color: "#0d063cff" }}
          >
            A digital space where plant lovers grow, share, and learn together.
          </p>

          <div className="mt-9">
            <Button
               onClick={() => router.push("/auth/login")}
              style={{
                backgroundColor: "#031039ff",
                color: "white",
                padding: "12px 45px",
          borderRadius: "35px",
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
