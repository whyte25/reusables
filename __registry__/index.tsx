// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
  "default": {
    "toast": {
      name: "toast",
      type: "registry:ui",
      registryDependencies: ["utils"],
      files: ["registry/default/reusables/toast/toast.tsx"],
      component: React.lazy(() => import("@/registry/default/reusables/toast/toast.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "toast-provider": {
      name: "toast-provider",
      type: "registry:ui",
      registryDependencies: ["toast"],
      files: ["registry/default/reusables/toast/toast-provider.tsx"],
      component: React.lazy(() => import("@/registry/default/reusables/toast/toast-provider.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "theme-image": {
      name: "theme-image",
      type: "registry:ui",
      registryDependencies: ["utils"],
      files: ["registry/default/reusables/theme-image.tsx"],
      component: React.lazy(() => import("@/registry/default/reusables/theme-image.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "spinner": {
      name: "spinner",
      type: "registry:ui",
      registryDependencies: ["utils"],
      files: ["registry/default/reusables/spinner.tsx"],
      component: React.lazy(() => import("@/registry/default/reusables/spinner.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "submit-button": {
      name: "submit-button",
      type: "registry:ui",
      registryDependencies: ["button","utils","spinner"],
      files: ["registry/default/reusables/submit-button.tsx"],
      component: React.lazy(() => import("@/registry/default/reusables/submit-button.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "copy-button": {
      name: "copy-button",
      type: "registry:ui",
      registryDependencies: ["button","utils"],
      files: ["registry/default/reusables/copy-button.tsx"],
      component: React.lazy(() => import("@/registry/default/reusables/copy-button.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "toast-demo": {
      name: "toast-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/toast-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "time-ago-demo": {
      name: "time-ago-demo",
      type: "registry:example",
      registryDependencies: ["time-ago"],
      files: ["registry/default/example/time-ago-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/time-ago-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "online-status-demo": {
      name: "online-status-demo",
      type: "registry:example",
      registryDependencies: ["submit-button"],
      files: ["registry/default/example/online-status-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/online-status-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "theme-image-demo": {
      name: "theme-image-demo",
      type: "registry:example",
      registryDependencies: ["theme-image"],
      files: ["registry/default/example/theme-image-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/theme-image-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "copy-button-demo": {
      name: "copy-button-demo",
      type: "registry:example",
      registryDependencies: ["copy-button"],
      files: ["registry/default/example/copy-button-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/copy-button-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "submit-button-position-left": {
      name: "submit-button-position-left",
      type: "registry:example",
      registryDependencies: ["submit-button"],
      files: ["registry/default/example/submit-button-position-left.tsx"],
      component: React.lazy(() => import("@/registry/default/example/submit-button-position-left.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "submit-button-hidetext-demo": {
      name: "submit-button-hidetext-demo",
      type: "registry:example",
      registryDependencies: ["submit-button"],
      files: ["registry/default/example/submit-button-hidetext-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/submit-button-hidetext-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "submit-button-demo": {
      name: "submit-button-demo",
      type: "registry:example",
      registryDependencies: ["submit-button"],
      files: ["registry/default/example/submit-button-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/submit-button-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "screen-size-demo": {
      name: "screen-size-demo",
      type: "registry:example",
      registryDependencies: ["use-screen-size"],
      files: ["registry/default/example/screen-size-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/screen-size-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "inview-demo": {
      name: "inview-demo",
      type: "registry:example",
      registryDependencies: ["use-inview"],
      files: ["registry/default/example/inview-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/inview-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "file-upload-demo": {
      name: "file-upload-demo",
      type: "registry:example",
      registryDependencies: ["use-file-upload","progress","button"],
      files: ["registry/default/example/file-upload-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/file-upload-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "toast-with-description-demo": {
      name: "toast-with-description-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-with-description-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/toast-with-description-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "toast-positions-demo": {
      name: "toast-positions-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-positions-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/toast-positions-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "toast-promise-demo": {
      name: "toast-promise-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-promise-demo.tsx"],
      component: React.lazy(() => import("@/registry/default/example/toast-promise-demo.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "time-ago": {
      name: "time-ago",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/time-ago.ts"],
      component: React.lazy(() => import("@/registry/default/lib/time-ago.ts")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "utils": {
      name: "utils",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/utils.ts"],
      component: React.lazy(() => import("@/registry/default/lib/utils.ts")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "cookies-client": {
      name: "cookies-client",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/cookies.client.ts"],
      component: React.lazy(() => import("@/registry/default/lib/cookies.client.ts")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "cookies-server": {
      name: "cookies-server",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/cookies.server.ts"],
      component: React.lazy(() => import("@/registry/default/lib/cookies.server.ts")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "permission": {
      name: "permission",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/permission.ts"],
      component: React.lazy(() => import("@/registry/default/lib/permission.ts")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "platform-detector": {
      name: "platform-detector",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/platform-detector.ts"],
      component: React.lazy(() => import("@/registry/default/lib/platform-detector.ts")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "use-online-status": {
      name: "use-online-status",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-online-status.tsx"],
      component: React.lazy(() => import("@/registry/default/hooks/use-online-status.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "use-screen-size": {
      name: "use-screen-size",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-screen-size.tsx"],
      component: React.lazy(() => import("@/registry/default/hooks/use-screen-size.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "use-inview": {
      name: "use-inview",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-inview.tsx"],
      component: React.lazy(() => import("@/registry/default/hooks/use-inview.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "use-file-upload": {
      name: "use-file-upload",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-file-upload.tsx"],
      component: React.lazy(() => import("@/registry/default/hooks/use-file-upload.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
  },
}
