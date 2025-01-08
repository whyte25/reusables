import {
  rehypeCode,
  rehypeCodeDefaultOptions,
} from "fumadocs-core/mdx-plugins";
import { remarkInstall, remarkTypeScriptToJavaScript } from "fumadocs-docgen";
import { defineConfig } from "fumadocs-mdx/config";
import remarkSmartypants from "remark-smartypants";

import {
  defineCollections,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";

export const docs = defineCollections({
  type: "doc",
  dir: "content/docs",
  schema: frontmatterSchema,
});

export const meta = defineCollections({
  type: "meta",
  dir: "content/docs",
  schema: metaSchema,
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      theme: "github-dark",
      inline: "tailing-curly-colon",
      defaultColor: false,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
      ],
    },
    rehypePlugins: [rehypeCode],
    remarkPlugins: [
      [
        remarkInstall,
        remarkTypeScriptToJavaScript,
        remarkSmartypants,

        { persist: { id: "package-manager" } },
      ],
    ],
  },
});