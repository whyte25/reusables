import { Registry } from "@/registry/schema";

export const examples: Registry = [
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
];
