import { Registry } from "@/registry/schema";

export const components: Registry = [
  {
    name: "single-image-upload",
    type: "registry:component",
    dependencies: [
      "lucide-react",
      "react-dropzone",
      "class-variance-authority",
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
    name: "compact-viewer",
    type: "registry:component",
    dependencies: ["react-pdf", "@wojtekmaj/react-hooks", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "reusables/pdf-viewers/compact-viewer.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/compact-viewer",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner",
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
        target: "components/pdf-viewers/fullscreen-viewer",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner",
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
        target: "components/pdf-viewers/hover-navigation-viewer",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner",
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
        target: "components/pdf-viewers/minimal-viewer",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner",
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
        target: "components/pdf-viewers/sidebar-viewer",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner",
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
        target: "components/pdf-viewers/thumbnail-viewer",
      },
      {
        path: "reusables/pdf-viewers/loading-spinner.tsx",
        type: "registry:component",
        target: "components/pdf-viewers/loading-spinner",
      },
    ],
  },
];
