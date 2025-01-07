import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "animated-beam",
    type: "registry:ui",
    dependencies: ["motion"],
    files: ["magicui/animated-beam.tsx"],
  },
  {
    name: "animated-gradient-text",
    type: "registry:ui",
    files: ["magicui/animated-gradient-text.tsx"],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              gradient: "gradient 8s linear infinite",
            },
            keyframes: {
              gradient: {
                to: {
                  backgroundPosition: "var(--bg-size) 0",
                },
              },
            },
          },
        },
      },
    },
  },
];
