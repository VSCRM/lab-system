// GitHub Pages has no server-side rewrite rules, so a direct navigation or
// page refresh on a nested route (e.g. /lab-system/lab/cocomo-vartist)
// returns a real 404 instead of the app shell. GH Pages *does* let you
// customize the 404 response, so we ship an identical copy of index.html
// as 404.html — the app boots normally and React Router resolves the path
// on the client from `location.pathname`.
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(import.meta.dirname, "..", "dist");
const indexPath = resolve(distDir, "index.html");
const notFoundPath = resolve(distDir, "404.html");

if (!existsSync(indexPath)) {
	console.error(`[copy-404] dist/index.html not found — run "vite build" first.`);
	process.exit(1);
}

copyFileSync(indexPath, notFoundPath);
console.log("[copy-404] dist/404.html created from dist/index.html");
