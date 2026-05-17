"use client"

import { toast } from "@/packages/notify/src"

import { Button } from "@/components/ui/button"

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
