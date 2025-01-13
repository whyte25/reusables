import { SubmitButton } from "@/components/ui/submit-button";

export default function SubmitButtonDemo() {
  return (
    <SubmitButton spinnerClassName="text-black" isSubmitting={true}>
      Loading
    </SubmitButton>
  );
}
