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
    ],
  },
];
