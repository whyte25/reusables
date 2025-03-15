"use client"

import { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

import AnimatedCard, {
  AnimationEaseType,
  CardSizeType,
} from "../reusables/animated-card-carousel"

export default function RotateAnimatedDemo() {
  const cards = [
    {
      title: "Portfolio Builder",
      description:
        "Create stunning professional portfolios with our intuitive drag-and-drop interface. Showcase your work with beautiful layouts and responsive designs.",
      imgSrc:
        "https://res.cloudinary.com/duli9q35f/image/upload/v1742067091/reading-dark_kfnwvb.webp",
      color: "#3b82f6",
      href: "#",
    },
    {
      title: "Health Tracker",
      description:
        "Monitor your fitness journey with comprehensive health analytics. Track workouts, nutrition, and wellness metrics all in one secure application.",
      imgSrc:
        "https://res.cloudinary.com/duli9q35f/image/upload/v1742067091/reading-dark_kfnwvb.webp",
      color: "#10b981",
      href: "#",
    },
    {
      title: "Learning Platform",
      description:
        "Access world-class educational content with our interactive learning platform. Master new skills with personalized courses and expert-led tutorials.",
      imgSrc:
        "https://res.cloudinary.com/duli9q35f/image/upload/v1742067091/reading-dark_kfnwvb.webp",
      color: "#8b5cf6",
      href: "#",
    },
    {
      title: "E-Commerce Solution",
      description:
        "Launch your online store with our comprehensive e-commerce platform. Manage inventory, process payments, and grow your business with powerful analytics.",
      imgSrc:
        "https://res.cloudinary.com/duli9q35f/image/upload/v1742067091/reading-dark_kfnwvb.webp",
      color: "#f43f5e",
      href: "#",
    },
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(3000)
  const [animationDuration, setAnimationDuration] = useState(0.5)
  const [animationEase, setAnimationEase] =
    useState<AnimationEaseType>("easeInOut")
  const [cardSize, setCardSize] = useState<CardSizeType>("featured")

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isHovering) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length)
      }, rotationSpeed)
    }

    return () => clearInterval(interval)
  }, [isHovering, cards.length, rotationSpeed])

  const handleMouseEnter = (index: number) => {
    setIsHovering(true)
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div className="space-y-8 md:px-5">
      {/* Controls for customization */}
      <div className="rounded-lg">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <label
              htmlFor="rotation-speed"
              className="block text-sm font-medium"
            >
              Rotation Speed: {rotationSpeed}ms
            </label>
            <Slider
              id="rotation-speed"
              min={1000}
              max={5000}
              step={500}
              value={[rotationSpeed]}
              onValueChange={(value) => setRotationSpeed(value[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="animation-duration"
              className="block text-sm font-medium"
            >
              Animation Duration: {animationDuration}s
            </label>
            <Slider
              id="animation-duration"
              min={0.1}
              max={1}
              step={0.1}
              value={[animationDuration]}
              onValueChange={(value) => setAnimationDuration(value[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="animation-ease"
              className="block text-sm font-medium"
            >
              Animation Easing
            </label>
            <Select
              value={animationEase}
              onValueChange={(value) =>
                setAnimationEase(value as AnimationEaseType)
              }
            >
              <SelectTrigger id="animation-ease" className="w-full">
                <SelectValue placeholder="Select easing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easeInOut">Ease In Out</SelectItem>
                <SelectItem value="easeIn">Ease In</SelectItem>
                <SelectItem value="easeOut">Ease Out</SelectItem>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="circIn">Circular In</SelectItem>
                <SelectItem value="circOut">Circular Out</SelectItem>
                <SelectItem value="circInOut">Circular In Out</SelectItem>
                <SelectItem value="backIn">Back In</SelectItem>
                <SelectItem value="backOut">Back Out</SelectItem>
                <SelectItem value="backInOut">Back In Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="card-size" className="block text-sm font-medium">
              Card Size
            </label>
            <Select
              value={cardSize}
              onValueChange={(value) => setCardSize(value as CardSizeType)}
            >
              <SelectTrigger id="card-size" className="w-full">
                <SelectValue placeholder="Select card size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured (Large)</SelectItem>
                <SelectItem value="standard">Standard (Small)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div
        className="mx-auto grid max-w-5xl gap-3 md:grid-cols-1 lg:grid-cols-2"
        role="region"
        aria-label="Project showcase"
      >
        {cards.map((card, index) => (
          <AnimatedCard
            key={index}
            title={card.title}
            description={card.description}
            imgSrc={card.imgSrc}
            color={card.color}
            href={card.href}
            isActive={index === activeIndex}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            animationDuration={animationDuration}
            animationEase={animationEase}
            size={cardSize}
          />
        ))}
      </div>
    </div>
  )
}
