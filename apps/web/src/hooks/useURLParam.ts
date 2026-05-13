import { useSyncExternalStore } from "react";

function subscribeToURL(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

/**
 * Reads a URL search parameter on the client side without triggering
 * setState-in-effect lint warnings. Returns null during SSR.
 *
 * Reactively updates on popstate events (back/forward navigation).
 */
export function useURLParam(key: string): string | null {
  return useSyncExternalStore(
    subscribeToURL,
    () => new URLSearchParams(window.location.search).get(key),
    () => null,
  );
}

/**
 * Reads and decodes a base64-encoded JSON URL parameter.
 * Returns the decoded object on the client, null during SSR or on decode failure.
 *
 * Reactively updates on popstate events (back/forward navigation).
 */
export function useURLParamJSON<T>(key: string): T | null {
  return useSyncExternalStore(
    subscribeToURL,
    () => {
      const param = new URLSearchParams(window.location.search).get(key);
      if (!param) return null;
      try {
        return JSON.parse(atob(param)) as T;
      } catch {
        return null;
      }
    },
    () => null,
  );
}
