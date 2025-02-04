import { Registry } from "@/registry/schema"

export const examples: Registry = [
  {
    name: "toast-demo",
    type: "registry:example",
    registryDependencies: ["toast"],
    files: ["example/toast-demo.tsx"],
  },
  {
    name: "time-ago-demo",
    type: "registry:example",
    registryDependencies: ["time-ago"],
    files: ["example/time-ago-demo.tsx"],
  },
  {
    name: "online-status-demo",
    type: "registry:example",
    registryDependencies: ["submit-button"],
    files: ["example/online-status-demo.tsx"],
  },
  {
    name: "theme-image-demo",
    type: "registry:example",
    registryDependencies: ["theme-image"],
    files: ["example/theme-image-demo.tsx"],
  },
  {
    name: "copy-button-demo",
    type: "registry:example",
    registryDependencies: ["copy-button"],
    files: ["example/copy-button-demo.tsx"],
  },
  {
    name: "submit-button-position-left",
    type: "registry:example",
    registryDependencies: ["submit-button"],
    files: ["example/submit-button-position-left.tsx"],
  },
  {
    name: "submit-button-hidetext-demo",
    type: "registry:example",
    registryDependencies: ["submit-button"],
    files: ["example/submit-button-hidetext-demo.tsx"],
  },
  {
    name: "submit-button-demo",
    type: "registry:example",
    registryDependencies: ["submit-button"],
    files: [
      {
        path: "example/submit-button-demo.tsx",
        type: "registry:example",
      },
      {
        path: "reusables/ui/submit-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "screen-size-demo",
    type: "registry:example",
    registryDependencies: ["use-screen-size"],
    dependencies: ["lucide-react"],
    files: ["example/screen-size-demo.tsx"],
  },
  {
    name: "inview-demo",
    type: "registry:example",
    registryDependencies: ["use-inview"],
    dependencies: ["framer-motion"],
    files: ["example/inview-demo.tsx"],
  },
  {
    name: "file-upload-demo",
    type: "registry:example",
    registryDependencies: ["use-file-upload", "progress", "button"],
    dependencies: ["lucide-react"],
    files: ["example/file-upload-demo.tsx"],
  },
  {
    name: "toast-with-description-demo",
    type: "registry:example",
    registryDependencies: ["toast"],
    files: ["example/toast-with-description-demo.tsx"],
  },
  {
    name: "toast-positions-demo",
    type: "registry:example",
    registryDependencies: ["toast"],
    files: ["example/toast-positions-demo.tsx"],
  },
  {
    name: "toast-promise-demo",
    type: "registry:example",
    registryDependencies: ["toast"],
    files: ["example/toast-promise-demo.tsx"],
  },
  {
    name: "toast-prevent-duplicates-demo",
    type: "registry:example",
    registryDependencies: ["toast"],
    files: ["example/toast-prevent-duplicates-demo.tsx"],
  },
  {
    name: "toast-custom-config-demo",
    type: "registry:example",
    registryDependencies: ["toast"],
    files: ["example/toast-custom-config-demo.tsx"],
  },
  {
    name: "toast-progress-demo",
    type: "registry:example",
    registryDependencies: ["toast"],
    files: ["example/toast-progress-demo.tsx"],
  },
  {
    name: "toast-close-button-demo",
    type: "registry:example",
    registryDependencies: ["toast"],
    files: ["example/toast-close-button-demo.tsx"],
  },
  {
    name: "split-button-demo",
    type: "registry:example",
    registryDependencies: ["split-button"],
    files: ["example/split-button-demo.tsx"],
  },
  {
    name: "split-button-action-demo",
    type: "registry:example",
    registryDependencies: ["split-button-action"],
    files: ["example/split-button-action-demo.tsx"],
  },
  {
    name: "split-button-preview-demo",
    type: "registry:example",
    registryDependencies: ["split-button"],
    files: ["example/split-button-previewe-demo.tsx"],
  },
  {
    name: "auto-image-upload-demo",
    type: "registry:example",
    registryDependencies: ["single-image-upload"],
    files: ["example/auto-image-upload-demo.tsx"],
  },
  {
    name: "manual-image-upload-demo",
    type: "registry:example",
    registryDependencies: ["single-image-upload"],
    files: ["example/manual-image-upload-demo.tsx"],
  },
  {
    name: "auto-multiple-image-upload-demo",
    type: "registry:example",
    registryDependencies: ["multiple-image-upload"],
    files: ["example/auto-multiple-image-upload-demo.tsx"],
  },
  {
    name: "manual-multiple-image-upload-demo",
    type: "registry:example",
    registryDependencies: ["multiple-image-upload"],
    files: ["example/manual-multiple-image-upload-demo.tsx"],
  },
  {
    name: "multiple-image-upload-form-demo",
    type: "registry:example",
    registryDependencies: [
      "multiple-image-upload",
      "button",
      "input",
      "form",
      "card",
    ],
    dependencies: ["react-hook-form", "@hookform/resolvers/zod", "zod"],
    files: ["example/multiple-image-upload-form-demo.tsx"],
  },
  {
    name: "single-image-upload-form-demo",
    type: "registry:example",
    registryDependencies: [
      "single-image-upload",
      "button",
      "input",
      "textarea",
      "form",
      "card",
    ],
    dependencies: ["react-hook-form", "@hookform/resolvers/zod", "zod"],
    files: ["/example/single-image-upload-form-demo.tsx"],
  },
  {
    name: "compact-viewer-demo",
    type: "registry:example",
    registryDependencies: ["compact-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: ["example/compact-viewer-demo.tsx"],
  },
  {
    name: "fullscreen-viewer-demo",
    type: "registry:example",
    registryDependencies: ["fullscreen-viewer", "button"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: ["example/fullscreen-viewer-demo.tsx"],
  },
  {
    name: "hover-navigation-demo",
    type: "registry:example",
    registryDependencies: ["hover-navigation-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: ["example/hover-navigation-demo.tsx"],
  },
  {
    name: "minimal-viewer-demo",
    type: "registry:example",
    registryDependencies: ["minimal-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: ["example/minimal-viewer-demo.tsx"],
  },
  {
    name: "sidebar-viewer-demo",
    type: "registry:example",
    registryDependencies: ["sidebar-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: ["example/sidebar-viewer-demo.tsx"],
  },
  {
    name: "thumbnail-viewer-demo",
    type: "registry:example",
    registryDependencies: ["thumbnail-viewer"],
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks"],
    files: ["example/thumbnail-viewer-demo.tsx"],
  },
]
