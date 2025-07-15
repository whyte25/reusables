"use client"

import { Button } from "@/components/ui/button"

import { toast } from "../reusables/ui/notify"

export default function ToastWithActionDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-3 p-4">
      <Button
        variant="outline"
        onClick={() =>
          toast.push({
            status: "default",
            description:
              "The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence again.",
            actions: {
              primary: {
                label: "Undo",
                onClick: () => console.log("Undo!"),
              },
              dismiss: {
                label: "Dismiss",
              },
            },
            duration: 10000,
          })
        }
      >
        Toast With Actions
      </Button>
    </div>
  )
}
