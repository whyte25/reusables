import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  minHeight?: string;
  minWidth?: string;
  className?: string;
  spinnerClassName?: string;
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
        className={cn("w-8 h-8 animate-spin text-primary", spinnerClassName)}
      />
    </div>
  );
};
