import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import type { BundledLanguage } from "shiki/bundle/web";
import { codeToHtml } from "shiki/bundle/web";

export async function highlight(code: string, lang: BundledLanguage) {
  return await codeToHtml(code, {
    ...{
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      inline: "tailing-curly-colon",
      defaultColor: false,
    },
    lang,
    transformers: [
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
    ],
  });
}

export function renderCodeSkeleton(code: string) {
  return `<pre class='h-auto'><code>${code
    ?.split("\n")
    ?.map((line) => `<span class="line">${line}</span>`)
    ?.join("")}</code></pre>`;
}
