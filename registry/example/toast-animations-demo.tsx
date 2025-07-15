"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/registry/reusables/ui/notify"
import type { AnimationType } from "@/registry/reusables/ui/notify/notify-provider"

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export default function ToastAnimationsDemo() {
  const animations: AnimationType[] = ["slide", "fade", "scale", "bounce"]
  const [position, setPosition] = useState<ToastPosition>("bottom-right")

  // Animation descriptions
  const descriptions = {
    slide: "Smooth slide-in animation from the side",
    fade: "Simple fade-in and fade-out effect",
    scale: "Grow and shrink animation with opacity change",
    bounce: "Bouncy spring-physics animation for playful effect",
  }

  // Show a toast with the selected animation and position
  const showToast = (animation: AnimationType) => {
    toast.push({
      title: `Animation: ${animation}`,
      description: descriptions[animation],
      text: "Drag me to dismiss!",
      position,
      animation,
      status:
        animation === "bounce" ? "success"
        : animation === "slide" ? "info"
        : animation === "scale" ? "warning"
        : "default",
    })
  }

  // Show all animations at once
  const showAllAnimations = () => {
    animations.forEach((animation, index) => {
      setTimeout(() => {
        toast.push({
          title: `Animation: ${animation}`,
          description: descriptions[animation],
          text: "Drag me to dismiss!",
          position,
          animation,
          status:
            animation === "bounce" ? "success"
            : animation === "slide" ? "info"
            : animation === "scale" ? "warning"
            : "default",
        })
      }, index * 500) // Stagger the toasts
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Toast Position</h3>
        <Select
          value={position}
          onValueChange={(value) => setPosition(value as ToastPosition)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top-left">Top Left</SelectItem>
            <SelectItem value="top-center">Top Center</SelectItem>
            <SelectItem value="top-right">Top Right</SelectItem>
            <SelectItem value="bottom-left">Bottom Left</SelectItem>
            <SelectItem value="bottom-center">Bottom Center</SelectItem>
            <SelectItem value="bottom-right">Bottom Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Individual Animations</h3>
        <div className="flex flex-wrap gap-4">
          {animations.map((animation) => (
            <Button
              key={animation}
              variant="outline"
              onClick={() => showToast(animation)}
            >
              {animation.charAt(0).toUpperCase() + animation.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Button onClick={showAllAnimations}>Show All Animations</Button>
      </div>
    </div>
  )
}
