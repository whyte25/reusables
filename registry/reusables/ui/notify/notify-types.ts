"use client"

import React from "react"
import { VariantProps } from "class-variance-authority"

import { toastPositionVariants } from "./notify-variants"

/**
 * Available animation types for toast notifications
 */
export type AnimationType = "slide" | "fade" | "scale" | "bounce"

/**
 * Toast position variants derived from the toast position animations
 */
export type ToastPosition = VariantProps<
  typeof toastPositionVariants
>["position"]

/**
 * Action configuration for interactive toast elements
 */
export interface Action {
  /** Text label for the action */
  label: string
  /** Click handler function */
  onClick: () => void
  /** Visual style variant */
  variant?: "button" | "icon"
  /** Optional icon to display */
  icon?: React.ReactNode
}

/**
 * Parameters for configuring a toast notification
 */
export interface ToastParams {
  /** Toast title content */
  title?: React.ReactNode
  /** Main toast message content */
  text?: React.ReactNode
  /** Additional descriptive content */
  description?: React.ReactNode
  /** Duration in milliseconds before auto-dismissal */
  duration?: number
  /** Unique identifier for the toast */
  id?: string
  /** Callback executed when toast is closed */
  onClose?: () => void
  /** Visual status type of the toast */
  status?: "error" | "warning" | "success" | "info" | "default" | "loading"
  /** Visual variant for loading indicator */
  loaderVariant?: "loader-1" | "loader-2"
  /** Screen position for the toast */
  position?: ToastPosition
  /** Whether the toast can be manually closed */
  closable?: boolean
  /** Whether to hide the progress bar */
  hideProgressBar?: boolean
  /** Whether to prevent duplicate toasts with the same content */
  preventDuplicates?: boolean
  /** Maximum number of toasts to show simultaneously */
  maxToast?: number
  /** Interactive action buttons configuration */
  actions?: {
    primary: Action
    dismiss?: Omit<Action, "onClick"> & { onClick?: () => void }
  }
  /** Custom CSS class names for toast elements */
  classNames?: ToastClassNames
  /** Animation style for entry/exit */
  animation?: AnimationType
}

/**
 * CSS class names configuration for toast components
 */
export interface ToastClassNames {
  /** Class for error toast variant */
  error?: string
  /** Class for success toast variant */
  success?: string
  /** Class for warning toast variant */
  warning?: string
  /** Class for info toast variant */
  info?: string
  /** Class for loading toast variant */
  loading?: string
  /** Class for close button */
  closeButton?: string
  /** Class for toast title */
  title?: string
  /** Class for toast description */
  description?: string
  /** Class for loading indicator */
  loader?: string
  /** Class for progress bar */
  progressBar?: string
  /** Class for container element */
  containerClassName?: string
}

/**
 * Options for promise-based toast notifications
 */
export interface ToastPromiseOptions<T> {
  /** Message to show during loading state */
  loading: string
  /** Function to generate success message from resolved data */
  success: (data: T) => string
  /** Message to show on promise rejection */
  error?: string
  /** Screen position for the toast */
  position?: ToastPosition
  /** Duration in milliseconds before auto-dismissal */
  duration?: number
  /** Custom CSS class names */
  classNames?: ToastClassNames
  /** Animation style for entry/exit */
  animation?: AnimationType
}

/**
 * Props for the ToastProvider component
 */
export interface ToastProviderProps {
  /** Child components */
  children: React.ReactNode
  /** Default duration in milliseconds before auto-dismissal */
  duration?: number
  /** Default screen position for toasts */
  position?: ToastPosition
  /** Default CSS class names */
  classNames?: ToastClassNames
  /** Whether toasts are closable by default */
  closable?: boolean
  /** Whether to prevent duplicate toasts by default */
  preventDuplicates?: boolean
  /** Default maximum number of toasts to show simultaneously */
  maxToast?: number
  /** Whether to hide progress bars by default */
  hideProgressBar?: boolean
  /** Default animation style */
  animation?: AnimationType
}

/**
 * Function type for toast creation methods
 */
export type ToastFunction = (
  text: React.ReactNode,
  options?: Partial<ToastParams>
) => string

/**
 * Function type for promise-based toast handlers
 */
export type PromiseHandler = <T>(
  promise: () => Promise<T>,
  options: ToastPromiseOptions<T>
) => string

/**
 * Interface for toast API methods
 */
export interface ToastMethods {
  /** Display a success toast */
  success: ToastFunction
  /** Display an error toast */
  error: ToastFunction
  /** Display a warning toast */
  warning: ToastFunction
  /** Display an info toast */
  info: ToastFunction
  /** Display a loading toast */
  loading: ToastFunction
  /** Display a default toast */
  default: ToastFunction
  /** Create a custom toast */
  push: (params: ToastParams) => string
  /** Create a promise-based toast */
  promise: PromiseHandler
  /** Dismiss a toast by ID */
  dismiss: (id: string | number) => void
}

/**
 * Interface for toast state
 */
export interface ToastState {
  /** Function to dismiss this toast */
  dismiss: () => void
  /** Unique identifier for the toast */
  id: string
  /** Configuration parameters */
  params: ToastParams
  /** Whether toast is currently paused (e.g., during hover) */
  paused: boolean
}

/**
 * Interface for toast state manager
 */
export interface ToastStateManager {
  /** All active toasts */
  toasts: ToastState[]
  /** Toasts organized by position */
  toastsByPosition: Record<string, ToastState[]>
  /** Create a new toast */
  push: (params: ToastParams) => string
  /** Create a promise-based toast */
  pushPromise: <T>(
    promise: () => Promise<T>,
    options: ToastPromiseOptions<T>
  ) => string
  /** Dismiss a toast by ID */
  dismiss: (id: string | number) => void
  /** Pause a toast's timeout */
  pauseToast: (id: string) => void
  /** Resume a toast's timeout */
  resumeToast: (id: string) => void
}

/**
 * Interface for managing toast timeout references
 */
export interface ToastTimeoutRef {
  timeout: NodeJS.Timeout
  remaining: number
  startTime: number
  onClose?: () => void
}
