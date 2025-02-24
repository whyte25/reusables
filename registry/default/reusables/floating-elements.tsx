"use client"

import { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const logos = [
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179100/skyLogo_zi6fow.jpg",
    link: "#",
    bgColor: "bg-[#0f0f10]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/wearecasinoLogo_bffqz7.gif",
    link: "#",
    bgColor: "bg-[#023fee]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/pixwinLogo_kmwxzv.svg",
    link: "#",
    bgColor: "bg-[#060d1c]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/wearelotteryLogo_n5fz08.png",
    link: "#",
    bgColor: "bg-[#0e132a]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/socketLogo_ct5obw.png",
    link: "#",
    bgColor: "bg-[#060d1c]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/paysureLogo_pvo0zh.png",
    link: "#",
    bgColor: "bg-[#ffffff]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179064/kudipalLogo_ha6a43.png",
    link: "#",
    bgColor: "bg-[#006fee]",
  },
]

export default function FloatingElementsDemo() {
  return (
    <FloatingElements title="Trusted by" className="py-20">
      {logos.map((logo, i) => (
        <a
          key={i}
          href={logo.link}
          className={cn(
            `relative flex h-36 w-36 items-center justify-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition duration-500 ease-in-out hover:scale-100 sm:hover:scale-110`,
            logo.bgColor
          )}
        >
          <img
            src={logo.img}
            alt={`${logo.link} logo`}
            className="h-28 w-28 object-contain"
          />
        </a>
      ))}
    </FloatingElements>
  )
}

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
