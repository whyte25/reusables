"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { statusStyles } from "../reusables/toast/toast";
import { useToast } from "../reusables/toast/toast-provider";

export default function ToastDemo() {
  const toast = useToast();

  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000)
    );

  return (
    <div className="p-4 flex  flex-wrap justify-center gap-3 w-full ">
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["info"])}
        onClick={() =>
          toast.push({
            closable: true,
            title: "Information",
            status: "info",
            description: "This is an information message.",
          })
        }
      >
        Info Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["success"])}
        onClick={() =>
          toast.push({
            closable: true,
            title: "Success",
            status: "success",
            description: "Operation completed successfully!",
          })
        }
      >
        Success Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["warning"])}
        onClick={() =>
          toast.push({
            closable: true,
            title: "Warning",
            status: "warning",
            description: "Please be cautious with this action.",
          })
        }
      >
        Warning Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["error"])}
        onClick={() =>
          toast.push({
            closable: true,
            title: "Error",
            status: "error",
            description: "An error occurred while processing your request.",
          })
        }
      >
        Error Toast
      </Button>

      <Button
        variant="outline"
        className={cn("w-32", statusStyles["default"])}
        onClick={() =>
          toast.push({
            closable: true,
            title: "Default Message",
            description: "This is a default toast message.",
          })
        }
      >
        Default Toast
      </Button>
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["loading"])}
        onClick={() =>
          toast.push({
            status: "loading",
            title: "Loading...",
          })
        }
      >
        Loading Toast 1
      </Button>
      <Button
        variant="outline"
        className={cn("w-32", statusStyles["loading"])}
        onClick={() =>
          toast.promise(promise, {
            loading: "Loading...",
            success: () => `${"IFE"} toast has been added`,
            error: "Error",
          })
        }
      >
        Loading Toast 2
      </Button>
    </div>
  );
}
