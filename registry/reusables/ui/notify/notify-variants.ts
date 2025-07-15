"use client"

import { cva } from "class-variance-authority"

/**
 * Toast positioning variants for different screen positions
 * Defines positioning classes for each toast location option
 */
export const toastPositionVariants = cva(
  "absolute w-full max-w-[420px] p-4 md:p-8",
  {
    variants: {
      position: {
        "top-left": "left-0 top-0 md:top-0",
        "top-center": "left-1/2 top-0 -translate-x-1/2 transform md:top-0",
        "top-right": "right-0 top-0 md:top-0",
        "bottom-left": "bottom-0 left-0 md:bottom-0",
        "bottom-center":
          "bottom-0 left-1/2 -translate-x-1/2 transform md:bottom-0",
        "bottom-right": "bottom-0 right-0 md:bottom-0",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
)

/**
 * Toast type variants for different notification types
 * Defines style classes for success, error, warning, etc.
 */
export const toastTypeVariants = cva("toast-base", {
  variants: {
    type: {
      success: "toast-success",
      error: "toast-error",
      warning: "toast-warning",
      info: "toast-info",
      loading: "toast-loading",
      default: "toast-default",
    },
  },
  defaultVariants: {
    type: "default",
  },
})

/**
 * Status styles for different notification types
 * Defines style classes for success, error, warning, etc.
 */
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

/**
 * Toast variants for different notification types
 * Defines style classes for success, error, warning, etc.
 */
export const toastVariants = cva(
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

/**
 * Toast progress bar variants for different notification types
 * Defines style classes for success, error, warning, etc.
 */
export const progressBarVariants = cva("absolute bottom-0 left-0 h-[2px]", {
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

/**
 * Toast action variants for different notification types
 * Defines style classes for success, error, warning, etc.
 */
export const toastActionVariants = cva(
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
