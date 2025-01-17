import { Registry } from "@/registry/schema";

export const hooks: Registry = [
  {
    name: "use-online-status",
    type: "registry:hook",
    dependencies: ["lodash"],
    files: [
      {
        path: "hooks/use-online-status.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-screen-size",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-screen-size.tsx",
        type: "registry:hook",
      },
    ],
  },
];
