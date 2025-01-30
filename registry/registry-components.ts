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
];
