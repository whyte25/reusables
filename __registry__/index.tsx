// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
  default: {
    notify: {
      name: "notify",
      type: "registry:ui",
      registryDependencies: ["utils"],
      files: [
        "registry/default/reusables/ui/notify.tsx",
        "registry/default/reusables/ui/notify-provider.tsx",
        "registry/default/reusables/ui/notify-utils.ts",
      ],
      component: React.lazy(
        () => import("@/registry/default/reusables/ui/notify.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "theme-image": {
      name: "theme-image",
      type: "registry:ui",
      registryDependencies: ["utils"],
      files: ["registry/default/reusables/ui/theme-image.tsx"],
      component: React.lazy(
        () => import("@/registry/default/reusables/ui/theme-image.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    spinner: {
      name: "spinner",
      type: "registry:ui",
      registryDependencies: ["utils"],
      files: ["registry/default/reusables/ui/spinner.tsx"],
      component: React.lazy(
        () => import("@/registry/default/reusables/ui/spinner.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "submit-button": {
      name: "submit-button",
      type: "registry:ui",
      registryDependencies: ["button", "utils"],
      files: [
        "registry/default/reusables/ui/submit-button.tsx",
        "registry/default/reusables/ui/spinner.tsx",
      ],
      component: React.lazy(
        () => import("@/registry/default/reusables/ui/submit-button.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "copy-button": {
      name: "copy-button",
      type: "registry:ui",
      registryDependencies: ["button", "utils"],
      files: ["registry/default/reusables/ui/copy-button.tsx"],
      component: React.lazy(
        () => import("@/registry/default/reusables/ui/copy-button.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "split-button": {
      name: "split-button",
      type: "registry:ui",
      registryDependencies: ["button", "dropdown-menu", "utils"],
      files: ["registry/default/reusables/ui/split-button.tsx"],
      component: React.lazy(
        () => import("@/registry/default/reusables/ui/split-button.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "split-button-action": {
      name: "split-button-action",
      type: "registry:ui",
      registryDependencies: ["button", "dropdown-menu", "utils"],
      files: ["registry/default/reusables/ui/split-button-action.tsx"],
      component: React.lazy(
        () => import("@/registry/default/reusables/ui/split-button-action.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "floating-elements-demo": {
      name: "floating-elements-demo",
      type: "registry:example",
      registryDependencies: [
        "https://reusables.vercel.app/r/floating-elements",
      ],
      files: ["registry/default/example/floating-elements-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/floating-elements-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "toast-demo": {
      name: "toast-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/toast-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "time-ago-demo": {
      name: "time-ago-demo",
      type: "registry:example",
      registryDependencies: ["time-ago"],
      files: ["registry/default/example/time-ago-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/time-ago-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "online-status-demo": {
      name: "online-status-demo",
      type: "registry:example",
      registryDependencies: ["submit-button"],
      files: ["registry/default/example/online-status-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/online-status-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "theme-image-demo": {
      name: "theme-image-demo",
      type: "registry:example",
      registryDependencies: ["theme-image"],
      files: ["registry/default/example/theme-image-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/theme-image-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "copy-button-demo": {
      name: "copy-button-demo",
      type: "registry:example",
      registryDependencies: ["copy-button"],
      files: ["registry/default/example/copy-button-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/copy-button-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "submit-button-position-left": {
      name: "submit-button-position-left",
      type: "registry:example",
      registryDependencies: ["submit-button"],
      files: ["registry/default/example/submit-button-position-left.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/submit-button-position-left.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "submit-button-hidetext-demo": {
      name: "submit-button-hidetext-demo",
      type: "registry:example",
      registryDependencies: ["submit-button"],
      files: ["registry/default/example/submit-button-hidetext-demo.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/submit-button-hidetext-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "submit-button-demo": {
      name: "submit-button-demo",
      type: "registry:example",
      registryDependencies: ["submit-button"],
      files: [
        "registry/default/example/submit-button-demo.tsx",
        "registry/default/reusables/ui/submit-button.tsx",
      ],
      component: React.lazy(
        () => import("@/registry/default/example/submit-button-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "screen-size-demo": {
      name: "screen-size-demo",
      type: "registry:example",
      registryDependencies: ["use-screen-size"],
      files: ["registry/default/example/screen-size-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/screen-size-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "inview-demo": {
      name: "inview-demo",
      type: "registry:example",
      registryDependencies: ["use-inview"],
      files: ["registry/default/example/inview-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/inview-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "file-upload-demo": {
      name: "file-upload-demo",
      type: "registry:example",
      registryDependencies: ["use-file-upload", "progress", "button"],
      files: ["registry/default/example/file-upload-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/file-upload-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "toast-with-description-demo": {
      name: "toast-with-description-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-with-description-demo.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/toast-with-description-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "toast-positions-demo": {
      name: "toast-positions-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-positions-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/toast-positions-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "toast-promise-demo": {
      name: "toast-promise-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-promise-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/toast-promise-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "toast-prevent-duplicates-demo": {
      name: "toast-prevent-duplicates-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-prevent-duplicates-demo.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/toast-prevent-duplicates-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "toast-custom-config-demo": {
      name: "toast-custom-config-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-custom-config-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/toast-custom-config-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "toast-progress-demo": {
      name: "toast-progress-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-progress-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/toast-progress-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "toast-close-button-demo": {
      name: "toast-close-button-demo",
      type: "registry:example",
      registryDependencies: ["toast"],
      files: ["registry/default/example/toast-close-button-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/toast-close-button-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "split-button-demo": {
      name: "split-button-demo",
      type: "registry:example",
      registryDependencies: ["split-button"],
      files: ["registry/default/example/split-button-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/split-button-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "split-button-action-demo": {
      name: "split-button-action-demo",
      type: "registry:example",
      registryDependencies: ["split-button-action"],
      files: ["registry/default/example/split-button-action-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/split-button-action-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "split-button-preview-demo": {
      name: "split-button-preview-demo",
      type: "registry:example",
      registryDependencies: ["split-button"],
      files: ["registry/default/example/split-button-previewe-demo.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/split-button-previewe-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "direct-image-upload-demo": {
      name: "direct-image-upload-demo",
      type: "registry:example",
      registryDependencies: ["single-image-upload"],
      files: ["registry/default/example/direct-image-upload-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/direct-image-upload-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "manual-image-upload-demo": {
      name: "manual-image-upload-demo",
      type: "registry:example",
      registryDependencies: ["single-image-upload"],
      files: ["registry/default/example/manual-image-upload-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/manual-image-upload-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "direct-multiple-image-upload-demo": {
      name: "direct-multiple-image-upload-demo",
      type: "registry:example",
      registryDependencies: ["multiple-image-upload"],
      files: ["registry/default/example/direct-multiple-image-upload-demo.tsx"],
      component: React.lazy(
        () =>
          import(
            "@/registry/default/example/direct-multiple-image-upload-demo.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "manual-multiple-image-upload-demo": {
      name: "manual-multiple-image-upload-demo",
      type: "registry:example",
      registryDependencies: ["multiple-image-upload"],
      files: ["registry/default/example/manual-multiple-image-upload-demo.tsx"],
      component: React.lazy(
        () =>
          import(
            "@/registry/default/example/manual-multiple-image-upload-demo.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "multiple-image-upload-form-demo": {
      name: "multiple-image-upload-form-demo",
      type: "registry:example",
      registryDependencies: [
        "multiple-image-upload",
        "button",
        "input",
        "form",
        "card",
      ],
      files: ["registry/default/example/multiple-image-upload-form-demo.tsx"],
      component: React.lazy(
        () =>
          import(
            "@/registry/default/example/multiple-image-upload-form-demo.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "single-image-upload-form-demo": {
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
      files: ["registry/default//example/single-image-upload-form-demo.tsx"],
      component: React.lazy(
        () =>
          import(
            "@/registry/default//example/single-image-upload-form-demo.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "compact-viewer-demo": {
      name: "compact-viewer-demo",
      type: "registry:example",
      registryDependencies: ["compact-viewer"],
      files: ["registry/default/example/compact-viewer-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/compact-viewer-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "fullscreen-viewer-demo": {
      name: "fullscreen-viewer-demo",
      type: "registry:example",
      registryDependencies: ["fullscreen-viewer", "button"],
      files: ["registry/default/example/fullscreen-viewer-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/fullscreen-viewer-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "hover-navigation-demo": {
      name: "hover-navigation-demo",
      type: "registry:example",
      registryDependencies: ["hover-navigation-viewer"],
      files: ["registry/default/example/hover-navigation-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/hover-navigation-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "minimal-viewer-demo": {
      name: "minimal-viewer-demo",
      type: "registry:example",
      registryDependencies: ["minimal-viewer"],
      files: ["registry/default/example/minimal-viewer-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/minimal-viewer-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "sidebar-viewer-demo": {
      name: "sidebar-viewer-demo",
      type: "registry:example",
      registryDependencies: ["sidebar-viewer"],
      files: ["registry/default/example/sidebar-viewer-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/sidebar-viewer-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "thumbnail-viewer-demo": {
      name: "thumbnail-viewer-demo",
      type: "registry:example",
      registryDependencies: ["thumbnail-viewer"],
      files: ["registry/default/example/thumbnail-viewer-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/default/example/thumbnail-viewer-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "direct-multi-file-upload-demo": {
      name: "direct-multi-file-upload-demo",
      type: "registry:example",
      registryDependencies: ["multi-file-upload"],
      files: ["registry/default/example/direct-multi-file-upload-demo.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/direct-multi-file-upload-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "manual-multi-file-upload-demo": {
      name: "manual-multi-file-upload-demo",
      type: "registry:example",
      registryDependencies: ["multi-file-upload", "button"],
      files: ["registry/default/example/manual-multi-file-upload-demo.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/manual-multi-file-upload-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "multi-file-upload-form-demo": {
      name: "multi-file-upload-form-demo",
      type: "registry:example",
      registryDependencies: [
        "multi-file-upload",
        "button",
        "input",
        "form",
        "card",
      ],
      files: ["registry/default/example/multi-file-upload-form-demo.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/multi-file-upload-form-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "universal-file-upload-demo": {
      name: "universal-file-upload-demo",
      type: "registry:example",
      registryDependencies: ["universal-file-upload", "button"],
      files: ["registry/default/example/universal-file-upload-demo.tsx"],
      component: React.lazy(
        () =>
          import("@/registry/default/example/universal-file-upload-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "universal-file-upload-direct-demo": {
      name: "universal-file-upload-direct-demo",
      type: "registry:example",
      registryDependencies: ["universal-file-upload"],
      files: ["registry/default/example/universal-file-upload-direct-demo.tsx"],
      component: React.lazy(
        () =>
          import(
            "@/registry/default/example/universal-file-upload-direct-demo.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "universal-file-upload-form-demo": {
      name: "universal-file-upload-form-demo",
      type: "registry:example",
      registryDependencies: [
        "universal-file-upload",
        "button",
        "input",
        "form",
        "card",
      ],
      files: ["registry/default/example/universal-file-upload-form-demo.tsx"],
      component: React.lazy(
        () =>
          import(
            "@/registry/default/example/universal-file-upload-form-demo.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
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
      chunks: [],
    },
    utils: {
      name: "utils",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/utils.ts"],
      component: React.lazy(() => import("@/registry/default/lib/utils.ts")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "cookies-client": {
      name: "cookies-client",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/cookies.client.ts"],
      component: React.lazy(
        () => import("@/registry/default/lib/cookies.client.ts")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "cookies-server": {
      name: "cookies-server",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/cookies.server.ts"],
      component: React.lazy(
        () => import("@/registry/default/lib/cookies.server.ts")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    permission: {
      name: "permission",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/permission.ts"],
      component: React.lazy(
        () => import("@/registry/default/lib/permission.ts")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "platform-detector": {
      name: "platform-detector",
      type: "registry:lib",
      registryDependencies: undefined,
      files: ["registry/default/lib/platform-detector.ts"],
      component: React.lazy(
        () => import("@/registry/default/lib/platform-detector.ts")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "use-online-status": {
      name: "use-online-status",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-online-status.tsx"],
      component: React.lazy(
        () => import("@/registry/default/hooks/use-online-status.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "use-screen-size": {
      name: "use-screen-size",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-screen-size.tsx"],
      component: React.lazy(
        () => import("@/registry/default/hooks/use-screen-size.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "use-inview": {
      name: "use-inview",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-inview.tsx"],
      component: React.lazy(
        () => import("@/registry/default/hooks/use-inview.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "use-file-upload": {
      name: "use-file-upload",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-file-upload.tsx"],
      component: React.lazy(
        () => import("@/registry/default/hooks/use-file-upload.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "use-multiple-file-upload": {
      name: "use-multiple-file-upload",
      type: "registry:hook",
      registryDependencies: undefined,
      files: ["registry/default/hooks/use-multiple-file-upload.tsx"],
      component: React.lazy(
        () => import("@/registry/default/hooks/use-multiple-file-upload.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "floating-elements": {
      name: "floating-elements",
      type: "registry:component",
      registryDependencies: ["utils"],
      files: ["registry/default/reusables/floating-elements.tsx"],
      component: React.lazy(
        () => import("@/registry/default/reusables/floating-elements.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "single-image-upload": {
      name: "single-image-upload",
      type: "registry:component",
      registryDependencies: ["utils"],
      files: [
        "registry/default/reusables/single-image-upload.tsx",
        "registry/default/hooks/use-file-upload.tsx",
      ],
      component: React.lazy(
        () => import("@/registry/default/reusables/single-image-upload.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "multiple-image-upload": {
      name: "multiple-image-upload",
      type: "registry:component",
      registryDependencies: ["utils"],
      files: [
        "registry/default/reusables/multiple-image-upload.tsx",
        "registry/default/hooks/use-multiple-file-upload.tsx",
      ],
      component: React.lazy(
        () => import("@/registry/default/reusables/multiple-image-upload.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "multi-file-upload": {
      name: "multi-file-upload",
      type: "registry:component",
      registryDependencies: ["utils"],
      files: [
        "registry/default/reusables/multi-file-upload.tsx",
        "registry/default/hooks/use-multiple-file-upload.tsx",
      ],
      component: React.lazy(
        () => import("@/registry/default/reusables/multi-file-upload.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "universal-file-upload": {
      name: "universal-file-upload",
      type: "registry:component",
      registryDependencies: ["utils"],
      files: [
        "registry/default/reusables/universal-file-upload.tsx",
        "registry/default/hooks/use-multiple-file-upload.tsx",
      ],
      component: React.lazy(
        () => import("@/registry/default/reusables/universal-file-upload.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "compact-viewer": {
      name: "compact-viewer",
      type: "registry:component",
      registryDependencies: ["button"],
      files: [
        "registry/default/reusables/pdf-viewers/compact-viewer.tsx",
        "registry/default/reusables/pdf-viewers/loading-spinner.tsx",
      ],
      component: React.lazy(
        () =>
          import("@/registry/default/reusables/pdf-viewers/compact-viewer.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "fullscreen-viewer": {
      name: "fullscreen-viewer",
      type: "registry:component",
      registryDependencies: ["button"],
      files: [
        "registry/default/reusables/pdf-viewers/fullscreen-viewer.tsx",
        "registry/default/reusables/pdf-viewers/loading-spinner.tsx",
      ],
      component: React.lazy(
        () =>
          import(
            "@/registry/default/reusables/pdf-viewers/fullscreen-viewer.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "hover-navigation-viewer": {
      name: "hover-navigation-viewer",
      type: "registry:component",
      registryDependencies: ["button"],
      files: [
        "registry/default/reusables/pdf-viewers/hover-navigation-viewer.tsx",
        "registry/default/reusables/pdf-viewers/loading-spinner.tsx",
      ],
      component: React.lazy(
        () =>
          import(
            "@/registry/default/reusables/pdf-viewers/hover-navigation-viewer.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "minimal-viewer": {
      name: "minimal-viewer",
      type: "registry:component",
      registryDependencies: ["button"],
      files: [
        "registry/default/reusables/pdf-viewers/minimal-viewer.tsx",
        "registry/default/reusables/pdf-viewers/loading-spinner.tsx",
      ],
      component: React.lazy(
        () =>
          import("@/registry/default/reusables/pdf-viewers/minimal-viewer.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "sidebar-viewer": {
      name: "sidebar-viewer",
      type: "registry:component",
      registryDependencies: ["button", "scroll-area"],
      files: [
        "registry/default/reusables/pdf-viewers/sidebar-viewer.tsx",
        "registry/default/reusables/pdf-viewers/loading-spinner.tsx",
      ],
      component: React.lazy(
        () =>
          import("@/registry/default/reusables/pdf-viewers/sidebar-viewer.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
    "thumbnail-viewer": {
      name: "thumbnail-viewer",
      type: "registry:component",
      registryDependencies: ["button"],
      files: [
        "registry/default/reusables/pdf-viewers/thumbnail-viewer.tsx",
        "registry/default/reusables/pdf-viewers/loading-spinner.tsx",
      ],
      component: React.lazy(
        () =>
          import(
            "@/registry/default/reusables/pdf-viewers/thumbnail-viewer.tsx"
          )
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: [],
    },
  },
}
