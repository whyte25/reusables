"use client"

import { FC, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

import useScreenSize from "../hooks/use-screen-size"

export type AnimationEaseType =
  | "easeInOut"
  | "easeIn"
  | "easeOut"
  | "linear"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"

export type CardSizeType = "standard" | "featured"

interface AnimatedCardProps {
  title: string
  description: string
  imgSrc: string
  color: string
  href: string
  linkText?: string
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  className?: string
  imageClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  linkClassName?: string
  animationDuration?: number
  animationEase?: AnimationEaseType
  size?: CardSizeType
}

const AnimatedCard: FC<AnimatedCardProps> = ({
  title,
  description,
  imgSrc,
  color,
  isActive,
  href,
  linkText,
  onMouseEnter,
  onMouseLeave,
  className,
  imageClassName,
  titleClassName,
  descriptionClassName,
  linkClassName,
  animationDuration = 0.5,
  animationEase = "easeInOut",
  size = "featured",
}) => {
  const container = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const { isMobile } = useScreenSize()

  useEffect(() => {
    if (isActive) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isActive, controls])

  return (
    <div
      ref={container}
      onMouseEnter={() => {
        controls.start("visible")
        onMouseEnter()
      }}
      onMouseLeave={() => {
        if (!isActive) {
          controls.start("hidden")
        }
        onMouseLeave()
      }}
      className={className}
      role="group"
      aria-selected={isActive}
    >
      <div
        className={cn(
          "shadow-small 2xsm:px-5 relative cursor-pointer items-start gap-3 overflow-hidden rounded-3xl px-3 py-5 transition-all duration-500 ease-in-out sm:px-5 sm:py-10 md:px-5 md:py-10 md:pt-5 lg:px-5 lg:pb-10",
          size === "featured" ?
            "h-[380px] lg:h-[450px]"
          : "h-[340px] lg:h-[350px]",
          isActive ? "text-white" : "bg-white"
        )}
        style={{
          backgroundColor: isActive ? color : "white",
          borderWidth: "2px",
          borderColor: isActive ? "transparent" : color,
          borderStyle: "solid",
        }}
        tabIndex={0}
      >
        <div className={cn("space-y-3", isMobile ? "w-full" : "w-[60%]")}>
          <h3
            style={{
              color: isActive ? "white" : color,
            }}
            className={cn(
              "not-prose text-start text-xl font-semibold md:text-start md:text-2xl",
              titleClassName
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "not-prose w-10/12 text-pretty pr-1 text-start text-base md:text-lg",
              isActive ? "text-white" : "text-black",
              descriptionClassName
            )}
          >
            {description}
          </p>
        </div>
        <motion.div
          className={cn(
            "not-prose absolute -bottom-5 right-2 block",
            imageClassName
          )}
          animate={controls}
          initial={{ x: "70%", y: "70%", visibility: "hidden" }}
          variants={{
            visible: {
              x: 20,
              y: 0,
              right: isMobile ? 0 : 5,
              visibility: "visible",
            },
            hidden: { x: "70%", y: "70%", visibility: "hidden" },
          }}
          transition={{ duration: animationDuration, ease: animationEase }}
          aria-hidden={!isActive}
        >
          <img
            src={imgSrc}
            alt={`${title} illustration`}
            width={1000}
            height={1000}
            className={cn(
              "transition-all duration-500 ease-in-out",
              size === "featured" ?
                "h-[320px] w-[320px]"
              : "h-[260px] w-[270px]",
              "lg:right-0",
              isMobile &&
                (size === "featured" ?
                  "h-[225px] w-[225px]"
                : "h-[190px] w-[200px]")
            )}
          />
        </motion.div>

        <Link
          href={href}
          scroll={false}
          style={{
            color: isActive ? "white" : color,
          }}
          className={cn(
            "2xsm:left-5 absolute bottom-5 left-3 flex items-center gap-3 text-[13px] font-medium sm:text-base",
            !isMobile && (isActive ? "animate-pulse" : ""),
            linkClassName
          )}
          aria-label={`View ${title} project`}
        >
          {linkText || "View Project"}
          <ArrowRight
            size={18}
            className="hidden sm:block"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  )
}

export default AnimatedCard
