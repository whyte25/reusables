"use client"

import { toast } from "@/packages/notify/src"

import { Button } from "@/components/ui/button"

export default function ToastWithDescriptionDemo() {
  return (
    <Button
      onClick={() =>
        toast.info("Event has been created", {
          description:
            "We've created your event and sent invitations to your guests.",
          duration: 5000,
          position: "bottom-right",
        })
      }
    >
      Show Toast with Description
    </Button>
  )
}
