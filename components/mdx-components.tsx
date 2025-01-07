import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import { createTypeTable } from "fumadocs-typescript/ui";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { cn } from "fumadocs-ui/components/api";
import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Suspense } from "react";
import {
  getPackageNames,
  isNpxCommand,
  isPackageInstall,
} from "../utils/package-manager";
import { PackageManagerTabs } from "./package-manager-tabs";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const { AutoTypeTable } = createTypeTable();

  return {
    ...defaultMdxComponents,
    ...components,
    Suspense,
    pre: ({ ...props }) => {
      const content = String(props?.children?.props?.children || "");
      const packages = getPackageNames(content);

      if (isPackageInstall(props)) {
        return <PackageManagerTabs packages={packages} type="install" />;
      }

      if (isNpxCommand(props)) {
        return <PackageManagerTabs packages={packages} type="npx" />;
      }

      return (
        <CodeBlock {...props}>
          <Pre>{props.children}</Pre>
        </CodeBlock>
      );
    },
    AutoTypeTable,
    Popup,
    PopupContent,
    PopupTrigger,
    Tab,
    Tabs,
    Step,
    Steps,
    Accordion,
    Accordions,
    Callout,
    Card,
    Cards,
    LinkedCard: ({
      className,
      ...props
    }: React.ComponentProps<typeof Link>) => (
      <Link
        className={cn(
          "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
          className
        )}
        {...props}
      />
    ),
    img: (props) => <ImageZoom {...(props as any)} />,
  };
}
