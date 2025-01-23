import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "toast-utils",
    type: "registry:ui",
    files: ["reusables/toast/toast.tsx"],
  },
  {
    name: "toast",
    type: "registry:ui",
    dependencies: ["lucide-react", "class-variance-authority"],
    registryDependencies: ["utils", "toast-utils", "toast-provider"],
    files: ["reusables/toast/toast.tsx"],
  },
  {
    name: "toast-provider",
    type: "registry:ui",
    dependencies: ["framer-motion", "class-variance-authority"],
    registryDependencies: ["toast", "toast-utils"],
    files: ["reusables/toast/toast-provider.tsx"],
  },
  {
    name: "theme-image",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: ["reusables/theme-image.tsx"],
  },
  {
    name: "spinner",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: ["reusables/spinner.tsx"],
  },
  {
    name: "submit-button",
    type: "registry:ui",
    registryDependencies: ["button", "utils", "spinner"],
    files: ["reusables/submit-button.tsx"],
  },
  {
    name: "copy-button",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: ["reusables/copy-button.tsx"],
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
];
