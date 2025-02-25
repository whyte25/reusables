import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

import { Spinner } from "./spinner"

type SpinnerPosition = "left" | "right"
type SpinnerSize = "default" | "sm" | "lg" | "icon"

interface LoadingSpinnerProps {
  size?: SpinnerSize
  className?: string
  hideText?: boolean
}

interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode
  isSubmitting: boolean
  spinnerClassName?: string
  spinnerSize?: SpinnerSize
  position?: SpinnerPosition
  hideText?: boolean
}

export function SubmitButton({
  children,
  isSubmitting,
  spinnerClassName,
  spinnerSize,
  position = "right",
  hideText = false,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      disabled={isSubmitting}
      className={cn(
        props.className,
        "relative flex items-center justify-center",
        position === "left" && "flex-row-reverse"
      )}
      {...props}
    >
      <span className={hideText && isSubmitting ? "invisible" : "visible"}>
        {children}
      </span>
      {isSubmitting && (
        <LoadingSpinner
          size={spinnerSize}
          className={spinnerClassName}
          hideText={hideText}
        />
      )}
    </Button>
  )
}

function LoadingSpinner({ size, className, hideText }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        hideText &&
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      )}
    >
      <Spinner size={size} className={className} />
    </div>
  )
}
