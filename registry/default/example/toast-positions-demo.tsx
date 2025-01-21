"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "../reusables/toast/toast-provider";

export default function ToastPositionsDemo() {
  const { push } = useToast();

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
            push({
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
