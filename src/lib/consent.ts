"use client";

import { useSyncExternalStore } from "react";
import { COOKIE_CONSENT_KEY } from "./site";

export type ConsentValue = "accepted" | "declined";
let sessionConsent: ConsentValue | null = null;

export const readConsent = (): ConsentValue | null => {
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : sessionConsent;
  } catch {
    return sessionConsent;
  }
};

const subscribe = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_KEY || event.key === null) {
      sessionConsent = null;
      onChange();
    }
  };
  window.addEventListener("kovalab:consent", onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("kovalab:consent", onChange);
    window.removeEventListener("storage", onStorage);
  };
};

// Undefined during server rendering avoids flashing the banner before storage is read.
export const useConsent = (): ConsentValue | null | undefined =>
  useSyncExternalStore(subscribe, readConsent, () => undefined);

export const saveConsent = (value: ConsentValue) => {
  sessionConsent = value;
  try { window.localStorage.setItem(COOKIE_CONSENT_KEY, value); } catch { /* Session choice still works. */ }
  window.dispatchEvent(new Event("kovalab:consent"));
};
