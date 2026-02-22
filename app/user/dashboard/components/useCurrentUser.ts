"use client";

import { useEffect, useState } from "react";

type CurrentUser = {
  fullname?: string;
  fullName?: string;
  name?: string;
  email?: string;
  profileUrl?: string;
  role?: string;
};

function readUserDataFromCookie(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  const cookiePart = document.cookie
    .split("; ")
    .find((part) => part.startsWith("user_data="));

  if (!cookiePart) return null;

  const rawValue = cookiePart.slice("user_data=".length);
  try {
    return JSON.parse(decodeURIComponent(rawValue)) as CurrentUser;
  } catch {
    return null;
  }
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(() =>
    readUserDataFromCookie()
  );

  useEffect(() => {
    const refreshUser = () => {
      setUser(readUserDataFromCookie());
    };

    window.addEventListener("focus", refreshUser);
    window.addEventListener("user-data-updated", refreshUser);
    return () => {
      window.removeEventListener("focus", refreshUser);
      window.removeEventListener("user-data-updated", refreshUser);
    };
  }, []);

  return user;
}
