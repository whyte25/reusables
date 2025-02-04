"use client"

import { toast } from "../reusables/ui/notify-provider"
import SplitButton from "../reusables/ui/split-button"

export default function Demo() {
  const handleDownloadPNG = () => {
    toast.success("Downloading PNG", {
      description: "Your file is being downloaded...",
    })
  }

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
    {
      label: "Download PNG",
      onClick: () => handleDownloadPNG(),
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-[180px_1fr]">
        <p className="my-0 text-sm text-muted-foreground md:my-5">
          Default Split Button
        </p>
        <SplitButton options={options} mainAction={handleDownloadPNG}>
          Download PNG
        </SplitButton>
      </div>

      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-[180px_1fr]">
        <p className="my-0 text-sm text-muted-foreground md:my-5">
          Secondary Variant
        </p>
        <SplitButton
          options={options}
          mainAction={handleDownloadPNG}
          variant="secondary"
        >
          Download PNG
        </SplitButton>
      </div>

      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-[180px_1fr]">
        <p className="my-0 text-sm text-muted-foreground md:my-5">
          Outline Variant
        </p>
        <SplitButton
          options={options}
          mainAction={handleDownloadPNG}
          variant="outline"
        >
          Download PNG
        </SplitButton>
      </div>

      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-[180px_1fr]">
        <p className="my-0 text-sm text-muted-foreground md:my-5">
          Small Size Variant
        </p>
        <SplitButton options={options} mainAction={handleDownloadPNG} size="sm">
          Download PNG
        </SplitButton>
      </div>
    </div>
  )
}
