// Server statis kecil buat preview lokal: bun scripts/serve.mjs
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

const server = Bun.serve({
  port: Number(process.env.PORT) || 4173,
  development: false,
  async fetch(req) {
    let path = decodeURIComponent(new URL(req.url).pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = normalize(join(root, "." + path));
    if (!file.startsWith(root)) return new Response("403", { status: 403 });

    const body = Bun.file(file);
    if (!(await body.exists())) return new Response("404", { status: 404 });
    return new Response(body, {
      headers: { "content-type": MIME[extname(file).toLowerCase()] ?? "application/octet-stream" },
    });
  },
});

console.log(`serving ${root} -> http://localhost:${server.port}`);
