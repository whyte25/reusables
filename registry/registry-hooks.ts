import { Registry } from "@/registry/schema"

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
  {
    name: "use-inview",
    type: "registry:hook",
    dependencies: ["react-intersection-observer"],
    files: [
      {
        path: "hooks/use-inview.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-file-upload",
    type: "registry:hook",
    dependencies: ["axios"],
    files: [
      {
        path: "hooks/use-file-upload.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-multiple-file-upload",
    type: "registry:hook",
    dependencies: ["axios"],
    files: [
      {
        path: "hooks/use-multiple-file-upload.tsx",
        type: "registry:hook",
      },
    ],
  },
]
