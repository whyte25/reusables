"use client";

import * as React from "react";

import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { cn } from "@/lib/utils";

interface CollapsibleCodeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CollapsibleCode({
  children,
  className,
  ...props
}: CollapsibleCodeProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("overflow-hidden rounded-md ", className)}
      {...props}
    >
      {children}
    </CodeBlockWrapper>
  );
}
