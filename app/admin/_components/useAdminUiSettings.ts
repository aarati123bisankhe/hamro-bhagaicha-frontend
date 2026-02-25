"use client";

import { useSyncExternalStore } from "react";

type AdminUiSettings = {
  theme: "light" | "dark";
};

const SETTINGS_KEY = "hb_admin_ui_settings";
const SETTINGS_EVENT = "hb_admin_ui_settings_change";
const DEFAULT_SETTINGS: AdminUiSettings = { theme: "light" };

let cachedRaw = "";
let cachedSettings: AdminUiSettings = DEFAULT_SETTINGS;

function applyTheme(theme: "light" | "dark") {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hb_theme", theme);
}

function readSettings(): AdminUiSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const raw = localStorage.getItem(SETTINGS_KEY) ?? "";
    if (!raw) {
      const legacyTheme = localStorage.getItem("hb_theme");
      const fallback: AdminUiSettings = {
        theme: legacyTheme === "dark" ? "dark" : "light",
      };
      const serialized = JSON.stringify(fallback);
      localStorage.setItem(SETTINGS_KEY, serialized);
      cachedRaw = serialized;
      cachedSettings = fallback;
      applyTheme(fallback.theme);
      return fallback;
    }

    if (raw === cachedRaw) {
      applyTheme(cachedSettings.theme);
      return cachedSettings;
    }

    const parsed = JSON.parse(raw) as Partial<AdminUiSettings>;
    const next: AdminUiSettings = {
      theme: parsed.theme === "dark" ? "dark" : "light",
    };
    cachedRaw = JSON.stringify(next);
    cachedSettings = next;
    applyTheme(next.theme);
    return next;
  } catch {
    const serialized = JSON.stringify(DEFAULT_SETTINGS);
    localStorage.setItem(SETTINGS_KEY, serialized);
    cachedRaw = serialized;
    cachedSettings = DEFAULT_SETTINGS;
    applyTheme(DEFAULT_SETTINGS.theme);
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(next: AdminUiSettings) {
  if (typeof window === "undefined") return;
  const serialized = JSON.stringify(next);
  cachedRaw = serialized;
  cachedSettings = next;
  localStorage.setItem(SETTINGS_KEY, serialized);
  applyTheme(next.theme);
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function useAdminUiSettings() {
  const settings = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      const onStorage = (event: StorageEvent) => {
        if (event.key === SETTINGS_KEY || event.key === "hb_theme") onStoreChange();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener(SETTINGS_EVENT, onStoreChange);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(SETTINGS_EVENT, onStoreChange);
      };
    },
    readSettings,
    () => DEFAULT_SETTINGS
  );

  const toggleTheme = () => {
    const current = readSettings();
    writeSettings({ theme: current.theme === "dark" ? "light" : "dark" });
  };

  return {
    settings,
    isDarkMode: settings.theme === "dark",
    toggleTheme,
  };
}
