const { spawnSync } = require("node:child_process");

function run(command, args, env) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("node", ["scripts/patch-next-on-pages.js"], process.env);

const env = {
  ...process.env,
  PATH: `${process.env.PATH};C:\\Program Files\\Git\\bin`,
  npm_config_legacy_peer_deps: "true",
  NPM_CONFIG_LEGACY_PEER_DEPS: "true",
};

// Run Vercel build explicitly, then only run next-on-pages conversion logic.
run("npm.cmd", ["exec", "vercel", "--", "build"], env);
run("npm.cmd", ["exec", "next-on-pages", "--", "--skip-build"], env);
