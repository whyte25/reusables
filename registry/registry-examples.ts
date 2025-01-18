import { Registry } from "@/registry/schema";

export const examples: Registry = [
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
    files: ["example/submit-button-demo.tsx"],
  },
  {
    name: "animated-beam-demo",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    dependencies: ["@radix-ui/react-icons"],
    files: ["example/animated-beam-demo.tsx"],
  },
  {
    name: "animated-beam-bidirectional",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    files: ["example/animated-beam-bidirectional.tsx"],
  },
  {
    name: "animated-beam-multiple-outputs",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    files: ["example/animated-beam-multiple-outputs.tsx"],
  },
  {
    name: "animated-beam-multiple-inputs",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    files: ["example/animated-beam-multiple-inputs.tsx"],
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
];
