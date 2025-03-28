"use client"

import { Button } from "@/components/ui/button"

import { toast } from "../reusables/ui/notify"

export default function ToastProgressDemo() {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      <Button
        className="w-full md:w-auto"
        onClick={() =>
          toast.info("Toast with progress", {
            hideProgressBar: false,
          })
        }
      >
        Show Progress
      </Button>

      <Button
        className="w-full md:w-auto"
        onClick={() =>
          toast.info("Toast without progress", {
            hideProgressBar: true,
          })
        }
      >
        Hide Progress
      </Button>
    </div>
  )
}
