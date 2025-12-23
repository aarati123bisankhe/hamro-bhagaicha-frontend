// // app/auth/components/Button.jsx
// "use client";

// import Link from "next/link";

// export default function Button({ href, children , style}) {
//   return (
//     <Link
//       href={href}
//       className="px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition"
//       aria-label={`Go to ${children}`}
//       style={style} 
//     >
//       {children}
//     </Link>
//   );
// }


"use client";

import Link from "next/link";

export default function Button({ href, onClick, children, style, className }) {
  // If href is provided, render a Next.js Link
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

  // Otherwise, render a button for onClick
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
