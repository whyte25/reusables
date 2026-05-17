import { type Registry } from "shadcn/registry"

export const ui: Registry["items"] = [
  {
    name: "notify",
    type: "registry:ui",
    dependencies: [
      "lucide-react",
      "framer-motion",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "packages/notify/src/notify.tsx",
        type: "registry:ui",
        target: "components/ui/notify/notify.tsx",
      },
      {
        path: "packages/notify/src/notify-provider.tsx",
        type: "registry:ui",
        target: "components/ui/notify/notify-provider.tsx",
      },
      {
        path: "packages/notify/src/notify-utils.ts",
        type: "registry:ui",
        target: "components/ui/notify/notify-utils.ts",
      },
      {
        path: "packages/notify/src/index.ts",
        type: "registry:ui",
        target: "components/ui/notify/index.ts",
      },
      {
        path: "packages/notify/src/notify-state-manager.ts",
        type: "registry:ui",
        target: "components/ui/notify/notify-state-manager.ts",
      },
      {
        path: "packages/notify/src/notify-variants.ts",
        type: "registry:ui",
        target: "components/ui/notify/notify-variants.ts",
      },
      {
        path: "packages/notify/src/notify-config.ts",
        type: "registry:ui",
        target: "components/ui/notify/notify-config.ts",
      },
      {
        path: "packages/notify/src/notify-animations.ts",
        type: "registry:ui",
        target: "components/ui/notify/notify-animations.ts",
      },
      {
        path: "packages/notify/src/notify-types.ts",
        type: "registry:ui",
        target: "components/ui/notify/notify-types.ts",
      },
      {
        path: "packages/notify/src/cn.ts",
        type: "registry:ui",
        target: "components/ui/notify/cn.ts",
      },
    ],
  },
  {
    name: "theme-image",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "reusables/ui/theme-image.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "spinner",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "reusables/ui/spinner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "submit-button",
    type: "registry:ui",
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "reusables/ui/submit-button.tsx",
        type: "registry:ui",
      },
      {
        path: "reusables/ui/spinner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "copy-button",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "reusables/ui/copy-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "split-button",
    type: "registry:ui",
    registryDependencies: ["button", "dropdown-menu", "utils"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "reusables/ui/split-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "split-button-action",
    type: "registry:ui",
    registryDependencies: ["button", "dropdown-menu", "utils"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "reusables/ui/split-button-action.tsx",
        type: "registry:ui",
      },
    ],
  },

  // {
  //   name: "animated-gradient-text",
  //   type: "registry:ui",
  //   files: ["reusables/animated-gradient-text.tsx"],
  //   tailwind: {
  //     config: {
  //       theme: {
  //         extend: {
  //           animation: {
  //             gradient: "gradient 8s linear infinite",
  //           },
  //           keyframes: {
  //             gradient: {
  //               to: {
  //                 backgroundPosition: "var(--bg-size) 0",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
]
