"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Loader, LoaderCircle, LoaderPinwheel, X } from "lucide-react";

import { ToastParams } from "./toast-provider";

export const statusStyles = {
  error:
    "dark:bg-red-900/20 bg-red-100/50 text-red-900 dark:text-red-200 dark:border-red-800 border-red-200",
  warning:
    "dark:bg-yellow-900/20 bg-yellow-100/50 text-yellow-900 dark:text-yellow-200 dark:border-yellow-800 border-yellow-200",
  success:
    "dark:bg-green-900/20 bg-green-100/50 text-green-900 dark:text-green-200 dark:border-green-800 border-green-200",
  info: "dark:bg-blue-900/20 bg-blue-100/50 text-blue-900 dark:text-blue-200 dark:border-blue-800 border-blue-200",
  default:
    "dark:bg-gray-800/50 bg-white/80 text-gray-900 dark:text-gray-200 dark:border-gray-800 border-gray-200",
  loading:
    "bg-white/80 text-gray-900 border-gray-200 dark:bg-white/80 dark:text-gray-900 ",
} as const;

const toastVariants = cva(
  "relative flex w-full flex-col gap-1 rounded-lg border px-4 py-3 overflow-hidden shadow-lg backdrop-blur-sm",
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
      error: "dark:bg-red-400 bg-red-600",
      warning: "bg-yellow-600",
      success: "bg-green-600",
      info: "bg-blue-600",
      default: "bg-gray-600",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

const ToastTitle = ({ title }: { title: string }) => {
  return (
    <p className="leading-none text-sm mr-auto font-normal tracking-tight">
      {title}
    </p>
  );
};

const ToastDescription = ({
  description,
  status,
}: {
  description?: ToastParams["description"];
  status: ToastParams["status"];
}) => {
  if (!description || status === "loading") return null;
  return <p className="text-sm opacity-80">{description}</p>;
};

const ToastCloseButton = ({
  onClose,
  status,
}: {
  onClose: () => void;
  status: string;
}) => {
  if (status === "loading") return null;
  return (
    <button
      onClick={onClose}
      className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
};

const ToastLoader = ({
  status,
  variant = "loader-1",
  className,
}: {
  status: string;
  variant?: ToastParams["loaderVariant"];
  className?: string;
}) => {
  if (status !== "loading") return null;

  const baseClass = "animate-spin size-4 text-black";

  if (variant === "loader-2") {
    return <LoaderCircle size={"sm"} className={cn(baseClass, className)} />;
  }
  if (variant === "loader-3") {
    return <LoaderPinwheel size={"sm"} className={cn(baseClass, className)} />;
  }

  return <Loader size={"sm"} className={cn(baseClass, className)} />;
};

const ToastProgressBar = ({
  duration,
  status,
}: {
  duration?: number;
  status: ToastParams["status"];
}) => {
  if (!duration || status === "loading") return null;
  return (
    <div
      className={cn(progressBarVariants({ status }))}
      style={{
        animation: `shrink ${duration}ms linear forwards`,
      }}
    >
      <style>
        {`
          @keyframes shrink {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export function Toast({
  closable,
  description,
  duration,
  onClose,
  title,
  status = "default",
  loaderVariant,
}: ToastParams) {
  return (
    <div
      className={toastVariants({ status })}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex items-center w-full">
        <ToastLoader status={status} className="mr-2" variant={loaderVariant} />
        <ToastTitle title={title} />
        {closable && <ToastCloseButton onClose={onClose!} status={status} />}
      </div>
      <ToastDescription description={description} status={status} />
      <ToastProgressBar duration={duration} status={status} />
    </div>
  );
}
