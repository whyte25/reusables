"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { statusStyles, toast } from "../reusables/ui/notify"

export default function ToastDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-3 p-4">
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["info"])}
        onClick={() => toast.info("This is an information message.")}
      >
        Info Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["success"])}
        onClick={() => toast.success("Your action was successful.")}
      >
        Success Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["warning"])}
        onClick={() => toast.warning("Please be cautious.")}
      >
        Warning Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["error"])}
        onClick={() => toast.error("An error has occurred.")}
      >
        Error Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["default"])}
        onClick={() => toast.default("This is a default notification.")}
      >
        Default Toast
      </Button>
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["loading"])}
        onClick={() => toast.loading("Processing your request...")}
      >
        Loading Toast 1
      </Button>
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["loading"])}
        onClick={() =>
          toast.loading("Processing your request...", {
            loaderVariant: "loader-2",
          })
        }
      >
        Loading Toast 2
      </Button>
    </div>
  )
}
