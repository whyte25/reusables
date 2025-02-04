"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Loader, LoaderCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"

import { ToastClassNames, ToastParams } from "./notify-provider"

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

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { title: string }
>(({ title, className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mr-auto text-[0.8125rem] font-medium leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {title}
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
      className={cn("text-[0.8125rem] opacity-80", className)}
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
        "rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
  }
>(({ duration, status, hideProgressBar, className, ...props }, ref) => {
  if (!duration || status === "loading" || hideProgressBar) return null
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
  )
})

export function Toast({
  closable,
  description,
  duration,
  onClose,
  title,
  status = "default",
  loaderVariant,
  classNames = {},
  hideProgressBar,
}: ToastParams & { classNames?: ToastClassNames }) {
  return (
    <div
      className={cn(
        toastVariants({ status }),
        classNames[status as keyof ToastClassNames]
      )}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex w-full items-center">
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
        hideProgressBar={hideProgressBar}
        className={classNames.progressBar}
      />
    </div>
  )
}
Toast.displayName = "Toast"
ToastTitle.displayName = "ToastTitle"
ToastDescription.displayName = "ToastDescription"
ToastCloseButton.displayName = "ToastCloseButton"
ToastLoader.displayName = "ToastLoader"
ToastProgressBar.displayName = "ToastProgressBar"
