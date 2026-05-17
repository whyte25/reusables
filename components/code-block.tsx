import { CodeBlockProps } from "@/code-block"
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc"

export async function CodeBlock({
  code,
  lang = "tsx",
  ...props
}: CodeBlockProps) {
  return (
    <ServerCodeBlock
      code={code}
      lang={lang}
      codeblock={props}
      defaultColor={false}
      themes={{
        light: "github-light",
        dark: "github-dark",
      }}
    />
  )
}
