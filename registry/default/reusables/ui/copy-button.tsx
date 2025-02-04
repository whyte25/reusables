"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

interface CopyButtonProps extends ButtonProps {
  value: string
}

export default function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn("relative z-10 size-6 [&_svg]:size-3", className)}
      onClick={() => {
        copyToClipboard(value)
        setHasCopied(true)
      }}
      {...props}
    >
      {hasCopied ?
        <CheckIcon />
      : <ClipboardIcon />}
    </Button>
  )
}
