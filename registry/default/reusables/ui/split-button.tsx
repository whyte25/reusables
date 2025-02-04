"use client"

import type * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface SplitButtonOption {
  label: string
  onClick: () => void
}

interface SplitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: SplitButtonOption[]
  mainAction: () => void
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  size?: "default" | "sm" | "lg" | "icon"
  dropdownAlign?: "start" | "center" | "end"
}

export default function SplitButton({
  children,
  options,
  mainAction,
  variant = "default",
  size = "default",
  dropdownAlign = "end",
  className,
  ...props
}: SplitButtonProps) {
  return (
    <div className="relative flex items-center">
      <Button
        variant={variant}
        size={size}
        className={cn("rounded-r-none", className)}
        onClick={mainAction}
        {...props}
      >
        {children}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={cn(
              "rounded-l-none border-primary-foreground/20 px-2",
              variant === "outline" ?
                "bg-accent hover:bg-accent/80"
              : "border-l"
            )}
            aria-label="More options"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={dropdownAlign}>
          {options.map((option, index) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={index}
              onClick={option.onClick}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
