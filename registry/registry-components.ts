import { Registry } from "@/registry/schema"

export const components: Registry = [
  {
    name: "floating-elements",
    type: "registry:component",
    registryDependencies: ["utils"],
    files: [
      {
        path: "reusables/floating-elements.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "single-image-upload",
    type: "registry:component",
    dependencies: [
      "lucide-react",
      "react-dropzone",
      "class-variance-authority",
      "axios",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "reusables/single-image-upload.tsx",
        type: "registry:component",
      },
      {
        path: "hooks/use-file-upload.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "multiple-image-upload",
    type: "registry:component",
    dependencies: [
      "lucide-react",
      "react-dropzone",
      "class-variance-authority",
      "axios",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "reusables/multiple-image-upload.tsx",
        type: "registry:component",
      },
      {
        path: "hooks/use-multiple-file-upload.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "multi-file-upload",
    type: "registry:component",
    dependencies: [
      "lucide-react",
      "react-dropzone",
      "class-variance-authority",
      "axios",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "reusables/multi-file-upload.tsx",
        type: "registry:component",
      },
      {
        path: "hooks/use-multiple-file-upload.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "universal-file-upload",
    type: "registry:component",
    dependencies: [
      "lucide-react",
      "react-dropzone",
      "class-variance-authority",
      "axios",
    ],
    registryDependencies: ["utils"],
    files: [
      {
        path: "reusables/universal-file-upload.tsx",
        type: "registry:component",
      },
      {
        path: "hooks/use-multiple-file-upload.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "compact-viewer",
    type: "registry:component",
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "reusables/pdf-viewers/compact-viewer.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/compact-viewer.tsx",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner.tsx",
      },
    ],
  },
  {
    name: "fullscreen-viewer",
    type: "registry:component",
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "reusables/pdf-viewers/fullscreen-viewer.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/fullscreen-viewer.tsx",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner.tsx",
      },
    ],
  },
  {
    name: "hover-navigation-viewer",
    type: "registry:component",
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "reusables/pdf-viewers/hover-navigation-viewer.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/hover-navigation-viewer.tsx",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner.tsx",
      },
    ],
  },
  {
    name: "minimal-viewer",
    type: "registry:component",
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "reusables/pdf-viewers/minimal-viewer.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/minimal-viewer.tsx",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner.tsx",
      },
    ],
  },
  {
    name: "sidebar-viewer",
    type: "registry:component",
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks", "lucide-react"],
    registryDependencies: ["button", "scroll-area"],
    files: [
      {
        path: "reusables/pdf-viewers/sidebar-viewer.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/sidebar-viewer.tsx",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner.tsx",
      },
    ],
  },
  {
    name: "thumbnail-viewer",
    type: "registry:component",
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "reusables/pdf-viewers/thumbnail-viewer.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/thumbnail-viewer.tsx",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner.tsx",
      },
    ],
  },
]
