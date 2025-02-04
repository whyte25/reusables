"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { statusStyles, Toast } from "./notify"
import { toast } from "./notify-utils"

export const DEFAULT_CONFIG = {
  duration: 4000,
  position: "bottom-right",
  closable: true,
  preventDuplicates: false,
  maxToast: 4,
  hideProgressBar: false,
} as const

const toastPositionVariants = cva("absolute w-full max-w-[420px] p-4 md:p-8", {
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
    position: DEFAULT_CONFIG.position,
  },
})

type ToastPosition = VariantProps<typeof toastPositionVariants>["position"]

interface ToastState {
  dismiss: () => void
  id: string
  params: ToastParams
  position?: ToastPosition
}

export interface ToastParams {
  closable?: boolean
  classNames?: ToastClassNames
  description?: React.ReactNode
  duration?: number
  id?: string
  onClose?: () => void
  title: string
  status?: "error" | "warning" | "success" | "info" | "default" | "loading"
  loaderVariant?: "loader-1" | "loader-2"
  position?: ToastPosition
  hideProgressBar?: boolean
  preventDuplicates?: boolean
  maxToast?: number
}

export interface ToastPromiseOptions<T> {
  loading: string
  success: (data: T) => string
  error?: string
  position?: ToastPosition
  duration?: number
  classNames?: ToastClassNames
}

export interface ToastClassNames {
  error?: string
  success?: string
  warning?: string
  info?: string
  loading?: string
  closeButton?: string
  title?: string
  description?: string
  loader?: string
  progressBar?: string
  containerClassName?: string
}

// ID Generator
let toastId = 0
const generateId = () => String(toastId++)

// Add this interface before the ToastProvider component
export interface ToastProviderProps {
  children: React.ReactNode
  position?: ToastPosition
  duration?: number
  classNames?: ToastClassNames
  closable?: boolean
  preventDuplicates?: boolean
  maxToast?: number
  hideProgressBar?: boolean
}

// Provider Component
export function ToastProvider({
  children,
  position: defaultPosition = DEFAULT_CONFIG.position,
  duration = DEFAULT_CONFIG.duration,
  classNames = {},
  closable = DEFAULT_CONFIG.closable,
  preventDuplicates = DEFAULT_CONFIG.preventDuplicates,
  maxToast = DEFAULT_CONFIG.maxToast,
  hideProgressBar = DEFAULT_CONFIG.hideProgressBar,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastState[]>([])
  const toastsRef = useRef<{ [key: string]: NodeJS.Timeout }>({})

  // Optimized grouping of toasts by position
  const toastsByPosition = useMemo(() => {
    const positions = {} as Record<string, ToastState[]>
    for (const toast of toasts) {
      const position = toast.params.position ?? defaultPosition
      positions[position!] = positions[position!] || []
      positions[position!].push(toast)
    }
    return positions
  }, [toasts, defaultPosition])

  // Using void operator since we only care about the side-effect of setting up handlers
  // and not the returned value from useMemo
  void useMemo(() => {
    const createDismiss = (id: string) => () => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      if (toastsRef.current[id]) {
        clearTimeout(toastsRef.current[id])
        delete toastsRef.current[id]
      }
    }

    const push = (params: ToastParams) => {
      const id = params.id ?? generateId()
      const toastDuration = params.duration ?? duration

      // Check for duplicates if preventDuplicates is enabled
      if (params.preventDuplicates ?? preventDuplicates) {
        const isDuplicate = toasts.some(
          (toast) => toast.params.title === params.title
        )
        if (isDuplicate) return id
      }

      const dismiss = createDismiss(id)

      setToasts((prev) => {
        // Remove oldest toasts if exceeding maxToast
        const filteredToasts = prev.filter((t) => t.id !== id)
        const newToast = {
          dismiss,
          id,
          params: {
            ...params,
            duration: toastDuration,
            closable: params.closable ?? closable,
            hideProgressBar: params.hideProgressBar ?? hideProgressBar,
            classNames,
            position: params.position ?? defaultPosition,
          },
        }

        const updatedToasts = [newToast, ...filteredToasts]
        return updatedToasts.slice(0, params.maxToast ?? maxToast)
      })

      if (toastsRef.current[id]) {
        clearTimeout(toastsRef.current[id])
      }

      if (toastDuration !== Infinity) {
        toastsRef.current[id] = setTimeout(dismiss, toastDuration)
      }

      return id
    }

    const pushPromise = <T,>(
      promise: () => Promise<T>,
      options: ToastPromiseOptions<T>
    ) => {
      const id = generateId()
      const dismiss = createDismiss(id)
      const position = options.position
      const toastDuration = options.duration ?? duration
      const toastClassNames = options.classNames ?? classNames

      push({
        status: "loading",
        title: options.loading,
        id,
        position,
        classNames: toastClassNames,
        duration: toastDuration,
      })

      promise()
        .then((data) => {
          // Clear any existing timeout
          if (toastsRef.current[id]) {
            clearTimeout(toastsRef.current[id])
          }

          setToasts((prev) => [
            {
              dismiss,
              id,
              params: {
                status: "success",
                title: options.success(data),
                duration: toastDuration, // Reset full duration
                closable: true,
                classNames: toastClassNames,
                position,
                hideProgressBar: hideProgressBar,
              },
            },
            ...prev.filter((t) => t.id !== id),
          ])

          // Set new timeout with full duration
          if (toastDuration !== Infinity) {
            toastsRef.current[id] = setTimeout(dismiss, toastDuration)
          }
        })
        .catch(() => {
          // Clear any existing timeout
          if (toastsRef.current[id]) {
            clearTimeout(toastsRef.current[id])
          }

          setToasts((prev) => [
            {
              dismiss,
              id,
              params: {
                status: "error",
                title: options.error ?? "Error",
                duration: toastDuration, // Reset full duration
                classNames: toastClassNames,
                position,
                hideProgressBar: hideProgressBar,
              },
            },
            ...prev.filter((t) => t.id !== id),
          ])

          // Set new timeout with full duration
          if (toastDuration !== Infinity) {
            toastsRef.current[id] = setTimeout(dismiss, toastDuration)
          }
        })

      return id
    }

    toast.setHandlers(push, pushPromise)
    return toast
  }, [
    duration,
    classNames,
    closable,
    defaultPosition,
    preventDuplicates,
    maxToast,
    hideProgressBar,
    toasts,
  ])

  useEffect(() => {
    return () => {
      Object.values(toastsRef.current).forEach(clearTimeout)
      toastsRef.current = {}
    }
  }, [])

  return (
    <>
      {children}
      <div
        role="alert"
        aria-live="polite"
        className="pointer-events-none fixed inset-0 z-[999999]"
      >
        {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
          <div
            key={position}
            className={cn(
              toastPositionVariants({
                position: position as ToastPosition,
              }),
              classNames.containerClassName
            )}
          >
            <AnimatePresence>
              {positionToasts.map(({ dismiss, id, params }, index) => {
                const isTop = position?.includes("top")
                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, y: isTop ? -80 : 80, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      y: isTop ? -80 : 80,
                      transition: { duration: 0.2 },
                    }}
                    transition={{}}
                    className="pointer-events-auto mb-3.5 last:mb-0"
                    style={{
                      zIndex: positionToasts.length - index,
                    }}
                  >
                    <Toast {...params} onClose={dismiss} />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  )
}

export { statusStyles, toast }
