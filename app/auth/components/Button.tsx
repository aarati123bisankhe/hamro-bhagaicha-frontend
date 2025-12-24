// "use client";

// import Link from "next/link";

// type ButtonProps = {
//   href?: string;
//   onClick?: () => void;
//   children: React.ReactNode;
//   style?: React.CSSProperties;
//   className?: string;
//   disabled?: boolean; // ✅ ADD THIS
// };

// export default function Button({
//   href,
//   onClick,
//   children,
//   style,
//   className = "",
//   disabled = false,
// }: ButtonProps) {
//   // Link button
//   if (href) {
//     return (
//       <Link href={href} className={disabled ? "pointer-events-none" : ""}>
//         <span
//           className={`px-6 py-3 font-semibold rounded transition
//             ${disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}
//             ${className}`}
//           style={style}
//         >
//           {children}
//         </span>
//       </Link>
//     );
//   }

//   // Normal button
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`px-6 py-3 font-semibold rounded transition
//         ${disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}
//         ${className}`}
//       style={style}
//     >
//       {children}
//     </button>
//   );
// }


"use client";

import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({ href, onClick, children, style, className, type = "button", disabled }: ButtonProps) {
  if (href) {
    return (
      <Link href={href}>
        <a
          className={`px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition ${className}`}
          style={style}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={style}
    >
      {children}
    </button>
  );
}
