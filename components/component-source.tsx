import fs from "node:fs"
import path from "path"
import { Index } from "__registry__"

import { CodeBlock } from "./code-block"
import { ComponentPreview } from "./component-preview"

interface ComponentSourceProps {
  name: string // Format: "folder/component-name" (e.g. "example/submit-button-demo")
  showPreviewOnly?: boolean
  showPreviewButton?: boolean
  reTrigger?: boolean
  className?: string
}

export async function ComponentSource({
  name,
  showPreviewOnly,
  showPreviewButton,
  reTrigger,
  className,
}: ComponentSourceProps) {
  const style = "default"

  // console.log(folder);

  // Get component details from registry
  const component = Index[style][name]

  if (!component) {
    console.error(`Component ${name} not found in registry`)
    return null
  }

  // Read source code
  const filePath = path.join(process.cwd(), component.files[0])

  let sourceCode = ""

  try {
    sourceCode = await fs.promises.readFile(filePath, "utf8")

    // Clean up imports - handle both registry and reusables paths
    sourceCode = sourceCode
      // Handle absolute paths
      .replaceAll("@/registry/default/", "@/components/")
      // Handle relative paths to reusables
      .replaceAll(/"\.\.\/reusables\/(.*?)"/g, '"@/components/$1"')
      .replaceAll(/"\.\.\/hooks\/(.*?)"/g, '"@/hooks/$1"')
      .replaceAll(/"\.\.\/lib\/(.*?)"/g, '"@/lib/$1"')
      .replaceAll(/"\.\.\/utils\/(.*?)"/g, '"@/utils/$1"')
      // Handle exports
      .replaceAll("export default", "export")
  } catch (error) {
    console.error(`Error reading component source: ${error}`)
  }

  return (
    <ComponentPreview
      className={className}
      name={name}
      showPreviewOnly={showPreviewOnly}
      showPreviewButton={showPreviewButton}
      reTrigger={reTrigger}
    >
      <CodeBlock code={sourceCode} compact />
    </ComponentPreview>
  )
}
