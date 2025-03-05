import { rehypeCode, rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins"
import {
  fileGenerator,
  remarkDocGen,
  remarkInstall,
  remarkTypeScriptToJavaScript,
} from "fumadocs-docgen"
import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config"
import { transformerTwoslash } from "fumadocs-twoslash"
import remarkSmartypants from "remark-smartypants"

export const docs = defineCollections({
  type: "doc",
  dir: "content/docs",
  schema: frontmatterSchema,
})

export const meta = defineCollections({
  type: "meta",
  dir: "content/docs",
  schema: metaSchema,
})

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      inline: "tailing-curly-colon",
      defaultColor: false,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash() as any,
      ],
    },
    rehypePlugins: [rehypeCode],
    remarkPlugins: [
      [
        remarkDocGen,
        {
          generators: [fileGenerator()],
        },
      ],
      [remarkTypeScriptToJavaScript],
      [remarkSmartypants],
      [remarkInstall, { persist: { id: "package-manager" } }],
    ],
  },
})
