"use client"

import type { AnimationType, ToastPosition } from "./notify-types"

/**
 * Returns animation configuration objects for toast notifications based on the specified animation type and position.
 *
 * The returned object includes `initial`, `animate`, and `exit` states, as well as transition settings, tailored to the animation style and toast placement.
 *
 * @param animationType - The animation style to use for the toast ("slide", "fade", "scale", "bounce", or others).
 * @param position - The position of the toast, which determines the direction of certain animations.
 * @returns An object containing animation state definitions and transition parameters for use with animation libraries.
 */
export function getAnimationProps(
  animationType: AnimationType,
  position: ToastPosition
) {
  const isTop = position?.toString().includes("top")
  const isRight = position?.toString().includes("right")

  switch (animationType) {
    case "slide":
      return {
        initial: { opacity: 0, x: isRight ? 100 : -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: isRight ? 100 : -100 },
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }
    case "fade":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }
    case "scale":
      return {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.85 },
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }
    case "bounce":
      return {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 },
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }
    default:
      return {
        initial: { opacity: 0, y: isTop ? -80 : 80 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: isTop ? -80 : 80 },
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }
  }
}
