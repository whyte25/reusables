"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "../reusables/toast/toast-provider";

export default function ToastWithDescriptionDemo() {
  const { push } = useToast();

  return (
    <Button
      onClick={() =>
        push({
          title: "New message received",
          description: "You have a new message from John Doe",
        })
      }
    >
      Show Toast with Description
    </Button>
  );
}
