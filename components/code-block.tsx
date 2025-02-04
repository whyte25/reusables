import { CodeBlockProps } from "@/code-block"
import { highlight } from "fumadocs-core/server"
import {
  CodeBlock as FumaDocsCodeBlock,
  Pre,
} from "fumadocs-ui/components/codeblock"

export async function CodeBlock({ code, ...props }: CodeBlockProps) {
  const renderedCode = await highlight(code, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })
  return (
    <FumaDocsCodeBlock {...props}>
      <Pre>{renderedCode}</Pre>
    </FumaDocsCodeBlock>
  )
}
