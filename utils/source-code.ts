import fs from "node:fs"
import path from "path"
import { Index } from "__registry__"

/**
 * Reads and processes component source code from a file
 * 
 * @param componentName - Name of the component in the registry
 * @returns The processed source code string or empty string if an error occurs
 */
export async function readComponentSource(componentName: string): Promise<string> {
  // Get component details from registry
  const component = Index[componentName]

  if (!component) {
    console.error(`Component ${componentName} not found in registry`)
    return ""
  }

  // Read source code
  const filePath = path.join(process.cwd(), component.files[0].path)
  let sourceCode = ""

  try {
    sourceCode = await fs.promises.readFile(filePath, "utf8")

    // Clean up imports - handle both registry and reusables paths
    sourceCode = sourceCode
      // Handle absolute paths
      .replaceAll("@/registry/reusables/", "@/components/")
      // Handle relative paths to reusables
      .replaceAll(/"\.\.\/reusables\/(.*?)"/g, '"@/components/$1"')
      .replaceAll(/"\.\.\/hooks\/(.*?)"/g, '"@/hooks/$1"')
      .replaceAll(/"\.\.\/lib\/(.*?)"/g, '"@/lib/$1"')
      .replaceAll(/"\.\.\/utils\/(.*?)"/g, '"@/utils/$1"')
      // Handle exports
      .replaceAll("export default", "export")
    
    return sourceCode
  } catch (error) {
    console.error(`Error reading component source: ${error}`)
    return ""
  }
}
