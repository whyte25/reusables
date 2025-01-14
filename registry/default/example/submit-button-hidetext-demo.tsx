"use client";
import { SubmitButton } from "@/components/ui/submit-button";
import { useState } from "react";

export default function SubmitButtonTextDemo() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = () => {
    setIsSubmitting(true);
  };

  return (
    <SubmitButton
      onClick={handleClick}
      hideText={true}
      isSubmitting={isSubmitting}
    >
      Click Me
    </SubmitButton>
  );
}
