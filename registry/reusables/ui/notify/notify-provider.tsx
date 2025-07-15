"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { Toast } from "./notify"
import { PromiseHandler, toast } from "./notify-utils"

export type AnimationType = "slide" | "fade" | "scale" | "bounce"

export const DEFAULT_CONFIG = {
  duration: 4000,
  position: "bottom-right",
  closable: true,
  preventDuplicates: false,
  maxToast: 4,
  hideProgressBar: false,
  animation: "slide" as AnimationType,
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
  paused: boolean
  position?: ToastPosition
}

export interface Action {
  label: string
  onClick: () => void
  variant?: "button" | "icon"
  icon?: React.ReactNode
}

export interface Action {
  label: string
  onClick: () => void
}

export interface ToastParams {
  title?: React.ReactNode
  text?: React.ReactNode
  description?: React.ReactNode
  duration?: number
  id?: string
  onClose?: () => void
  status?: "error" | "warning" | "success" | "info" | "default" | "loading"
  loaderVariant?: "loader-1" | "loader-2"
  position?: ToastPosition
  closable?: boolean
  hideProgressBar?: boolean
  preventDuplicates?: boolean
  maxToast?: number
  actions?: {
    primary: Action
    dismiss?: Omit<Action, "onClick"> & { onClick?: () => void }
  }
  classNames?: ToastClassNames
  animation?: AnimationType
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

export interface ToastPromiseOptions<T> {
  loading: string
  success: (data: T) => string
  error?: string
  position?: ToastPosition
  duration?: number
  classNames?: ToastClassNames
  animation?: AnimationType
}

// ID Generator
let toastId = 0
const generateId = () => String(toastId++)

export interface ToastProviderProps {
  children: React.ReactNode
  position?: ToastPosition
  duration?: number
  classNames?: ToastClassNames
  closable?: boolean
  preventDuplicates?: boolean
  maxToast?: number
  hideProgressBar?: boolean
  animation?: AnimationType
}

export function ToastProvider({
  children,
  position: defaultPosition = DEFAULT_CONFIG.position,
  duration = DEFAULT_CONFIG.duration,
  classNames = {},
  closable = DEFAULT_CONFIG.closable,
  preventDuplicates = DEFAULT_CONFIG.preventDuplicates,
  maxToast = DEFAULT_CONFIG.maxToast,
  hideProgressBar = DEFAULT_CONFIG.hideProgressBar,
  animation = DEFAULT_CONFIG.animation,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastState[]>([])
  const toastsRef = useRef<
    Record<
      string,
      {
        timeout: NodeJS.Timeout
        remaining: number
        startTime: number
        onClose?: () => void
      }
    >
  >({})

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

  // Optimized grouping of toasts by position
  const toastsByPosition = useMemo(() => {
    const positions = {} as Record<string, ToastState[]>
    for (const toast of toasts) {
      const position = toast.params.position ?? defaultPosition
      positions[position!] = positions[position!] || []
      positions[position!].push(toast)
    }
    return positions
  }, [
    toasts,
    defaultPosition,
    dismiss,
    duration,
    classNames,
    closable,
    preventDuplicates,
    maxToast,
    hideProgressBar,
  ])

  // Using void operator since we only care about the side-effect of setting up handlers
  // and not the returned value from useMemo
  // Define these outside the useMemo to avoid circular dependencies
  const createPush = useCallback(
    (createDismiss: (id: string) => () => void) => {
      return (params: ToastParams) => {
        const id = params.id ?? generateId()
        const toastDuration = params.duration ?? duration

        if (params.preventDuplicates ?? preventDuplicates) {
          const isDuplicate = toasts.some(
            (toast) => toast.params.text === params.text
          )
          if (isDuplicate) return id
        }

        const dismissToast = createDismiss(id)

        setToasts((prev) => {
          const filteredToasts = prev.filter((t) => t.id !== id)
          const newToast = {
            dismiss: dismissToast,
            id,
            params: {
              ...params,
              duration: toastDuration,
              closable: params.closable ?? closable,
              hideProgressBar: params.hideProgressBar ?? hideProgressBar,
              classNames,
              position: params.position ?? defaultPosition,
            },
            paused: false,
          }
          const updatedToasts = [newToast, ...filteredToasts]
          return updatedToasts.slice(0, params.maxToast ?? maxToast)
        })

        if (toastsRef.current[id]) {
          clearTimeout(toastsRef.current[id].timeout)
        }

        if (toastDuration !== Infinity) {
          toastsRef.current[id] = {
            timeout: setTimeout(dismissToast, toastDuration),
            remaining: toastDuration,
            startTime: Date.now(),
            onClose: params.onClose,
          }
        }

        return id
      }
    },
    [
      toasts,
      preventDuplicates,
      duration,
      closable,
      hideProgressBar,
      classNames,
      defaultPosition,
      maxToast,
    ]
  )

  const createPushPromise = useCallback(
    <T,>(
      createPush: (params: ToastParams) => string,
      createDismiss: (id: string) => () => void
    ) => {
      return (promise: () => Promise<T>, options: ToastPromiseOptions<T>) => {
        const id = generateId()
        const dismiss = createDismiss(id)
        const position = options.position
        const toastDuration = options.duration ?? duration
        const toastClassNames = options.classNames ?? classNames
        const toastAnimation = options.animation ?? animation

        createPush({
          status: "loading",
          text: options.loading,
          id,
          position,
          classNames: toastClassNames,
          duration: toastDuration,
          animation: toastAnimation,
        })

        promise()
          .then((data) => {
            // Clear any existing timeout
            if (toastsRef.current[id]) {
              clearTimeout(toastsRef.current[id].timeout)
            }

            setToasts((prev) => [
              {
                dismiss,
                id,
                params: {
                  status: "success",
                  text: options.success(data),
                  duration: toastDuration, // Reset full duration
                  closable: true,
                  classNames: toastClassNames,
                  position,
                  hideProgressBar: hideProgressBar,
                  animation: toastAnimation,
                },
                paused: false,
              },
              ...prev.filter((t) => t.id !== id),
            ])

            // Set new timeout with full duration
            if (toastDuration !== Infinity) {
              toastsRef.current[id] = {
                timeout: setTimeout(dismiss, toastDuration),
                remaining: toastDuration,
                startTime: Date.now(),
              }
            }
          })
          .catch(() => {
            // Clear any existing timeout
            if (toastsRef.current[id]) {
              clearTimeout(toastsRef.current[id].timeout)
            }

            setToasts((prev) => [
              {
                dismiss,
                id,
                params: {
                  status: "error",
                  text: options.error ?? "Error",
                  duration: toastDuration, // Reset full duration
                  classNames: toastClassNames,
                  position,
                  hideProgressBar: hideProgressBar,
                  animation: toastAnimation,
                },
                paused: false,
              },
              ...prev.filter((t) => t.id !== id),
            ])

            // Set new timeout with full duration
            if (toastDuration !== Infinity) {
              toastsRef.current[id] = {
                timeout: setTimeout(dismiss, toastDuration),
                remaining: toastDuration,
                startTime: Date.now(),
              }
            }
          })

        return id
      }
    },
    [duration, classNames, animation, hideProgressBar]
  )

  // Initialize toast methods
  useMemo(() => {
    const createDismiss = (id: string) => () => {
      dismiss(id)
    }

    // Use the callback functions created outside the useMemo to avoid circular dependencies
    const push = createPush(createDismiss)
    const pushPromise = createPushPromise(push, createDismiss)

    toast.setHandlers(push, pushPromise as PromiseHandler, dismiss)

    return { push, pushPromise }
  }, [dismiss, createPush, createPushPromise])

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

  useEffect(() => {
    return () => {
      Object.values(toastsRef.current).forEach((toast) =>
        clearTimeout(toast.timeout)
      )
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
            <AnimatePresence mode="popLayout">
              {positionToasts.map((toast) => {
                const { id, dismiss, params, paused } = toast
                const toastAnimation = params.animation || animation
                const toastPosition = (params.position ||
                  position) as ToastPosition
                const isTop = toastPosition?.includes("top")
                const isRight = toastPosition?.includes("right")

                // Select animation variants based on the animation type
                let initial, animate, exit

                switch (toastAnimation) {
                  case "slide":
                    initial = { opacity: 0, x: isRight ? 100 : -100 }
                    animate = { opacity: 1, x: 0 }
                    exit = { opacity: 0, x: isRight ? 100 : -100 }
                    break
                  case "fade":
                    initial = { opacity: 0 }
                    animate = { opacity: 1 }
                    exit = { opacity: 0 }
                    break
                  case "scale":
                    initial = { opacity: 0, scale: 0.85 }
                    animate = { opacity: 1, scale: 1 }
                    exit = { opacity: 0, scale: 0.85 }
                    break
                  case "bounce":
                    initial = { opacity: 0, scale: 0.5 }
                    animate = { opacity: 1, scale: 1 }
                    exit = { opacity: 0, scale: 0.5 }
                    break
                  default:
                    initial = { opacity: 0, y: isTop ? -80 : 80 }
                    animate = { opacity: 1, y: 0 }
                    exit = { opacity: 0, y: isTop ? -80 : 80 }
                }

                return (
                  <motion.div
                    key={id}
                    layout
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={
                      toastAnimation === "bounce" ?
                        { type: "spring", stiffness: 400, damping: 25 }
                      : { type: "spring", stiffness: 300, damping: 30 }
                    }
                    className="pointer-events-auto mb-3.5 w-full last:mb-0"
                    style={{
                      zIndex:
                        positionToasts.length - positionToasts.indexOf(toast),
                    }}
                    onMouseEnter={() => pauseToast(id)}
                    onMouseLeave={() => resumeToast(id)}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.5}
                    onDragEnd={(_, info) => {
                      const threshold = 80
                      const { x, y } = info.offset

                      if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
                        dismiss()
                      }
                    }}
                  >
                    <Toast {...params} onClose={dismiss} paused={paused} />
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
