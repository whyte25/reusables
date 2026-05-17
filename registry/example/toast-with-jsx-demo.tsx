"use client"

import { toast } from "@/packages/notify/src"

import { Button } from "@/components/ui/button"

export default function ToastWithJsxDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-3 p-4">
      <Button
        variant="outline"
        onClick={() =>
          toast.info(
            <>
              <span className="font-bold">The Evil Rabbit</span> jumped over the
              fence.
            </>
          )
        }
      >
        Show JSX Toast
      </Button>
    </div>
  )
}
