import { Suspense } from "react"
import Link from "next/link"
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui"
import { Accordion, Accordions } from "fumadocs-ui/components/accordion"
import { cn } from "fumadocs-ui/components/api"
import { Callout } from "fumadocs-ui/components/callout"
import { Card, Cards } from "fumadocs-ui/components/card"
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock"
import { ImageZoom } from "fumadocs-ui/components/image-zoom"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { TypeTable } from "fumadocs-ui/components/type-table"
import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents, MDXProps } from "mdx/types"

import { CodeBlockWrapper } from "./code-block-wrapper"
import { CollapsibleCode } from "./collapsible-code"
import { ComponentPreview } from "./component-preview"
import { ComponentSource } from "./component-source"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Suspense,
    pre: ({ ...props }) => {
      return (
        <CodeBlock className="" {...props}>
          <Pre>{props.children}</Pre>
        </CodeBlock>
      )
    },
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
    ComponentSource,
    ComponentPreview,
    CollapsibleCode,
    CodeBlockWrapper,
    Link,
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
    TypeTable,
  }
}

export function MDXRenderer({
  code,
}: {
  code: (props: MDXProps) => React.ReactElement
}) {
  const components = useMDXComponents({})

  const MDXContent = code

  return <MDXContent code={code} components={components} />
}
