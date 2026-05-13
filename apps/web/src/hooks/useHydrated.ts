import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns true once the component has hydrated on the client.
 *
 * Uses useSyncExternalStore to avoid the setState-in-effect lint warning
 * while safely handling the server/client boundary.
 *
 * Server render & hydration pass → false
 * After hydration → true
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
