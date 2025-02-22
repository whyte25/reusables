import { rehypeCodeOptions } from "@/rehype-code.config"
import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import type { BundledLanguage } from "shiki/bundle/web"
import { codeToHtml } from "shiki/bundle/web"

export async function highlight(code: string, lang: BundledLanguage) {
  return await codeToHtml(code, {
    ...rehypeCodeOptions,
    lang,
    transformers: [
      transformerNotationHighlight() as any,
      transformerNotationWordHighlight() as any,
    ],
  })
}
