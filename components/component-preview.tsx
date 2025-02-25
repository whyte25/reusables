"use client"

import * as React from "react"
import Link from "next/link"
import { Index } from "__registry__"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Fullscreen, Loader2, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ComponentWrapper from "@/components/component-wrapper"

import { ComponentSourceProps } from "./component-source"
import { OpenInV0Button } from "./open-in-v0-button"

interface ComponentPreviewProps extends ComponentSourceProps {
  children: React.ReactNode
}

export function ComponentPreview({
  name,
  className,
  showPreviewOnly = false,
  showV0button = false,
  showPreviewButton = true,
  reTrigger = true,
  children,
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0)

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component
    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">Component not found</p>
      )
    }
    return <Component />
  }, [name])

  return showPreviewOnly ?
      <ComponentWrapper className={className}>
        {reTrigger && (
          <Button
            onClick={() => setKey((prev) => prev + 1)}
            className="absolute right-1.5 top-1.5 z-10 ml-4 flex items-center rounded-lg px-3 py-1"
            variant="ghost"
          >
            <RotateCcw aria-label="restart-btn" size={16} />
          </Button>
        )}
        <React.Suspense
          fallback={
            <div className="flex items-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Loading...
            </div>
          }
        >
          {Preview}
        </React.Suspense>
      </ComponentWrapper>
    : <div
        className={cn(
          "relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]",
          className
        )}
        {...props}
      >
        <Tabs
          defaultValue="Preview"
          items={["Preview", "Code"]}
          className="relative mr-auto w-full"
        >
          <Tab value="Preview" className="relative rounded-md" key={key}>
            <ComponentWrapper className={className}>
              <div className="absolute -top-1 right-1.5 z-10 ml-4 flex items-center gap-2 md:top-2">
                {showPreviewButton && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-sm bg-accent p-0 px-3 py-1 lg:bg-transparent"
                    asChild
                    title="Open in New Tab"
                  >
                    <Link href={`/preview/${name}`} target="_blank">
                      <span className="sr-only">Open in New Tab</span>
                      <Fullscreen className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                )}
                {showV0button && <OpenInV0Button name={name} />}
                {reTrigger && (
                  <Button
                    onClick={() => setKey((prev) => prev + 1)}
                    className="rounded-lg bg-accent px-3 py-1 lg:bg-transparent"
                    variant="ghost"
                  >
                    <RotateCcw aria-label="restart-btn" size={16} />
                  </Button>
                )}
              </div>
              <React.Suspense
                fallback={
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </ComponentWrapper>
          </Tab>
          <Tab value="Code">{children}</Tab>
        </Tabs>
      </div>
}
