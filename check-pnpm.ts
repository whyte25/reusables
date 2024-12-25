const packageManager = process.env.npm_config_user_agent || "";

if (!packageManager.includes("pnpm")) {
  const message = `
  ╭──────────────────────────────────────────────────────────╮
  │                                                          │
  │  \x1b[31mUse "pnpm install" for installation in this project.\x1b[0m    │
  │                                                          │
  │  If you don't have pnpm, install it via \x1b[36m"npm i -g pnpm"\x1b[0m. │
  │  For more details, go to \x1b[34mhttps://pnpm.js.org/\x1b[0m            │
  │                                                          │
  ╰──────────────────────────────────────────────────────────╯
  `;

  console.error(message);
  process.exit(1);
}
