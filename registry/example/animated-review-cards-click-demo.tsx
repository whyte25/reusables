"use client"

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

export default function AnimatedReviewCardsClickDemo() {
  return (
    <div className="not-prose my-auto flex w-full items-center justify-center space-y-8">
      <AnimatedReviewCards
        reviews={initialReviews}
        interactionType="click"
        theme="default"
        classNames={{
          container: "items-center justify-center",
        }}
      />
    </div>
  )
}
