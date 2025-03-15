"use client"

import { useEffect, useState } from "react"

import AnimatedCard from "../reusables/animated-card-carousel"

export default function SimpleAnimatedCardDemo() {
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

  const rotationSpeed = 3000

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
          />
        ))}
      </div>
    </div>
  )
}
