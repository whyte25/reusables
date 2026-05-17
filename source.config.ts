import { rehypeCode, rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins"
import { fileGenerator, remarkDocGen, remarkInstall } from "fumadocs-docgen"
import { remarkTypeScriptToJavaScript } from "fumadocs-docgen/remark-ts2js"
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config"
import lastModified from "fumadocs-mdx/plugins/last-modified"
import { transformerTwoslash } from "fumadocs-twoslash"
import remarkSmartypants from "remark-smartypants"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema,
  },
})

export default defineConfig({
  plugins: [lastModified()],
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
