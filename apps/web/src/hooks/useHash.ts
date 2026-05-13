import { useSyncExternalStore } from "react";

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

/**
 * Reads the current URL hash (without the # prefix) on the client side.
 * Reactively updates when the hash changes (e.g., clicking anchor links,
 * programmatic hash changes).
 * Returns empty string during SSR or when no hash is present.
 */
export function useHash(): string {
  return useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash.slice(1),
    () => "",
  );
}
