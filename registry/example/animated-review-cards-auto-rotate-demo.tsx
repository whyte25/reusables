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

import { AnimatedReviewCards } from "../reusables/animated-review-cards"

export const initialReviews = [
  {
    id: 1,
    name: "James Bryan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    text: "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
    rating: 5,
  },
  {
    id: 2,
    name: "Keith Johnson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 3,
  },
  {
    id: 3,
    name: "Mark Sloan",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    rating: 4,
  },
]

export default function AnimatedReviewCardsAutoRotateDemo() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotateInterval, setRotateInterval] = useState(3000)
  const [showBorderBeam, setShowBorderBeam] = useState(true)

  return (
    <div className="not-prose flex w-full flex-col justify-center space-y-8">
      <div className="mx-10 mb-8 flex flex-wrap gap-4">
        <Button
          variant={autoRotate ? "default" : "outline"}
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? "Auto-Rotate: ON" : "Auto-Rotate: OFF"}
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm">Interval:</span>
          <Select
            value={rotateInterval.toString()}
            onValueChange={(value) => setRotateInterval(Number(value))}
            disabled={!autoRotate}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000">1 second</SelectItem>
              <SelectItem value="3000">3 seconds</SelectItem>
              <SelectItem value="5000">5 seconds</SelectItem>
              <SelectItem value="8000">8 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant={showBorderBeam ? "default" : "outline"}
          onClick={() => setShowBorderBeam(!showBorderBeam)}
        >
          {showBorderBeam ? "Border Beam: ON" : "Border Beam: OFF"}
        </Button>
      </div>

      <AnimatedReviewCards
        reviews={initialReviews}
        autoRotate={autoRotate}
        rotateInterval={rotateInterval}
        theme="default"
        showBorderBeam={showBorderBeam}
      />
    </div>
  )
}
