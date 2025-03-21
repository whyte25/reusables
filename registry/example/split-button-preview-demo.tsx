"use client"

import { toast } from "../reusables/ui/notify"
import { SplitButton } from "../reusables/ui/split-button"

export default function SplitButtonPreviewDemo() {
  const options = [
    {
      label: "Copy SVG",
      onClick: () => {
        toast.success("Copied SVG", {
          description: "SVG code copied to clipboard",
        })
      },
    },
    {
      label: "Copy Data URL",
      onClick: () => {
        toast.success("Copied Data URL", {
          description: "Data URL copied to clipboard",
        })
      },
    },
    {
      label: "Download SVG",
      onClick: () => {
        toast.success("Downloading SVG", {
          description: "Your file is being downloaded...",
        })
      },
    },
  ]

  return (
    <SplitButton options={options} mainAction={() => {}} size="sm">
      Download PNG
    </SplitButton>
  )
}
