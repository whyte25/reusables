"use client"

import { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface AnimationConfig {
  minDistance?: number
  maxDistance?: number
  duration?: number
  easing?: string
  shouldRandomizeInitialPosition?: boolean
}

interface FloatingElementsProps {
  children: React.ReactNode
  className?: string
  elementClassName?: string
  gridClassName?: string
  titleClassName?: string
  title?: string
  animationConfig?: AnimationConfig
}

const defaultAnimationConfig: AnimationConfig = {
  minDistance: 0,
  maxDistance: 50,
  duration: 3000,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  shouldRandomizeInitialPosition: true,
}

export const FloatingElements = ({
  children,
  className,
  elementClassName,
  gridClassName,
  titleClassName,
  title,
  animationConfig = defaultAnimationConfig,
}: FloatingElementsProps) => {
  const animationFrameIds = useRef<number[]>([])
  const elements = useRef<HTMLElement[]>([])
  const startTimes = useRef<number[]>([])
  const currentPositions = useRef<{ x: number; y: number }[]>([])
  const targetPositions = useRef<{ x: number; y: number }[]>([])

  const config = { ...defaultAnimationConfig, ...animationConfig }

  const generateRandomPosition = useCallback(() => {
    const distance =
      config.minDistance! +
      Math.random() * (config.maxDistance! - config.minDistance!)
    const angle = Math.random() * Math.PI * 2
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }, [config.maxDistance, config.minDistance])

  const animate = useCallback(
    (timestamp: number) => {
      elements.current.forEach((element, index) => {
        if (!startTimes.current[index]) {
          startTimes.current[index] = timestamp
          currentPositions.current[index] = { x: 0, y: 0 }
          targetPositions.current[index] = generateRandomPosition()
        }

        const elapsed = timestamp - startTimes.current[index]
        const progress = Math.min(elapsed / config.duration!, 1)

        if (progress === 1) {
          // Instead of snapping, smoothly transition to the next position
          currentPositions.current[index] = targetPositions.current[index]
          targetPositions.current[index] = generateRandomPosition()
          startTimes.current[index] = timestamp
          return
        }

        // Interpolate between current and target positions
        const current = currentPositions.current[index]
        const target = targetPositions.current[index]
        const x = current.x + (target.x - current.x) * progress
        const y = current.y + (target.y - current.y) * progress

        element.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })

      animationFrameIds.current.push(requestAnimationFrame(animate))
    },
    [config.duration, generateRandomPosition]
  )

  useEffect(() => {
    const elementsArray = Array.from(
      document.querySelectorAll(".floating-element")
    ) as HTMLElement[]

    elements.current = elementsArray
    currentPositions.current = elementsArray.map(() => ({ x: 0, y: 0 }))
    targetPositions.current = elementsArray.map(() => generateRandomPosition())

    if (config.shouldRandomizeInitialPosition) {
      elementsArray.forEach((element, index) => {
        const initialPosition = generateRandomPosition()
        currentPositions.current[index] = initialPosition
        element.style.transform = `translate3d(${initialPosition.x}px, ${initialPosition.y}px, 0)`
      })
    }

    animationFrameIds.current.push(requestAnimationFrame(animate))

    return () => {
      animationFrameIds.current.forEach(cancelAnimationFrame)
      animationFrameIds.current = []
    }
  }, [animate, config.shouldRandomizeInitialPosition, generateRandomPosition])

  return (
    <div
      className={cn(
        "flex w-full max-w-4xl flex-col items-center justify-center space-y-16 overflow-hidden",
        className
      )}
    >
      {title && (
        <h2 className={cn("not-prose text-5xl", titleClassName)}>{title}</h2>
      )}
      <div
        className={cn(
          "mx-auto grid w-full grid-cols-2 place-items-center gap-6 md:grid-cols-3 lg:grid-cols-4",
          gridClassName
        )}
      >
        {Array.isArray(children) ?
          children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "floating-element transition-transform",
                elementClassName
              )}
              style={{ transitionTimingFunction: config.easing }}
            >
              {child}
            </div>
          ))
        : <div
            className={cn(
              "floating-element transition-transform",
              elementClassName
            )}
            style={{ transitionTimingFunction: config.easing }}
          >
            {children}
          </div>
        }
      </div>
    </div>
  )
}
