"use client"

import * as React from "react"
import { Loader, LoaderCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"

import { ToastClassNames, ToastParams } from "./notify-types"
import {
  progressBarVariants,
  toastActionVariants,
  toastVariants,
} from "./notify-variants"

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

/**
 * Renders a toast notification with optional title, description, actions, loader, close button, and progress bar.
 *
 * Supports different visual styles and behaviors based on the toast status, duration, and provided actions. The toast can display a loading indicator, be closable, and show a progress bar unless hidden. Action buttons for primary and dismiss actions are supported.
 */

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
