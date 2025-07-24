import { Index } from "__registry__"

import { readComponentSource } from "../utils/source-code"
import { CodeBlock } from "./code-block"
import { ComponentPreview } from "./component-preview"

export interface ComponentSourceProps {
  name: string
  showV0Button?: boolean
  showPreviewOnly?: boolean
  showPreviewButton?: boolean
  reTrigger?: boolean
  className?: string
  hideCode?: boolean
}

export async function ComponentSource({
  name,
  showPreviewOnly,
  showPreviewButton,
  showV0Button,
  reTrigger,
  className,
  hideCode,
}: ComponentSourceProps) {
  // Get component from registry for validation
  const component = Index[name]

  if (!component) {
    console.error(`Component ${name} not found in registry`)
    return null
  }

  // Read and process source code using the utility function
  const sourceCode = await readComponentSource(name)

  return (
    <ComponentPreview
      className={className}
      name={name}
      showV0Button={showV0Button}
      showPreviewOnly={showPreviewOnly}
      showPreviewButton={showPreviewButton}
      reTrigger={reTrigger}
      hideCode={hideCode}
    >
      <CodeBlock code={sourceCode} compact />
    </ComponentPreview>
  )
}
