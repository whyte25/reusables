"use client"

import { useEffect, useState } from "react"
import { cva } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BorderBeam } from "@/registry/reusables/border-beam"

import useScreenSize from "../hooks/use-screen-size"

interface Review {
  id: number | string
  name: string
  avatar: string
  text: string
  rating: number
}

type ThemeColor = "default" | "primary" | "elegant" | "vibrant" | "minimal"

interface AnimatedReviewCardsProps {
  reviews?: Review[]
  interactionType?: "drag" | "click"
  animationDuration?: number
  scaleStep?: number
  verticalSpacing?: number
  horizontalSpacing?: number
  autoRotate?: boolean
  rotateInterval?: number
  theme?: ThemeColor
  showBorderBeam?: boolean
  classNames?: {
    container?: string
    card?: string
    cardContent?: string
    header?: string
    avatar?: string
    name?: string
    text?: string
    rating?: string
    star?: string
    activeStarColor?: string
    inactiveStarColor?: string
  }
}

const cardVariants = cva(
  "absolute h-[300px] w-[300px] overflow-hidden rounded-lg bg-background sm:w-[350px] md:h-[250px] md:w-[550px]",
  {
    variants: {
      theme: {
        default: "border border-border bg-background",
        primary: "bg-primary-50 border border-primary/20",
        elegant: "border border-zinc-800 bg-zinc-950 text-zinc-100",
        vibrant: "bg-gradient-to-br from-pink-500 to-orange-400 text-white",
        minimal: "border bg-white dark:bg-black",
      },
      cursor: {
        drag: "cursor-grab active:cursor-grabbing",
        click: "cursor-pointer",
      },
    },
  }
)

const nameVariants = cva("text-lg font-semibold", {
  variants: {
    theme: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      elegant: "text-zinc-100",
      vibrant: "text-white",
      minimal: "text-foreground",
    },
  },
})

const textVariants = cva("select-none text-start text-sm", {
  variants: {
    theme: {
      default: "text-foreground",
      primary: "text-primary/80",
      elegant: "text-zinc-400",
      vibrant: "text-white/90",
      minimal: "text-muted-foreground",
    },
  },
})

const starColorVariants = {
  default: {
    active: "text-yellow-400 fill-current",
    inactive: "text-muted stroke-muted-foreground/20",
  },
  primary: {
    active: "text-primary",
    inactive: "text-primary/20",
  },
  elegant: {
    active: "text-zinc-200 ",
    inactive: "text-zinc-700",
  },
  vibrant: {
    active: "text-white",
    inactive: "text-white/30",
  },
  minimal: {
    active: "text-yellow-400",
    inactive: "text-muted stroke-muted-foreground/20",
  },
}

export const AnimatedReviewCards = ({
  reviews: initialReviewsProp = [],
  interactionType = "drag",
  animationDuration = 0.3,
  scaleStep = 0.05,
  verticalSpacing = 10,
  horizontalSpacing = 20,
  autoRotate = true,
  rotateInterval = 6000,
  theme = "default",
  showBorderBeam = true,
  classNames,
}: AnimatedReviewCardsProps) => {
  const starColors = starColorVariants[theme]
  const [reviews, setReviews] = useState(initialReviewsProp)
  const [isInteracting, setIsInteracting] = useState(false)
  const { isMobile } = useScreenSize()

  const handleInteraction = (index: number) => {
    setReviews((prevReviews) => {
      const newReviews = [...prevReviews]
      const [removed] = newReviews.splice(index, 1)
      newReviews.push(removed)
      return newReviews
    })
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (autoRotate && !isInteracting) {
      intervalId = setInterval(() => {
        handleInteraction(0)
      }, rotateInterval)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [autoRotate, rotateInterval, isInteracting])

  return (
    <div
      className={cn(
        "not-prose relative flex h-[400px] w-full items-center justify-center md:h-[350px]",
        classNames?.container
      )}
    >
      <AnimatePresence>
        {reviews.map((review, index) => (
          <motion.div
            key={review?.id}
            initial={{ scale: 0.8, y: 100, opacity: 0 }}
            animate={{
              scale: 1 + index * scaleStep,
              y: index * -verticalSpacing,
              x: !isMobile ? index * horizontalSpacing : undefined,
              opacity: index === reviews?.length - 1 ? 0.7 : 1,
              zIndex: reviews.length - index,
            }}
            exit={{ scale: 0.8, y: 100, opacity: 0 }}
            transition={{ duration: animationDuration }}
            drag={interactionType === "drag" ? "y" : false}
            dragConstraints={
              interactionType === "drag" ? { top: 0, bottom: 0 } : undefined
            }
            onDragStart={() => setIsInteracting(true)}
            onDragEnd={() => {
              setIsInteracting(false)
              interactionType === "drag" && handleInteraction(index)
            }}
            onClick={() => {
              if (interactionType === "click") {
                setIsInteracting(true)
                handleInteraction(index)
                setTimeout(() => setIsInteracting(false), 300)
              }
            }}
            title={interactionType === "drag" ? "Drag me" : "Click me"}
            className={cardVariants({
              theme,
              cursor: interactionType,
              className: classNames?.card,
            })}
          >
            <div
              className={cn(
                "relative h-full w-full rounded-lg p-6",
                classNames?.cardContent
              )}
            >
              <div className={cn("mb-4 flex items-center", classNames?.header)}>
                <Avatar className={cn("mr-4 h-10 w-10", classNames?.avatar)}>
                  <AvatarImage src={review?.avatar} alt={review?.name} />
                  <AvatarFallback>{review?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2
                  className={nameVariants({
                    theme,
                    className: classNames?.name,
                  })}
                >
                  {review?.name}
                </h2>
              </div>
              <p
                className={textVariants({ theme, className: classNames?.text })}
              >
                {review?.text}
              </p>
              <div
                className={cn(
                  "absolute bottom-6 flex items-center",
                  classNames?.rating
                )}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < review?.rating ?
                        classNames?.activeStarColor || starColors.active
                      : classNames?.inactiveStarColor || starColors.inactive,
                      classNames?.star
                    )}
                  />
                ))}
              </div>
              {index === 0 && showBorderBeam && (
                <BorderBeam
                  size={250}
                  colorFrom={theme === "vibrant" ? "#ffffff" : undefined}
                  colorTo={theme === "vibrant" ? "#ffffff" : undefined}
                  duration={12}
                  delay={9}
                />
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
