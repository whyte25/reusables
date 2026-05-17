"use client"

import { toast } from "@/packages/notify/src"

import { Button } from "@/components/ui/button"

export default function ToastCloseButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      <Button
        className="w-full md:w-auto"
        onClick={() =>
          toast.success("Closable toast", {
            closable: true,
          })
        }
      >
        With Close Button
      </Button>

      <Button
        className="w-full md:w-auto"
        onClick={() =>
          toast.info("Non-closable toast", {
            closable: false,
          })
        }
      >
        Without Close Button
      </Button>
    </div>
  )
}
