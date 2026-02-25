"use client";

import { useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";
export type LanguageMode = "english" | "nepali";

export type UserSettings = {
  theme: ThemeMode;
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  weeklyTips: boolean;
  language: LanguageMode;
};

const SETTINGS_STORAGE_KEY = "hb_user_settings";
const SETTINGS_EVENT = "hb_user_settings_change";

const DEFAULT_SETTINGS: UserSettings = {
  theme: "light",
  emailNotifications: true,
  smsNotifications: false,
  orderUpdates: true,
  weeklyTips: true,
  language: "english",
};

let cachedRawSettings = "";
let cachedSettings: UserSettings = DEFAULT_SETTINGS;

function applyTheme(theme: ThemeMode) {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hb_theme", theme);
}

function normalizeSettings(input: Partial<UserSettings>): UserSettings {
  return {
    theme: input.theme === "dark" ? "dark" : "light",
    emailNotifications:
      typeof input.emailNotifications === "boolean"
        ? input.emailNotifications
        : DEFAULT_SETTINGS.emailNotifications,
    smsNotifications:
      typeof input.smsNotifications === "boolean"
        ? input.smsNotifications
        : DEFAULT_SETTINGS.smsNotifications,
    orderUpdates:
      typeof input.orderUpdates === "boolean"
        ? input.orderUpdates
        : DEFAULT_SETTINGS.orderUpdates,
    weeklyTips:
      typeof input.weeklyTips === "boolean"
        ? input.weeklyTips
        : DEFAULT_SETTINGS.weeklyTips,
    language: input.language === "nepali" ? "nepali" : "english",
  };
}

function readSettings(): UserSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY) ?? "";
    if (raw === cachedRawSettings) {
      applyTheme(cachedSettings.theme);
      return cachedSettings;
    }

    if (!raw) {
      const legacyTheme = localStorage.getItem("hb_theme");
      const fallback = {
        ...DEFAULT_SETTINGS,
        theme: legacyTheme === "dark" ? "dark" : DEFAULT_SETTINGS.theme,
      } as UserSettings;
      cachedRawSettings = JSON.stringify(fallback);
      cachedSettings = fallback;
      localStorage.setItem(SETTINGS_STORAGE_KEY, cachedRawSettings);
      applyTheme(fallback.theme);
      return fallback;
    }

    const parsed = JSON.parse(raw) as Partial<UserSettings>;
    const next = normalizeSettings(parsed);
    cachedRawSettings = JSON.stringify(next);
    cachedSettings = next;
    applyTheme(next.theme);
    return next;
  } catch {
    cachedRawSettings = JSON.stringify(DEFAULT_SETTINGS);
    cachedSettings = DEFAULT_SETTINGS;
    applyTheme(DEFAULT_SETTINGS.theme);
    localStorage.setItem(SETTINGS_STORAGE_KEY, cachedRawSettings);
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(next: UserSettings) {
  if (typeof window === "undefined") return;

  const normalized = normalizeSettings(next);
  const serialized = JSON.stringify(normalized);
  cachedRawSettings = serialized;
  cachedSettings = normalized;
  localStorage.setItem(SETTINGS_STORAGE_KEY, serialized);
  applyTheme(normalized.theme);
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function useUserSettings() {
  const settings = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      const onStorage = (event: StorageEvent) => {
        if (event.key === SETTINGS_STORAGE_KEY || event.key === "hb_theme") {
          onStoreChange();
        }
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

  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    const current = readSettings();
    writeSettings({ ...current, [key]: value });
  };

  const resetSettings = () => {
    writeSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
  };
}
