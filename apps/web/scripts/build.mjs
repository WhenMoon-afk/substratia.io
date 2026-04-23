import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(root, "..");
const dist = join(siteRoot, "dist");

const copyEntries = [
  "index.html",
  "styles.css",
  "robots.txt",
  "sitemap.xml",
  "privacy",
  "terms",
  "public",
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of copyEntries) {
  const source = join(siteRoot, entry);
  if (!existsSync(source)) continue;

  const destination =
    entry === "public" ? dist : join(dist, entry);

  await cp(source, destination, { recursive: true });
}

console.log("Built static site to apps/web/dist");
