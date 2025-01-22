"use client";

import { Index } from "__registry__";
import { Loader2, RotateCcw } from "lucide-react";
import * as React from "react";

import ComponentWrapper from "@/components/component-wrapper";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { CodeBlock } from "./code-block-client";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  sourceCode: string;
  preview?: boolean;
  reTrigger?: boolean;
}

export function ComponentPreview({
  name,
  sourceCode,
  className,
  preview = false,
  reTrigger = true,
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
  const d_style = "default";

  const Preview = React.useMemo(() => {
    const Component = Index[d_style][name]?.component;
    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">Component not found</p>
      );
    }
    return <Component />;
  }, [name]);

  // // Simplified code display
  // const Code = React.useMemo(
  //   () => (
  //     <pre className="language-tsx">
  //       <code className="language-tsx">{sourceCode}</code>
  //     </pre>
  //   ),
  //   [sourceCode]
  // );

  return preview ? (
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
  ) : (
    <div
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
            <div className="absolute right-1.5 top-1.5 z-10 ml-4 flex items-center gap-2">
              {/* <OpenInV0Button name={name} /> */}
              {reTrigger && (
                <Button
                  onClick={() => setKey((prev) => prev + 1)}
                  className=" rounded-lg px-3 py-1"
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
        <Tab value="Code">
          <CodeBlock code={sourceCode} compact />
        </Tab>
      </Tabs>
    </div>
  );
}
