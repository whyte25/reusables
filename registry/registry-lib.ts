import { Registry } from "@/registry/schema"

export const lib: Registry = [
  {
    name: "time-ago",
    type: "registry:lib",
    files: [
      {
        path: "lib/time-ago.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "utils",
    type: "registry:lib",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "cookies-client",
    type: "registry:lib",
    dependencies: ["js-cookie"],
    devDependencies: ["@types/js-cookie"],
    files: [
      {
        path: "lib/cookies.client.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "cookies-server",
    type: "registry:lib",
    files: [
      {
        path: "lib/cookies.server.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "permission",
    type: "registry:lib",
    files: [
      {
        path: "lib/permission.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "platform-detector",
    type: "registry:lib",
    files: [
      {
        path: "lib/platform-detector.ts",
        type: "registry:lib",
      },
    ],
  },
]
