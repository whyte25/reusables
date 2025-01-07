import { defineCollection, defineConfig } from "@content-collections/core";
import {
  createDocSchema,
  createMetaSchema,
  transformMDX,
} from "@fumadocs/content-collections/configuration";
import { rehypeCode } from "fumadocs-core/mdx-plugins";
import { remarkInstall } from "fumadocs-docgen";
// import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkSmartypants from "remark-smartypants";
import { rehypeCodeOptions } from "./rehype-code.config";

// const prettyCodeOptions: Options = {
//   theme: "github-dark",
//   getHighlighter: (options) =>
//     createHighlighter({
//       ...options,
//     }),
//   onVisitLine(node) {
//     // Prevent lines from collapsing in `display: grid` mode, and allow empty
//     // lines to be copy/pasted
//     if (node.children.length === 0) {
//       node.children = [{ type: "text", value: " " }];
//     }
//   },
//   onVisitHighlightedLine(node) {
//     if (!node.properties.className) {
//       node.properties.className = [];
//     }
//     node.properties.className.push("line--highlighted");
//   },
//   onVisitHighlightedChars(node) {
//     if (!node.properties.className) {
//       node.properties.className = [];
//     }
//     node.properties.className = ["word--highlighted"];
//   },
// };

const docs = defineCollection({
  name: "docs",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: createDocSchema,
  transform: transformMDX,
});

const metas = defineCollection({
  name: "meta",
  directory: "content/docs",
  include: "**/meta.json",
  parser: "json",
  schema: createMetaSchema,
});

export default defineConfig({
  collections: [docs, metas],
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions,
    remarkPlugins: [
      remarkInstall,
      remarkSmartypants,
      {
        persist: {
          id: "package-manager",
        },
      },
    ],
    rehypePlugins: [
      rehypeCode,
      // [rehypePrettyCode, prettyCodeOptions]
    ],
  },
});
