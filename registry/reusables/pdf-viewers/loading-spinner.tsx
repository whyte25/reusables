import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  minHeight?: string
  minWidth?: string
  className?: string
  spinnerClassName?: string
}

export const LoadingSpinner = ({
  minHeight = "600px",
  minWidth = "800px",
  className,
  spinnerClassName,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={{ minHeight, minWidth }}
    >
      <Loader2
        className={cn("h-8 w-8 animate-spin text-white", spinnerClassName)}
      />
    </div>
  )
}
