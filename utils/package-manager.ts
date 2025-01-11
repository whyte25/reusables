import { MDXProps } from "@/types";

export function isPackageInstall(props: MDXProps) {
  const className = props?.children?.props?.className;
  return className === "language-package-install";
}

export function isNpxCommand(props: MDXProps) {
  const className = props?.children?.props?.className;
  return className === "language-npx";
}

export function getPackageNames(content: unknown): string[] {
  if (typeof content !== "string") {
    return [];
  }
  return content.split("\n").filter(Boolean);
}

export function getInstallCommand(packageNames: string[], manager: string) {
  const packages = packageNames.join(" ");
  switch (manager) {
    case "npm":
      return `npm install ${packages}`;
    case "pnpm":
      return `pnpm add ${packages}`;
    case "yarn":
      return `yarn add ${packages}`;
    case "bun":
      return `bun add ${packages}`;
    default:
      return "";
  }
}

export function getNpxCommand(command: string, manager: string) {
  // Remove 'npx' if it's at the start of the command
  const cleanCommand = command.replace(/^npx\s+/, "");

  switch (manager) {
    case "npm":
      return `npx ${cleanCommand}`;
    case "pnpm":
      return `pnpm dlx ${cleanCommand}`;
    case "yarn":
      return `yarn dlx ${cleanCommand}`;
    case "bun":
      return `bunx ${cleanCommand}`;
    default:
      return "";
  }
}
