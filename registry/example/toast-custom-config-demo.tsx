"use client"

import { Button } from "@/components/ui/button"

import { toast } from "../reusables/ui/notify"

export default function ToastCustomConfigDemo() {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          toast.info(`Toast `, {
            maxToast: 3,
            description: "Max 3 toasts will show",
          })
        }}
      >
        Max 3 Toasts
      </Button>
    </div>
  )
}
