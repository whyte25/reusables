"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import type {
  AnimationType,
  ToastParams,
  ToastPromiseOptions,
  ToastProviderProps,
  ToastState,
  ToastTimeoutRef,
} from "./notify-types"
import { generateId } from "./notify-utils"

/**
 * Custom hook for managing toast state and notifications
 * Provides functions for creating, updating, and dismissing toast notifications
 *
 * @param config Configuration options for toast state management
 * @returns Toast state manager with functions for toast operations
 */
export function useToastStateManager({
  position: defaultPosition = "bottom-right",
  duration: defaultDuration = 4000,
  classNames: defaultClassNames = {},
  closable: defaultClosable = true,
  preventDuplicates: defaultPreventDuplicates = false,
  maxToast: defaultMaxToast = 4,
  hideProgressBar: defaultHideProgressBar = false,
  animation: defaultAnimation = "slide",
}: Omit<ToastProviderProps, "children">) {
  const [toasts, setToasts] = useState<ToastState[]>([])
  const toastsRef = useRef<Record<string, ToastTimeoutRef>>({})

  // Toast dismissal function
  const dismiss = useCallback((id: string | number) => {
    setToasts((prev) => prev.filter((t) => t.id !== String(id)))
    const toast = toastsRef.current[String(id)]
    if (toast) {
      clearTimeout(toast.timeout)
      if (toast.onClose) {
        toast.onClose()
      }
      delete toastsRef.current[String(id)]
    }
  }, [])

  // Create a function to generate a dismiss handler for a specific toast ID
  const createDismiss = useCallback(
    (id: string) => () => dismiss(id),
    [dismiss]
  )

  // Push a new toast notification
  const push = useCallback(
    (params: ToastParams) => {
      const id = params.id ?? generateId()
      const toastDuration = params.duration ?? defaultDuration

      const dismissToast = createDismiss(id)

      // Update the toast state using a functional update to prevent stale state
      setToasts((prevToasts) => {
        // Handle duplicate prevention
        if (params.preventDuplicates ?? defaultPreventDuplicates) {
          const isDuplicate = prevToasts.some(
            (toast) =>
              toast.params.text === params.text &&
              toast.params.status === params.status
          )
          if (isDuplicate) {
            return prevToasts
          }
        }

        const filteredToasts = prevToasts.filter((t) => t.id !== id)
        const newToast: ToastState = {
          dismiss: dismissToast,
          id,
          params: {
            ...params,
            duration: toastDuration,
            closable: params.closable ?? defaultClosable,
            hideProgressBar: params.hideProgressBar ?? defaultHideProgressBar,
            classNames: params.classNames ?? defaultClassNames,
            position: params.position ?? defaultPosition,
            animation: (params.animation ?? defaultAnimation) as AnimationType,
          },
          paused: false,
        }

        const updatedToasts = [newToast, ...filteredToasts]
        return updatedToasts.slice(0, params.maxToast ?? defaultMaxToast)
      })

      // Clear any existing timeout for this toast ID
      if (toastsRef.current[id]) {
        clearTimeout(toastsRef.current[id].timeout)
      }

      // Set a new timeout if duration is finite
      if (toastDuration !== Infinity) {
        toastsRef.current[id] = {
          timeout: setTimeout(dismissToast, toastDuration),
          remaining: toastDuration,
          startTime: Date.now(),
          onClose: params.onClose,
        }
      }

      return id
    },
    [
      defaultPreventDuplicates,
      defaultDuration,
      defaultClosable,
      defaultHideProgressBar,
      defaultClassNames,
      defaultPosition,
      defaultMaxToast,
      defaultAnimation,
      createDismiss,
    ]
  )

  // Handle promise-based toasts
  const pushPromise = useCallback(
    <T>(promise: () => Promise<T>, options: ToastPromiseOptions<T>) => {
      const id = generateId()
      const dismiss = createDismiss(id)
      const position = options.position
      const toastDuration = options.duration ?? defaultDuration
      const toastClassNames = options.classNames ?? defaultClassNames
      const toastAnimation = options.animation ?? defaultAnimation

      // Show loading toast
      push({
        status: "loading",
        text: options.loading,
        id,
        position,
        classNames: toastClassNames,
        duration: toastDuration,
        animation: toastAnimation,
      })

      // Handle promise resolution and rejection
      promise()
        .then((data) => {
          // Clear existing timeout
          if (toastsRef.current[id]) {
            clearTimeout(toastsRef.current[id].timeout)
          }

          // Update with success state
          setToasts((prev) => [
            {
              dismiss,
              id,
              params: {
                status: "success",
                text: options.success(data),
                duration: toastDuration,
                closable: true,
                classNames: toastClassNames,
                position,
                hideProgressBar: defaultHideProgressBar,
                animation: toastAnimation,
              },
              paused: false,
            },
            ...prev.filter((t) => t.id !== id),
          ])

          // Set new timeout
          if (toastDuration !== Infinity) {
            toastsRef.current[id] = {
              timeout: setTimeout(dismiss, toastDuration),
              remaining: toastDuration,
              startTime: Date.now(),
            }
          }
        })
        .catch(() => {
          // Clear existing timeout
          if (toastsRef.current[id]) {
            clearTimeout(toastsRef.current[id].timeout)
          }

          // Update with error state
          setToasts((prev) => [
            {
              dismiss,
              id,
              params: {
                status: "error",
                text: options.error ?? "Error",
                duration: toastDuration,
                classNames: toastClassNames,
                position,
                hideProgressBar: defaultHideProgressBar,
                animation: toastAnimation,
              },
              paused: false,
            },
            ...prev.filter((t) => t.id !== id),
          ])

          // Set new timeout
          if (toastDuration !== Infinity) {
            toastsRef.current[id] = {
              timeout: setTimeout(dismiss, toastDuration),
              remaining: toastDuration,
              startTime: Date.now(),
            }
          }
        })

      return id
    },
    [
      defaultDuration,
      defaultClassNames,
      defaultAnimation,
      defaultHideProgressBar,
      push,
      createDismiss,
    ]
  )

  // Pause a toast (e.g., on mouse hover)
  const pauseToast = useCallback((id: string) => {
    if (toastsRef.current[id]) {
      clearTimeout(toastsRef.current[id].timeout)
      const remaining =
        toastsRef.current[id].remaining -
        (Date.now() - toastsRef.current[id].startTime)
      toastsRef.current[id].remaining = remaining
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, paused: true } : t))
      )
    }
  }, [])

  // Resume a toast
  const resumeToast = useCallback(
    (id: string) => {
      if (toastsRef.current[id]) {
        toastsRef.current[id].startTime = Date.now()
        toastsRef.current[id].timeout = setTimeout(
          () => dismiss(id),
          toastsRef.current[id].remaining
        )
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, paused: false } : t))
        )
      }
    },
    [dismiss]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(toastsRef.current).forEach((toast) =>
        clearTimeout(toast.timeout)
      )
      toastsRef.current = {}
    }
  }, [])

  // Organize toasts by position for efficient rendering
  const toastsByPosition = (() => {
    const positions = {} as Record<string, ToastState[]>
    for (const toast of toasts) {
      const position = toast.params.position ?? defaultPosition
      positions[position!] = positions[position!] || []
      positions[position!].push(toast)
    }
    return positions
  })()

  return {
    toasts,
    toastsByPosition,
    push,
    pushPromise,
    dismiss,
    pauseToast,
    resumeToast,
  }
}
