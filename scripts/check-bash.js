const { spawnSync } = require("node:child_process");

const isWindows = process.platform === "win32";

if (!isWindows) {
  process.exit(0);
}

const result = spawnSync("bash", ["--version"], {
  stdio: "ignore",
  shell: false,
});

if (!result.error && result.status === 0) {
  process.exit(0);
}

console.error("\n[pages:build precheck] Missing required 'bash' executable on Windows.");
console.error("next-on-pages needs bash to run the Vercel build pipeline.");
console.error("\nFix options:");
console.error("1. Run this command from WSL (recommended)");
console.error("2. Install Git Bash and ensure 'bash' is available in PATH");
console.error("3. Use GitHub Actions (ubuntu) for deployment");
console.error("\nStopping before next-on-pages to avoid the spawn bash ENOENT crash.\n");
process.exit(1);
