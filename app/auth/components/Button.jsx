"use client";

import Link from "next/link";

export default function Button({ href, onClick, children, style, className }) {
 
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
      onClick={onClick}
      className={`px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
