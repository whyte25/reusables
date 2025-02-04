if (process.env.NODE_ENV !== "development") {
  process.exit(0)
}

const runningWithBun = process.versions.bun !== undefined
const isUsingBunScript = process.env._ && process.env._.includes("bun")

if (!runningWithBun || !isUsingBunScript) {
  const message = `
  ╭──────────────────────────────────────────────────────────╮
  │                                                          │
  │  \x1b[31mPlease use Bun in this project:\x1b[0m                         │
  │                                                          │
  │  \x1b[36m$ bun dev\x1b[0m      - to start development server            │
  │  \x1b[36m$ bun install\x1b[0m  - to install dependencies                │   
  │  \x1b[36m$ bun remove\x1b[0m   - to remove dependencies                 │
  │                                                          │
  │  Need to install Bun? Run:                               │
  │  \x1b[36mnpm install -g bun\x1b[0m                                      │
  │                                                          │
  │  For more details, go to \x1b[34mhttps://bun.sh/docs\x1b[0m             │
  │                                                          │
  ╰──────────────────────────────────────────────────────────╯`

  console.error(message)
  process.exit(1)
}
