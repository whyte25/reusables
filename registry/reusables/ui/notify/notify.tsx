"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Loader, LoaderCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"

import type { ToastClassNames, ToastParams } from "./notify-provider"

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
} as const

const toastVariants = cva(
  "relative flex w-full flex-col gap-1 overflow-hidden rounded-lg border p-[0.75rem] shadow-lg",
  {
    variants: {
      status: statusStyles,
    },
    defaultVariants: {
      status: "default",
    },
  }
)

const progressBarVariants = cva("absolute bottom-0 left-0 h-[2px]", {
  variants: {
    status: {
      error: "bg-red-600 dark:bg-[#f77a6f]",
      warning: "bg-yellow-500 dark:bg-[#fabe20]",
      success: "bg-green-600 dark:bg-[#12f0a5]",
      info: "bg-blue-600 dark:bg-[#7898ff]",
      default: "bg-gray-600 dark:bg-[#e4e5e9]",
    },
  },
  defaultVariants: {
    status: "default",
  },
})

const toastActionVariants = cva(
  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-black hover:bg-white/90 dark:text-black dark:hover:bg-white/90",
        dismiss: "bg-transparent hover:bg-black/10 dark:hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { text: React.ReactNode }
>(({ text, className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mr-auto text-sm font-medium", className)}
    {...props}
  >
    {text}
  </p>
))

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    description?: ToastParams["description"]
    status: ToastParams["status"]
  }
>(({ description, status, className, ...props }, ref) => {
  if (!description || status === "loading") return null
  return (
    <p
      ref={ref}
      className={cn("text-[0.8125rem] leading-5 opacity-80", className)}
      {...props}
    >
      {description}
    </p>
  )
})

const ToastCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClose: () => void
    status: string
  }
>(({ onClose, status, className, ...props }, ref) => {
  if (status === "loading") return null
  return (
    <button
      ref={ref}
      onClick={onClose}
      className={cn(
        "cursor-pointer rounded-sm p-1 opacity-90 ring-offset-background transition-opacity hover:bg-black/5 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:opacity-70 dark:hover:bg-white/10",
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  )
})

type ToastLoaderProps = {
  status: string
  variant?: ToastParams["loaderVariant"]
  className?: string
}

const ToastLoader = ({
  status,
  variant = "loader-1",
  className,
}: ToastLoaderProps) => {
  if (status !== "loading") return null
  const baseClass = "animate-spin size-4 text-black"

  return variant === "loader-2" ?
      <LoaderCircle className={cn(baseClass, className)} />
    : <Loader className={cn(baseClass, className)} />
}

const ToastProgressBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    duration?: number
    status: ToastParams["status"]
    hideProgressBar?: boolean
    paused?: boolean
  }
>(({ duration, status, hideProgressBar, className, paused, ...props }, ref) => {
  if (!duration || status === "loading" || hideProgressBar) return null
  return (
    <div
      ref={ref}
      className={cn(progressBarVariants({ status }), className)}
      style={{
        animation: `shrink ${duration}ms linear forwards`,
        animationPlayState: paused ? "paused" : "running",
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
  )
})

export function ToastAction({
  label,
  onClick,
  variant,
  status,
}: {
  label: string
  onClick: () => void
  variant: "primary" | "dismiss"
  status: ToastParams["status"]
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        toastActionVariants({ variant }),
        status === "default" &&
          variant === "primary" &&
          "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
      )}
    >
      {label}
    </button>
  )
}

// Animation variants are now handled directly in the Toast provider

export function Toast({
  closable,
  description,
  duration,
  onClose,
  text,
  title,
  status = "default",
  loaderVariant,
  classNames = {},
  hideProgressBar,
  actions,
  paused,
  animation = "slide",
  position,
}: ToastParams & { classNames?: ToastClassNames; paused?: boolean }) {
  return (
    <div
      className={cn(
        toastVariants({ status }),
        classNames[status as keyof ToastClassNames]
      )}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex w-full items-center justify-between">
        <ToastLoader
          status={status}
          className={cn("mr-2", classNames.loader)}
          variant={loaderVariant}
        />
        <div className="flex flex-1 flex-col gap-1">
          <ToastTitle text={text ?? title} className={classNames.title} />
          <ToastDescription
            description={description}
            status={status}
            className={classNames.description}
          />
        </div>
        {closable && !actions && (
          <ToastCloseButton
            onClose={onClose!}
            status={status}
            className={cn("ml-2", classNames.closeButton)}
          />
        )}
      </div>
      {actions && (
        <div className="mt-3 flex justify-end gap-2">
          {actions.dismiss && (
            <ToastAction
              label={actions.dismiss.label}
              onClick={actions.dismiss.onClick || onClose!}
              variant="dismiss"
              status={status}
            />
          )}
          <ToastAction
            label={actions.primary.label}
            onClick={actions.primary.onClick}
            variant="primary"
            status={status}
          />
        </div>
      )}
      <ToastProgressBar
        duration={duration}
        status={status}
        hideProgressBar={hideProgressBar}
        className={classNames.progressBar}
        paused={paused}
      />
    </div>
  )
}

ToastTitle.displayName = "ToastTitle"
ToastDescription.displayName = "ToastDescription"
ToastCloseButton.displayName = "ToastCloseButton"
ToastLoader.displayName = "ToastLoader"
ToastProgressBar.displayName = "ToastProgressBar"
