const { spawnSync } = require("node:child_process");

const isWindows = process.platform === "win32";

if (isWindows) {
  console.error("\n[local deploy blocked] Windows local deploy is disabled for this project.");
  console.error("Reason: next-on-pages is not reliable on this environment (bash/npx subprocess issues).");
  console.error("\nUse CI deployment instead:");
  console.error("1. Push changes to main to trigger .github/workflows/deploy-pages.yml");
  console.error("2. Or run the workflow manually via GitHub Actions (workflow_dispatch)");
  console.error("\nAdvanced option: use WSL/Linux and run npm run deploy:ci\n");
  process.exit(1);
}

const result = spawnSync("npm", ["run", "deploy:ci"], {
  stdio: "inherit",
  shell: true,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
