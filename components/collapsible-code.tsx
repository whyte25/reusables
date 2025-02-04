"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CodeBlockWrapper } from "@/components/code-block-wrapper"

interface CollapsibleCodeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CollapsibleCode({
  children,
  className,
  ...props
}: CollapsibleCodeProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("overflow-hidden rounded-md", className)}
      {...props}
    >
      {children}
    </CodeBlockWrapper>
  )
}
