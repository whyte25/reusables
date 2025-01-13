import { Button, ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  isSubmitting,
  spinnerClassName,
  hideText = false,
  ...props
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
  spinnerClassName?: string;
  hideText?: boolean;
} & ButtonProps) {
  return (
    <Button disabled={isSubmitting} {...props}>
      {hideText && isSubmitting ? null : children}

      {isSubmitting && (
        <Spinner className={cn(hideText ? "m-0" : "ml-2", spinnerClassName)} />
      )}
    </Button>
  );
}
