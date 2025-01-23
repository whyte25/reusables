"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast-provider";

export default function ToastProgressDemo() {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          toast.info("Toast with progress", {
            hideProgressBar: false,
          })
        }
      >
        Show Progress
      </Button>

      <Button
        onClick={() =>
          toast.info("Toast without progress", {
            hideProgressBar: true,
          })
        }
      >
        Hide Progress
      </Button>
    </div>
  );
}
