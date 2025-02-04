import { Registry } from "@/registry/schema"

export const ui: Registry = [
  {
    name: "notify",
    type: "registry:ui",
    dependencies: ["lucide-react", "framer-motion", "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "reusables/ui/notify.tsx",
        type: "registry:ui",
      },
      {
        path: "reusables/ui/notify-provider.tsx",
        type: "registry:ui",
      },
      {
        path: "reusables/ui/notify-utils.ts",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "theme-image",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: ["reusables/ui/theme-image.tsx"],
  },
  {
    name: "spinner",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: ["reusables/ui/spinner.tsx"],
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
    files: ["reusables/ui/copy-button.tsx"],
  },
  {
    name: "split-button",
    type: "registry:ui",
    registryDependencies: ["button", "dropdown-menu", "utils"],
    dependencies: ["lucide-react"],
    files: ["reusables/ui/split-button.tsx"],
  },
  {
    name: "split-button-action",
    type: "registry:ui",
    registryDependencies: ["button", "dropdown-menu", "utils"],
    dependencies: ["lucide-react"],
    files: ["reusables/ui/split-button-action.tsx"],
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
