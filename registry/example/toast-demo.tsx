"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { statusStyles, toast } from "../reusables/ui/notify-provider"

export default function ToastDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-3 p-4">
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["info"])}
        onClick={() => toast.info("Information")}
      >
        Info Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["success"])}
        onClick={() => toast.success("Success")}
      >
        Success Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["warning"])}
        onClick={() => toast.warning("Warning")}
      >
        Warning Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["error"])}
        onClick={() => toast.error("Error")}
      >
        Error Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["default"])}
        onClick={() => toast.default("Default Toast")}
      >
        Default Toast
      </Button>
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["loading"])}
        onClick={() => toast.loading("loading")}
      >
        Loading Toast 1
      </Button>
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["loading"])}
        onClick={() =>
          toast.loading("loading", {
            loaderVariant: "loader-2",
          })
        }
      >
        Loading Toast 2
      </Button>
    </div>
  )
}
