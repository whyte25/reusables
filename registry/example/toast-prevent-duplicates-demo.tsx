"use client"

import { Button } from "@/components/ui/button"

import { toast } from "../reusables/ui/notify-provider"

export default function ToastPreventDuplicatesDemo() {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          toast.info("This will not duplicate", {
            preventDuplicates: true,
            description: "Try clicking multiple times",
          })
        }
      >
        Prevent Duplicates
      </Button>
    </div>
  )
}
