"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

import { Toast } from "./notify"
import { getAnimationProps } from "./notify-animations"
import { DEFAULT_CONFIG } from "./notify-config"
import { useToastStateManager } from "./notify-state-manager"
import type {
  PromiseHandler,
  ToastPosition,
  ToastProviderProps,
} from "./notify-types"
import { toast } from "./notify-utils"
import { toastPositionVariants } from "./notify-variants"

/**
 * Renders its children into a React portal attached to the document body, ensuring client-side mounting.
 *
 * @param children - The content to render inside the portal
 * @returns The portal element containing the children, or `null` if not yet mounted
 */
function ToastPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? createPortal(children, document.body) : null
}

/**
 * Provides toast notification functionality to its child components.
 *
 * Wraps the application to enable toast notifications, managing their state, display, animation, and dismissal. Renders toasts in a portal at the document body level, supporting configuration for position, duration, appearance, animation, and duplicate prevention.
 *
 * @param children - The components that will have access to toast notifications.
 */
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
  const {
    toastsByPosition,
    push,
    pushPromise,
    dismiss,
    pauseToast,
    resumeToast,
  } = useToastStateManager({
    position: defaultPosition,
    duration,
    classNames,
    closable,
    preventDuplicates,
    maxToast,
    hideProgressBar,
    animation,
  })

  // Register the toast handlers
  useEffect(() => {
    toast.setHandlers(push, pushPromise as PromiseHandler, dismiss)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toastContainer = (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
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
              const { id, dismiss: dismissToast, params, paused } = toast
              const toastAnimation = params.animation || animation
              const toastPosition = params.position || position

              const animationProps = getAnimationProps(
                toastAnimation,
                toastPosition as ToastPosition
              )

              return (
                <motion.div
                  key={id}
                  layout
                  {...animationProps}
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
                    const threshold = 0
                    const { x, y } = info.offset
                    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
                      dismiss(id)
                    }
                  }}
                >
                  <Toast
                    {...params}
                    onClose={() => dismiss(id)}
                    paused={paused}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )

  return (
    <>
      {children}
      <ToastPortal>{toastContainer}</ToastPortal>
    </>
  )
}
