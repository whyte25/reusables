"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "../reusables/toast/toast-provider";

export default function ToastPromiseDemo() {
  const toast = useToast();

  const simulateSuccess = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("Success!");
      }, 2000);
    });

  const simulateError = () =>
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Failed!"));
      }, 2000);
    });

  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          toast.promise(simulateSuccess, {
            loading: "Processing...",
            success: () => "Operation completed!",
            error: "Operation failed!",
          })
        }
      >
        Show Success Toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.promise(simulateError, {
            loading: "Processing...",
            success: () => "Operation completed!",
            error: "Operation failed!",
          })
        }
      >
        Show Error Toast
      </Button>
    </div>
  );
}
