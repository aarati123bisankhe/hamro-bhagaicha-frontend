"use client";

import { useMemo, useSyncExternalStore } from "react";

export type CareType = "watering" | "fertilizing" | "mist" | "pruning";

export type CareScheduleItem = {
  id: string;
  plantName: string;
  careType: CareType;
  frequencyDays: number;
  nextDueDate: string;
  notes?: string;
};

const CARE_STORAGE_KEY = "hb_care_schedule";
const CARE_EVENT = "hb_care_schedule_change";
const EMPTY_CARE_ITEMS: CareScheduleItem[] = [];

let cachedRawCare = "";
let cachedCareItems: CareScheduleItem[] = EMPTY_CARE_ITEMS;

function readCareItems(): CareScheduleItem[] {
  if (typeof window === "undefined") return EMPTY_CARE_ITEMS;

  try {
    const raw = localStorage.getItem(CARE_STORAGE_KEY) ?? "";
    if (raw === cachedRawCare) return cachedCareItems;
    if (!raw) {
      cachedRawCare = "";
      cachedCareItems = EMPTY_CARE_ITEMS;
      return cachedCareItems;
    }

    const parsed = JSON.parse(raw) as CareScheduleItem[];
    cachedRawCare = raw;
    cachedCareItems = Array.isArray(parsed) ? parsed : EMPTY_CARE_ITEMS;
    return cachedCareItems;
  } catch {
    cachedRawCare = "";
    cachedCareItems = EMPTY_CARE_ITEMS;
    return cachedCareItems;
  }
}

function writeCareItems(items: CareScheduleItem[]) {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(items);
  cachedRawCare = serialized;
  cachedCareItems = items;
  localStorage.setItem(CARE_STORAGE_KEY, serialized);
  window.dispatchEvent(new Event(CARE_EVENT));
}

function addDays(dateString: string, days: number) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function useCareSchedule() {
  const items = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      const onStorage = (event: StorageEvent) => {
        if (event.key === CARE_STORAGE_KEY) onStoreChange();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener(CARE_EVENT, onStoreChange);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(CARE_EVENT, onStoreChange);
      };
    },
    readCareItems,
    () => EMPTY_CARE_ITEMS
  );

  const addTask = (task: Omit<CareScheduleItem, "id">) => {
    const current = readCareItems();
    const next: CareScheduleItem[] = [
      {
        id: `care-${Date.now()}`,
        ...task,
      },
      ...current,
    ];
    writeCareItems(next);
  };

  const removeTask = (id: string) => {
    const next = readCareItems().filter((item) => item.id !== id);
    writeCareItems(next);
  };

  const completeTask = (id: string) => {
    const next = readCareItems().map((item) =>
      item.id === id
        ? { ...item, nextDueDate: addDays(item.nextDueDate, item.frequencyDays) }
        : item
    );
    writeCareItems(next);
  };

  const clearTasks = () => {
    writeCareItems([]);
  };

  const pendingCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return items.filter((item) => item.nextDueDate <= today).length;
  }, [items]);

  return {
    items,
    pendingCount,
    addTask,
    removeTask,
    completeTask,
    clearTasks,
  };
}
