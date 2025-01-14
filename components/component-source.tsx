import { Index } from "__registry__";
import fs from "node:fs";
import path from "path";
import { ComponentPreview } from "./component-preview";

interface ComponentSourceProps {
  name: string; // Format: "folder/component-name" (e.g. "example/submit-button-demo")
  preview?: boolean;
  reTrigger?: boolean;
}

export async function ComponentSource({
  name,
  preview,
  reTrigger,
}: ComponentSourceProps) {
  const componentName = name.split("/")[1];
  const style = "default";

  // console.log(folder);

  // Get component details from registry
  const component = Index[style][componentName];

  if (!component) {
    console.error(`Component ${componentName} not found in registry`);
    return null;
  }

  // Read source code
  const filePath = path.join(process.cwd(), component.files[0]);

  let sourceCode = "";

  try {
    sourceCode = await fs.promises.readFile(filePath, "utf8");

    // Clean up imports
    sourceCode = sourceCode
      .replaceAll(`@/registry/${style}/`, "@/components/")
      .replaceAll("export default", "export");
  } catch (error) {
    console.error(`Error reading component source: ${error}`);
  }

  return (
    <ComponentPreview
      name={componentName}
      sourceCode={sourceCode}
      preview={preview}
      reTrigger={reTrigger}
    />
  );
}
