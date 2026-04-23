import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function resolvePath(url) {
  const parsed = new URL(url, `http://localhost:${port}`);
  const clean = normalize(decodeURIComponent(parsed.pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(siteRoot, clean);

  if (clean.endsWith("/") || clean === "") {
    file = join(file, "index.html");
  }

  if (existsSync(file)) return file;
  if (existsSync(join(file, "index.html"))) return join(file, "index.html");
  return join(siteRoot, "index.html");
}

createServer(async (req, res) => {
  try {
    const file = resolvePath(req.url || "/");
    const info = await stat(file);

    if (!info.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    createReadStream(file).pipe(res);
  } catch (error) {
    res.writeHead(500);
    res.end(String(error));
  }
}).listen(port, () => {
  console.log(`Serving Substratia static site at http://localhost:${port}`);
});
