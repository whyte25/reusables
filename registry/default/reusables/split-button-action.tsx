"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader2 } from "lucide-react";
import * as React from "react";

export interface SplitButtonOption {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
}

interface SplitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: SplitButtonOption[];
  mainAction: () => void;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  dropdownAlign?: "start" | "center" | "end";
  icon?: React.ReactNode;
  isLoading?: boolean;
  glassMorphism?: boolean;
}

export default function SplitButtonAction({
  children,
  options,
  mainAction,
  variant = "default",
  size = "default",
  dropdownAlign = "end",
  className,
  icon,
  isLoading,
  glassMorphism,
  ...props
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const baseClassName = cn(
    "relative transition-all duration-200",
    glassMorphism && "backdrop-blur-sm bg-opacity-80 shadow-lg",
    className
  );

  const buttonClassName = cn(
    "rounded-r-none",
    "hover:translate-y-[-1px]",
    "active:translate-y-[1px]",
    "transition-all duration-200",
    glassMorphism && "backdrop-blur-sm bg-opacity-80"
  );

  const dropdownTriggerClassName = cn(
    "rounded-l-none",
    "border-l",
    "px-2",
    "hover:translate-y-[-1px]",
    "active:translate-y-[1px]",
    "transition-all duration-200",
    variant === "default" && "border-primary-foreground/20",
    variant === "destructive" && "border-destructive-foreground/20",
    variant === "outline" && "border-input",
    variant === "secondary" && "border-secondary-foreground/20",
    glassMorphism && "backdrop-blur-sm bg-opacity-80"
  );

  return (
    <div className={baseClassName}>
      <div className="relative flex items-center group">
        <Button
          variant={variant}
          size={size}
          className={buttonClassName}
          onClick={(e) => {
            e?.preventDefault();
            mainAction();
          }}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              {icon && <span className="mr-2">{icon}</span>}
              {children}
            </>
          )}
        </Button>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant}
              size={size}
              className={dropdownTriggerClassName}
              aria-label="More options"
              disabled={isLoading}
            >
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={dropdownAlign}
            className={cn(
              "animate-in fade-in-0 zoom-in-95",
              glassMorphism && "backdrop-blur-sm bg-opacity-90"
            )}
          >
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <DropdownMenuItem
                  onClick={(e) => {
                    e?.preventDefault();
                    option.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center cursor-pointer gap-2 transition-colors duration-200"
                >
                  {option.icon && (
                    <span className="h-4 w-4">{option.icon}</span>
                  )}
                  {option.label}
                </DropdownMenuItem>
                {index < options.length - 1 && <DropdownMenuSeparator />}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
