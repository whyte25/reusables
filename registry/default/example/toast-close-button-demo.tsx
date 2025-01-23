"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast-provider";

export default function ToastCloseButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          toast.success("Closable toast", {
            closable: true,
          })
        }
      >
        With Close Button
      </Button>

      <Button
        onClick={() =>
          toast.info("Non-closable toast", {
            closable: false,
          })
        }
      >
        Without Close Button
      </Button>
    </div>
  );
}
