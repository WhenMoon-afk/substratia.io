import { useSyncExternalStore } from "react";

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/**
 * Reads a value from localStorage on the client side without triggering
 * setState-in-effect lint warnings. Returns null during SSR.
 *
 * Reactively updates on cross-tab storage events.
 */
export function useLocalStorageValue(key: string): string | null {
  return useSyncExternalStore(
    subscribeToStorage,
    () => localStorage.getItem(key),
    () => null,
  );
}

/**
 * Reads and parses a JSON value from localStorage.
 * Returns the parsed object on the client, null during SSR or on parse failure.
 *
 * Reactively updates on cross-tab storage events.
 */
export function useLocalStorageJSON<T>(key: string): T | null {
  return useSyncExternalStore(
    subscribeToStorage,
    () => {
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      try {
        return JSON.parse(stored) as T;
      } catch {
        return null;
      }
    },
    () => null,
  );
}
