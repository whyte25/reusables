import {
  CodeBlock as FumaDocsCodeBlock,
  Pre,
} from "fumadocs-ui/components/codeblock";

import { CodeBlockProps } from "@/code-block";
import { highlight } from "./code-block-highlighter";

export async function CodeBlock({
  code,
  lang = "tsx",
  compact = false,
  ...props
}: CodeBlockProps) {
  const demoCode = await highlight(code, lang);
  return (
    <FumaDocsCodeBlock
      // @ts-expect-error bypass custom error
      custom={compact ? "compact" : undefined}
      {...props}
    >
      <Pre dangerouslySetInnerHTML={{ __html: demoCode }} />
    </FumaDocsCodeBlock>
  );
}
