"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { statusStyles } from "../reusables/toast/toast";
import { useToast } from "../reusables/toast/toast-provider";

export default function ToastDemo() {
  const toast = useToast();

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
            title: "Success",
            status: "success",
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
            title: "Warning",
            status: "warning",
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
            title: "Error",
            status: "error",
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
            title: "Default Toast",
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
          toast.push({
            status: "loading",
            title: "Loading...",
            loaderVariant: "loader-2",
          })
        }
      >
        Loading Toast 2
      </Button>
    </div>
  );
}
