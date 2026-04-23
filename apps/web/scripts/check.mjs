import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);

const required = [
  ["index.html", "substratia"],
  ["index.html", "Pocket Universe: Terraformer"],
  ["index.html", "dev@substratia.io"],
  ["privacy/index.html", "Privacy Policy"],
  ["terms/index.html", "Terms of Service"],
  ["styles.css", "--bg: #0b0d14"],
  ["sitemap.xml", "https://substratia.io/privacy/"],
];

const forbidden = [
  "Arrow Server",
  "memory infrastructure",
  "@clerk",
  "Convex",
  "Stripe",
  "dashboard",
];

let failed = false;

for (const [file, text] of required) {
  const content = await readFile(new URL(file, root), "utf8");
  if (!content.includes(text)) {
    console.error(`${file} is missing required text: ${text}`);
    failed = true;
  }
}

for (const file of ["index.html", "privacy/index.html", "terms/index.html"]) {
  const content = await readFile(new URL(file, root), "utf8");
  for (const text of forbidden) {
    if (content.includes(text)) {
      console.error(`${file} contains old-site text: ${text}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log("Static site content checks passed");
}
