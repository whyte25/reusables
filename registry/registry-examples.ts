import { type Registry } from "shadcn/registry"

export const examples: Registry["items"] = [
  {
    name: "floating-elements-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/floating-elements"],
    files: [
      {
        path: "registry/example/floating-elements-demo.tsx",
        type: "registry:example",
        target: "components/floating-elements-demo.tsx",
      },
    ],
  },
  {
    name: "toast-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/notify"],
    files: [
      {
        path: "registry/example/toast-demo.tsx",
        type: "registry:example",
        target: "components/toast-demo.tsx",
      },
    ],
  },
  {
    name: "time-ago-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/time-ago"],
    files: [
      {
        path: "registry/example/time-ago-demo.tsx",
        type: "registry:example",
        target: "components/time-ago-demo.tsx",
      },
    ],
  },
  {
    name: "online-status-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/submit-button"],
    files: [
      {
        path: "registry/example/online-status-demo.tsx",
        type: "registry:example",
        target: "components/online-status-demo.tsx",
      },
    ],
  },
  {
    name: "theme-image-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/theme-image"],
    files: [
      {
        path: "registry/example/theme-image-demo.tsx",
        type: "registry:example",
        target: "components/theme-image-demo.tsx",
      },
    ],
  },
  {
    name: "copy-button-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/copy-button"],
    files: [
      {
        path: "registry/example/copy-button-demo.tsx",
        type: "registry:example",
        target: "components/copy-button-demo.tsx",
      },
    ],
  },
  {
    name: "submit-button-position-left",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/submit-button"],
    files: [
      {
        path: "registry/example/submit-button-position-left.tsx",
        type: "registry:example",
        target: "components/submit-button-position-left.tsx",
      },
    ],
  },
  {
    name: "submit-button-hidetext-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/submit-button"],
    files: [
      {
        path: "registry/example/submit-button-hidetext-demo.tsx",
        type: "registry:example",
        target: "components/submit-button-hidetext-demo.tsx",
      },
    ],
  },
  {
    name: "submit-button-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/submit-button"],
    files: [
      {
        path: "registry/example/submit-button-demo.tsx",
        type: "registry:example",
        target: "components/submit-button-demo.tsx",
      },
    ],
  },
  {
    name: "screen-size-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/use-screen-size"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/example/screen-size-demo.tsx",
        type: "registry:example",
        target: "components/screen-size-demo.tsx",
      },
    ],
  },
  {
    name: "inview-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/use-inview"],
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/example/inview-demo.tsx",
        type: "registry:example",
        target: "components/inview-demo.tsx",
      },
    ],
  },
  {
    name: "file-upload-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/use-file-upload",
      "progress",
      "button",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/example/file-upload-demo.tsx",
        type: "registry:example",
        target: "components/file-upload-demo.tsx",
      },
    ],
  },
  {
    name: "toast-with-description-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/notify"],
    files: [
      {
        path: "registry/example/toast-with-description-demo.tsx",
        type: "registry:example",
        target: "components/toast-with-description-demo.tsx",
      },
    ],
  },
  {
    name: "toast-positions-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/notify"],
    files: [
      {
        path: "registry/example/toast-positions-demo.tsx",
        type: "registry:example",
        target: "components/toast-positions-demo.tsx",
      },
    ],
  },
  {
    name: "toast-promise-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/notify"],
    files: [
      {
        path: "registry/example/toast-promise-demo.tsx",
        type: "registry:example",
        target: "components/toast-promise-demo.tsx",
      },
    ],
  },
  {
    name: "toast-prevent-duplicates-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/notify"],
    files: [
      {
        path: "registry/example/toast-prevent-duplicates-demo.tsx",
        type: "registry:example",
        target: "components/toast-prevent-duplicates-demo.tsx",
      },
    ],
  },
  {
    name: "toast-custom-config-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/notify"],
    files: [
      {
        path: "registry/example/toast-custom-config-demo.tsx",
        type: "registry:example",
        target: "components/toast-custom-config-demo.tsx",
      },
    ],
  },
  {
    name: "toast-progress-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/notify"],
    files: [
      {
        path: "registry/example/toast-progress-demo.tsx",
        type: "registry:example",
        target: "components/toast-progress-demo.tsx",
      },
    ],
  },
  {
    name: "toast-close-button-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/notify"],
    files: [
      {
        path: "registry/example/toast-close-button-demo.tsx",
        type: "registry:example",
        target: "components/toast-close-button-demo.tsx",
      },
    ],
  },
  {
    name: "split-button-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/split-button"],
    files: [
      {
        path: "registry/example/split-button-demo.tsx",
        type: "registry:example",
        target: "components/split-button-demo.tsx",
      },
    ],
  },
  {
    name: "split-button-action-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/split-button-action",
    ],
    files: [
      {
        path: "registry/example/split-button-action-demo.tsx",
        type: "registry:example",
        target: "components/split-button-action-demo.tsx",
      },
    ],
  },
  {
    name: "split-button-preview-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/split-button"],
    files: [
      {
        path: "registry/example/split-button-preview-demo.tsx",
        type: "registry:example",
        target: "components/split-button-preview-demo.tsx",
      },
    ],
  },
  {
    name: "direct-image-upload-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/single-image-upload",
    ],
    files: [
      {
        path: "registry/example/direct-image-upload-demo.tsx",
        type: "registry:example",
        target: "components/direct-image-upload-demo.tsx",
      },
    ],
  },
  {
    name: "manual-image-upload-demo",
    type: "registry:example",
    registryDependencies: [
      "shttps://reusables.vercel.app/r/single-image-upload",
    ],
    files: [
      {
        path: "registry/example/manual-image-upload-demo.tsx",
        type: "registry:example",
        target: "components/manual-image-upload-demo.tsx",
      },
    ],
  },
  {
    name: "direct-multiple-image-upload-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/multiple-image-upload",
    ],
    files: [
      {
        path: "registry/example/direct-multiple-image-upload-demo.tsx",
        type: "registry:example",
        target: "components/direct-multiple-image-upload-demo.tsx",
      },
    ],
  },
  {
    name: "manual-multiple-image-upload-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/multiple-image-upload",
    ],
    files: [
      {
        path: "registry/example/manual-multiple-image-upload-demo.tsx",
        type: "registry:example",
        target: "components/manual-multiple-image-upload-demo.tsx",
      },
    ],
  },
  {
    name: "multiple-image-upload-form-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/multiple-image-upload",
      "button",
      "input",
      "form",
      "card",
    ],
    dependencies: ["react-hook-form", "@hookform/resolvers/zod", "zod"],
    files: [
      {
        path: "registry/example/multiple-image-upload-form-demo.tsx",
        type: "registry:example",
        target: "components/multiple-image-upload-form-demo.tsx",
      },
    ],
  },
  {
    name: "single-image-upload-form-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/single-image-upload",
      "button",
      "input",
      "textarea",
      "form",
      "card",
    ],
    dependencies: ["react-hook-form", "@hookform/resolvers/zod", "zod"],
    files: [
      {
        path: "registry/example/single-image-upload-form-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "compact-viewer-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/compact-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: [
      {
        path: "registry/example/compact-viewer-demo.tsx",
        type: "registry:example",
        target: "components/compact-viewer-demo.tsx",
      },
    ],
  },
  {
    name: "fullscreen-viewer-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/fullscreen-viewer",
      "button",
    ],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: [
      {
        path: "registry/example/fullscreen-viewer-demo.tsx",
        type: "registry:example",
        target: "components/fullscreen-viewer-demo.tsx",
      },
    ],
  },
  {
    name: "hover-navigation-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/hover-navigation-viewer",
    ],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: [
      {
        path: "registry/example/hover-navigation-demo.tsx",
        type: "registry:example",
        target: "components/hover-navigation-demo.tsx",
      },
    ],
  },
  {
    name: "minimal-viewer-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/minimal-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: [
      {
        path: "registry/example/minimal-viewer-demo.tsx",
        type: "registry:example",
        target: "components/minimal-viewer-demo.tsx",
      },
    ],
  },
  {
    name: "sidebar-viewer-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/sidebar-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: [
      {
        path: "registry/example/sidebar-viewer-demo.tsx",
        type: "registry:example",
        target: "components/sidebar-viewer-demo.tsx",
      },
    ],
  },
  {
    name: "thumbnail-viewer-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/thumbnail-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: [
      {
        path: "registry/example/thumbnail-viewer-demo.tsx",
        type: "registry:example",
        target: "components/thumbnail-viewer-demo.tsx",
      },
    ],
  },
  {
    name: "direct-multi-file-upload-demo",
    type: "registry:example",
    registryDependencies: ["https://reusables.vercel.app/r/multi-file-upload"],
    files: [
      {
        path: "registry/example/direct-multi-file-upload-demo.tsx",
        type: "registry:example",
        target: "components/direct-multi-file-upload-demo.tsx",
      },
    ],
  },
  {
    name: "manual-multi-file-upload-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/multi-file-upload",
      "button",
    ],
    files: [
      {
        path: "registry/example/manual-multi-file-upload-demo.tsx",
        type: "registry:example",
        target: "components/manual-multi-file-upload-demo.tsx",
      },
    ],
  },
  {
    name: "multi-file-upload-form-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/multi-file-upload",
      "button",
      "input",
      "form",
      "card",
    ],
    dependencies: ["react-hook-form", "@hookform/resolvers/zod", "zod"],
    files: [
      {
        path: "registry/example/multi-file-upload-form-demo.tsx",
        type: "registry:example",
        target: "components/multi-file-upload-form-demo.tsx",
      },
    ],
  },
  {
    name: "universal-file-upload-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/universal-file-upload",
      "button",
    ],
    files: [
      {
        path: "registry/example/universal-file-upload-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "universal-file-upload-direct-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/universal-file-upload",
    ],
    files: [
      {
        path: "registry/example/universal-file-upload-direct-demo.tsx",
        type: "registry:example",
        target: "components/universal-file-upload-direct-demo.tsx",
      },
    ],
  },
  {
    name: "universal-file-upload-form-demo",
    type: "registry:example",
    registryDependencies: [
      "https://reusables.vercel.app/r/universal-file-upload",
      "button",
      "input",
      "form",
      "card",
    ],
    dependencies: ["react-hook-form", "@hookform/resolvers/zod", "zod"],
    files: [
      {
        path: "registry/example/universal-file-upload-form-demo.tsx",
        type: "registry:example",
        target: "components/universal-file-upload-form-demo.tsx",
      },
    ],
  },
]
