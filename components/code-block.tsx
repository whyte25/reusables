import {
  CodeBlock as FumaDocsCodeBlock,
  Pre,
} from "fumadocs-ui/components/codeblock";

import { CodeBlockProps } from "@/code-block";

export async function CodeBlock({
  code,
  compact = false,
  ...props
}: CodeBlockProps) {
  // const demoCode = await highlight(code, lang);
  return (
    <FumaDocsCodeBlock
      // @ts-expect-error bypass custom error
      custom={compact ? "compact" : undefined}
      {...props}
    >
      <Pre>{code}</Pre>
    </FumaDocsCodeBlock>
  );
}
