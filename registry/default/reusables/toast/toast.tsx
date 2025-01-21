"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Loader, LoaderCircle, X } from "lucide-react";
import * as React from "react";
import { ToastClassNames, ToastParams } from "./toast-provider";

export const statusStyles = {
  error:
    "dark:bg-[#24161b] bg-[#fff5f5] text-red-900 dark:text-[#ffdfdd] dark:border-red-900 border-red-200",
  warning:
    "dark:bg-[#1E1A1B] bg-[#fefae1] text-[#3b2212] dark:text-[#EADB90] dark:border-[#5C431B] border-[#ddcab8]",
  success:
    "dark:bg-[#131d1e] bg-[#e7fef6] text-[#0d311e] dark:text-[#abf9de] dark:border-[#1e5643] border-green-200",
  info: "dark:bg-[#161831] bg-[#edf4ff] text-[#1e3a8a] dark:text-[#DCE6FF] dark:border-[#2f3873] pborder-[#bfdbfe]",
  default:
    "dark:bg-[#13141b] bg-white text-gray-900 dark:text-[#e4e5e9] dark:border-[#3a3c4a] border-gray-200",
  loading: "bg-white text-gray-900 border-gray-200  ",
} as const;

const toastVariants = cva(
  "relative flex w-full flex-col gap-1 rounded-lg border p-[0.75rem] overflow-hidden shadow-lg ",
  {
    variants: {
      status: statusStyles,
    },
    defaultVariants: {
      status: "default",
    },
  }
);

const progressBarVariants = cva("absolute bottom-0 left-0 h-[2px] ", {
  variants: {
    status: {
      error: "dark:bg-[#f77a6f] bg-red-600",
      warning: "dark:bg-[#fabe20] bg-yellow-500",
      success: "dark:bg-[#12f0a5] bg-green-600",
      info: "dark:bg-[#7898ff] bg-blue-600",
      default: "bg-gray-600 dark:bg-[#e4e5e9]",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { title: string }
>(({ title, className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "leading-none text-[0.8125rem] mr-auto font-medium tracking-tight",
      className
    )}
    {...props}
  >
    {title}
  </p>
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    description?: ToastParams["description"];
    status: ToastParams["status"];
  }
>(({ description, status, className, ...props }, ref) => {
  if (!description || status === "loading") return null;
  return (
    <p
      ref={ref}
      className={cn("text-[0.8125rem] opacity-80", className)}
      {...props}
    >
      {description}
    </p>
  );
});
ToastDescription.displayName = "ToastDescription";

const ToastCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClose: () => void;
    status: string;
  }
>(({ onClose, status, className, ...props }, ref) => {
  if (status === "loading") return null;
  return (
    <button
      ref={ref}
      onClick={onClose}
      className={cn(
        "rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
});
ToastCloseButton.displayName = "ToastCloseButton";

type ToastLoaderProps = {
  status: string;
  variant?: ToastParams["loaderVariant"];
  className?: string;
};

const ToastLoader = ({
  status,
  variant = "loader-1",
  className,
}: ToastLoaderProps) => {
  if (status !== "loading") return null;
  const baseClass = "animate-spin size-4 text-black";

  return variant === "loader-2" ? (
    <LoaderCircle size={"sm"} className={cn(baseClass, className)} />
  ) : (
    <Loader size={"sm"} className={cn(baseClass, className)} />
  );
};

ToastLoader.displayName = "ToastLoader";

const ToastProgressBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    duration?: number;
    status: ToastParams["status"];
  }
>(({ duration, status, className, ...props }, ref) => {
  if (!duration || status === "loading") return null;
  return (
    <div
      ref={ref}
      className={cn(progressBarVariants({ status }), className)}
      style={{
        animation: `shrink ${duration}ms linear forwards`,
      }}
      {...props}
    >
      <style>
        {`
          @keyframes shrink {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
    </div>
  );
});
ToastProgressBar.displayName = "ToastProgressBar";

export function Toast({
  closable,
  description,
  duration,
  onClose,
  title,
  status = "default",
  loaderVariant,
  classNames = {},
}: ToastParams & { classNames?: ToastClassNames }) {
  return (
    <div
      className={cn(
        toastVariants({ status }),
        classNames[status as keyof ToastClassNames]
      )}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex items-center w-full">
        <ToastLoader
          status={status}
          className={cn("mr-2", classNames.loader)}
          variant={loaderVariant}
        />
        <ToastTitle title={title} className={classNames.title} />
        {closable && (
          <ToastCloseButton
            onClose={onClose!}
            status={status}
            className={classNames.closeButton}
          />
        )}
      </div>

      <ToastDescription
        description={description}
        status={status}
        className={classNames.description}
      />
      <ToastProgressBar
        duration={duration}
        status={status}
        className={classNames.progressBar}
      />
    </div>
  );
}
