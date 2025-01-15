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
];
