import { createHmac, randomBytes } from "node:crypto";

const LAUNCH_TOKEN_PREFIX = "arrow-launch";
const LAUNCH_TOKEN_VERSION = "v1";
const DEFAULT_TTL_SECONDS = 120;

type MintArrowLaunchTokenOptions = {
  secret?: string;
  now?: Date;
  nonce?: string;
  ttlSeconds?: number;
};

export function mintArrowLaunchToken(
  options: MintArrowLaunchTokenOptions = {},
) {
  const secret = (options.secret ?? process.env.ARROW_LAUNCH_SECRET ?? "").trim();
  if (!secret) return null;

  const ttlSeconds = options.ttlSeconds ?? DEFAULT_TTL_SECONDS;
  if (!Number.isFinite(ttlSeconds) || ttlSeconds <= 0) {
    throw new Error("Arrow launch token TTL must be positive");
  }

  const nonce = options.nonce ?? randomBytes(16).toString("base64url");
  if (!nonce || nonce.includes(":")) {
    throw new Error("Arrow launch token nonce must be non-empty and colon-free");
  }

  const now = options.now ?? new Date();
  const expiresUnix = Math.floor(now.getTime() / 1000) + ttlSeconds;
  const payload = `${LAUNCH_TOKEN_PREFIX}:${LAUNCH_TOKEN_VERSION}:${expiresUnix}:${nonce}`;
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return `${payload}:${signature}`;
}

export function buildArrowGameUrl(baseUrl: string, launchToken: string | null) {
  const cleanBaseUrl = baseUrl.replace(/#.*$/, "");
  if (!launchToken) return cleanBaseUrl;
  return `${cleanBaseUrl}#launch=${encodeURIComponent(launchToken)}`;
}
