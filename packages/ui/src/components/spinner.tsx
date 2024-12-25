import { Loader } from "lucide-react";

import { cn } from "@reusables/lib";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin text-white", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export const Spinner = ({ size, className }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size, className }))} />;
};
