/**
 * ULID Generator for @substratia/memory-local
 *
 * Generates Universally Unique Lexicographically Sortable Identifiers.
 * ULIDs are 26 characters, URL-safe, and sortable by generation time.
 *
 * Format: TTTTTTTTTTRRRRRRRRRRRRRRR
 * - T = Timestamp (10 chars, millisecond precision, base32)
 * - R = Random (16 chars, base32)
 *
 * @module
 */

// Crockford's Base32 alphabet (excludes I, L, O, U to avoid confusion)
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const ENCODING_LEN = ENCODING.length; // 32
const TIME_LEN = 10;
const RANDOM_LEN = 16;

/**
 * Generate a ULID with an optional prefix
 *
 * @param prefix - Optional prefix (e.g., "mem", "snap", "prov")
 * @returns ULID string, optionally prefixed with underscore separator
 *
 * @example
 * ```typescript
 * ulid()        // "01ARZ3NDEKTSV4RRFFQ69G5FAV"
 * ulid("mem")   // "mem_01ARZ3NDEKTSV4RRFFQ69G5FAV"
 * ulid("snap")  // "snap_01ARZ3NDEKTSV4RRFFQ69G5FAV"
 * ```
 */
export function ulid(prefix?: string): string {
  const now = Date.now();
  let str = "";

  // Encode timestamp (10 chars)
  let ts = now;
  for (let i = TIME_LEN - 1; i >= 0; i--) {
    str = ENCODING[ts % ENCODING_LEN] + str;
    ts = Math.floor(ts / ENCODING_LEN);
  }

  // Add randomness (16 chars)
  for (let i = 0; i < RANDOM_LEN; i++) {
    str += ENCODING[Math.floor(Math.random() * ENCODING_LEN)];
  }

  return prefix ? `${prefix}_${str}` : str;
}

/**
 * Extract timestamp from a ULID
 *
 * @param id - ULID string (with or without prefix)
 * @returns Unix timestamp in milliseconds
 *
 * @example
 * ```typescript
 * const id = ulid("mem");
 * const ts = extractTimestamp(id);
 * console.log(new Date(ts)); // Approximately when the ULID was generated
 * ```
 */
export function extractTimestamp(id: string): number {
  // Handle prefixed ULIDs
  const ulid = id.includes("_") ? id.split("_")[1] : id;

  if (!ulid || ulid.length < TIME_LEN) {
    throw new Error(`Invalid ULID: ${id}`);
  }

  let timestamp = 0;
  const timePart = ulid.slice(0, TIME_LEN).toUpperCase();

  for (let i = 0; i < TIME_LEN; i++) {
    const charIndex = ENCODING.indexOf(timePart[i]);
    if (charIndex === -1) {
      throw new Error(`Invalid ULID character: ${timePart[i]}`);
    }
    timestamp = timestamp * ENCODING_LEN + charIndex;
  }

  return timestamp;
}
