"use client";
import { useState } from "react";
import { SubmitButton } from "../reusables/ui/submit-button";

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
