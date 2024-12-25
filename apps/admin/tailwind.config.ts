import sharedConfig from "@reusables/ui/tailwind.base";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: [
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig],
};

export default config;
