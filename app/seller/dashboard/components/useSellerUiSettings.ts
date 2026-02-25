"use client";

import { useSyncExternalStore } from "react";

export type SellerThemeMode = "light" | "dark";

export type SellerUiSettings = {
  theme: SellerThemeMode;
  emailNotifications: boolean;
  orderAlerts: boolean;
  lowStockAlerts: boolean;
  weeklySalesReport: boolean;
  autoAcceptOrders: boolean;
};

const SETTINGS_KEY = "hb_seller_ui_settings";
const SETTINGS_EVENT = "hb_seller_ui_settings_change";

const DEFAULT_SETTINGS: SellerUiSettings = {
  theme: "light",
  emailNotifications: true,
  orderAlerts: true,
  lowStockAlerts: true,
  weeklySalesReport: true,
  autoAcceptOrders: false,
};

let cachedRaw = "";
let cachedSettings: SellerUiSettings = DEFAULT_SETTINGS;

function applyTheme(theme: SellerThemeMode) {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hb_theme", theme);
}

function normalize(input: Partial<SellerUiSettings>): SellerUiSettings {
  return {
    theme: input.theme === "dark" ? "dark" : "light",
    emailNotifications:
      typeof input.emailNotifications === "boolean"
        ? input.emailNotifications
        : DEFAULT_SETTINGS.emailNotifications,
    orderAlerts:
      typeof input.orderAlerts === "boolean"
        ? input.orderAlerts
        : DEFAULT_SETTINGS.orderAlerts,
    lowStockAlerts:
      typeof input.lowStockAlerts === "boolean"
        ? input.lowStockAlerts
        : DEFAULT_SETTINGS.lowStockAlerts,
    weeklySalesReport:
      typeof input.weeklySalesReport === "boolean"
        ? input.weeklySalesReport
        : DEFAULT_SETTINGS.weeklySalesReport,
    autoAcceptOrders:
      typeof input.autoAcceptOrders === "boolean"
        ? input.autoAcceptOrders
        : DEFAULT_SETTINGS.autoAcceptOrders,
  };
}

function readSettings(): SellerUiSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const raw = localStorage.getItem(SETTINGS_KEY) ?? "";

    if (!raw) {
      const legacyTheme = localStorage.getItem("hb_theme");
      const fallback = normalize({
        ...DEFAULT_SETTINGS,
        theme: legacyTheme === "dark" ? "dark" : DEFAULT_SETTINGS.theme,
      });
      cachedRaw = JSON.stringify(fallback);
      cachedSettings = fallback;
      localStorage.setItem(SETTINGS_KEY, cachedRaw);
      applyTheme(fallback.theme);
      return fallback;
    }

    if (raw === cachedRaw) {
      applyTheme(cachedSettings.theme);
      return cachedSettings;
    }

    const next = normalize(JSON.parse(raw) as Partial<SellerUiSettings>);
    cachedRaw = JSON.stringify(next);
    cachedSettings = next;
    applyTheme(next.theme);
    return next;
  } catch {
    const serialized = JSON.stringify(DEFAULT_SETTINGS);
    cachedRaw = serialized;
    cachedSettings = DEFAULT_SETTINGS;
    localStorage.setItem(SETTINGS_KEY, serialized);
    applyTheme(DEFAULT_SETTINGS.theme);
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(next: SellerUiSettings) {
  if (typeof window === "undefined") return;

  const normalized = normalize(next);
  const serialized = JSON.stringify(normalized);
  cachedRaw = serialized;
  cachedSettings = normalized;
  localStorage.setItem(SETTINGS_KEY, serialized);
  applyTheme(normalized.theme);
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function useSellerUiSettings() {
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

  const updateSetting = <K extends keyof SellerUiSettings>(
    key: K,
    value: SellerUiSettings[K]
  ) => {
    const current = readSettings();
    writeSettings({ ...current, [key]: value });
  };

  const resetSettings = () => {
    writeSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    isDarkMode: settings.theme === "dark",
    updateSetting,
    resetSettings,
  };
}
