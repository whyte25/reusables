import fs from "node:fs"
import path from "path"
import { Index } from "__registry__"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"

import { CodeBlock } from "./code-block"
import { ComponentPreview } from "./component-preview"

function transformDisplayedSource(sourceCode: string, mode: "source" | "npm") {
  return (
    sourceCode
      // Handle package source imports used by local examples.
      .replaceAll(
        "@/packages/notify/src/notify-types",
        mode === "npm" ? "reusables-notify" : "@/components/ui/notify"
      )
      .replaceAll(
        "@/packages/notify/src",
        mode === "npm" ? "reusables-notify" : "@/components/ui/notify"
      )
      // Handle absolute paths
      .replaceAll("@/registry/reusables/", "@/components/")
      // Handle relative paths to reusables
      .replaceAll(/"\.\.\/reusables\/(.*?)"/g, '"@/components/$1"')
      .replaceAll(/"\.\.\/hooks\/(.*?)"/g, '"@/hooks/$1"')
      .replaceAll(/"\.\.\/lib\/(.*?)"/g, '"@/lib/$1"')
      .replaceAll(/"\.\.\/utils\/(.*?)"/g, '"@/utils/$1"')
      // Handle exports
      .replaceAll("export default", "export")
  )
}

export interface ComponentSourceProps {
  name: string
  showV0Button?: boolean
  showPreviewOnly?: boolean
  showPreviewButton?: boolean
  reTrigger?: boolean
  className?: string
}

export async function ComponentSource({
  name,
  showPreviewOnly,
  showPreviewButton,
  showV0Button,
  reTrigger,
  className,
}: ComponentSourceProps) {
  // Get component details from registry
  const component = Index[name]

  if (!component) {
    console.error(`Component ${name} not found in registry`)
    return null
  }

  // Read source code
  const filePath = path.join(process.cwd(), component.files[0].path)

  let sourceCode = ""
  let npmSourceCode = ""
  let hasNotifyPackageImports = false

  try {
    const rawSourceCode = await fs.promises.readFile(filePath, "utf8")
    hasNotifyPackageImports = rawSourceCode.includes("@/packages/notify/src")
    sourceCode = transformDisplayedSource(rawSourceCode, "source")
    npmSourceCode = transformDisplayedSource(rawSourceCode, "npm")
  } catch (error) {
    console.error(`Error reading component source: ${error}`)
  }

  const codeBlock =
    hasNotifyPackageImports ?
      <Tabs items={["Source Files", "NPM"]} groupId="notify-install" persist>
        <Tab value="Source Files">
          <CodeBlock code={sourceCode} compact />
        </Tab>
        <Tab value="NPM">
          <CodeBlock code={npmSourceCode} compact />
        </Tab>
      </Tabs>
    : <CodeBlock code={sourceCode} compact />

  return (
    <ComponentPreview
      className={className}
      name={name}
      showV0Button={showV0Button}
      showPreviewOnly={showPreviewOnly}
      showPreviewButton={showPreviewButton}
      reTrigger={reTrigger}
    >
      {codeBlock}
    </ComponentPreview>
  )
}
