import { SubmitButton } from "../reusables/ui/submit-button";

export default function SubmitButtonPositionLeft() {
  return (
    <SubmitButton position="left" isSubmitting={true}>
      Loading
    </SubmitButton>
  );
}
