"use client";

import { Index } from "__registry__";
import { Loader2, RotateCcw } from "lucide-react";
import * as React from "react";

import ComponentWrapper from "@/components/component-wrapper";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { styles } from "@/registry/registry-styles";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
  preview?: boolean;
  reTrigger?: boolean;
}

export function ComponentPreview({
  name,
  children,
  className,
  // align = "center",
  // preview = false,
  reTrigger = true,
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
  const d_style = "default";
  const index = styles.findIndex((style) => style.name === d_style);

  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[index];

  const Preview = React.useMemo(() => {
    const Component = Index[d_style][name]?.component;

    if (!Component) {
      console.error(`Component with name "${name}" not found in registry.`);
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name, d_style]);

  const codeContent = React.useMemo(() => {
    const content =
      // @ts-expect-error error is expected as typescript cannot suggest the nesting.
      Code?.props?.children?._owner?.props?.children?.props?.children;
    return content || "";
  }, [Code]);

  return (
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
          <ComponentWrapper>
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
        </Tab>
        <Tab value="Code">
          {/* <CodeBlock code={codeContent} compact /> */}
          {Code}
        </Tab>
      </Tabs>
    </div>
  );
}
