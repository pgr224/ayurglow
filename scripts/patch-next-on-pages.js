const fs = require("node:fs");
const path = require("node:path");

const target = path.join(
  process.cwd(),
  "node_modules",
  "@cloudflare",
  "next-on-pages",
  "dist",
  "index.js"
);

if (!fs.existsSync(target)) {
  process.exit(0);
}

const source = fs.readFileSync(target, "utf8");

if (source.includes('process.platform === "win32" ? { cmd: "npm.cmd", pmCmd: "exec" }')) {
  process.exit(0);
}

const patterns = [
  'return s4 === "short" ? { cmd: "npx" } : { cmd: "npm", pmCmd: "exec" };',
  'return s4 === "short" ? process.platform === "win32" ? { cmd: "npm", pmCmd: "exec" } : { cmd: "npx" } : { cmd: "npm", pmCmd: "exec" };',
];

const replacement = 'return s4 === "short" ? process.platform === "win32" ? { cmd: "npm.cmd", pmCmd: "exec" } : { cmd: "npx" } : { cmd: "npm", pmCmd: "exec" };';

let patched = source;
for (const needle of patterns) {
  if (patched.includes(needle)) {
    patched = patched.replace(needle, replacement);
  }
}

if (patched === source) {
  console.warn("[patch-next-on-pages] Target snippet not found; package internals may have changed.");
  process.exit(0);
}

fs.writeFileSync(target, patched, "utf8");
console.log("[patch-next-on-pages] Applied Windows npm exec patch.");
