import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"

import { getInstallCommand, getNpxCommand } from "../utils/package-manager"

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const
// type PackageManager = (typeof PACKAGE_MANAGERS)[number];
type CommandType = "install" | "npx"

interface PackageManagerTabsProps {
  packages: string[]
  type: CommandType
}

export function PackageManagerTabs({
  packages,
  type,
}: PackageManagerTabsProps) {
  const managers = [...PACKAGE_MANAGERS]
  const npxCommand = type === "npx" ? packages.join(" ") : ""

  return (
    <Tabs persist groupId="package-manager" items={managers}>
      {managers.map((manager) => (
        <Tab key={manager} value={manager}>
          <CodeBlock>
            <Pre>
              {type === "install" ?
                getInstallCommand(packages, manager)
              : getNpxCommand(npxCommand, manager)}
            </Pre>
          </CodeBlock>
        </Tab>
      ))}
    </Tabs>
  )
}
