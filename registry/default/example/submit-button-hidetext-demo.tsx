import { SubmitButton } from "@/components/ui/submit-button";

export default function SubmitButtonTextDemo() {
  return (
    <SubmitButton
      spinnerClassName="text-black"
      hideText={true}
      isSubmitting={true}
    >
      Loading
    </SubmitButton>
  );
}
