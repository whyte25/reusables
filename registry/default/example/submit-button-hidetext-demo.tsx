import { SubmitButton } from "@/components/ui/submit-button";

export default function SubmitButtonTextDemo() {
  return (
    <SubmitButton hideText={true} isSubmitting={true}>
      Loading
    </SubmitButton>
  );
}
