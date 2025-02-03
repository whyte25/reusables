"use client";

import { Button } from "@/components/ui/button";
import { toast } from "../reusables/ui/notify-provider";

export default function ToastPositionsDemo() {
  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {positions.map((position) => (
        <Button
          key={position}
          onClick={() =>
            toast.push({
              title: `Toast - ${position}`,
              position,
              status: "success",
            })
          }
        >
          {position}
        </Button>
      ))}
    </div>
  );
}
