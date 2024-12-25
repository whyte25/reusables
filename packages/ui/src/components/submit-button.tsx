import { cn } from "@reusables/lib";
import { Button, ButtonProps } from "./button";
import { Spinner } from "./spinner";

export function SubmitButton({
  children,
  isSubmitting,
  spinnerClassName,
  hiddenText,
  ...props
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
  spinnerClassName?: string;
  hiddenText?: boolean;
} & ButtonProps) {
  return (
    <Button disabled={isSubmitting} {...props}>
      {hiddenText && isSubmitting ? null : children}

      {isSubmitting && <Spinner className={cn("ml-2", spinnerClassName)} />}
    </Button>
  );
}
