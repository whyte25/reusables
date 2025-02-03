"use client";

import { toast } from "../reusables/ui/notify-provider";
import SplitButton from "../reusables/ui/split-button";

export default function Demo() {
  const handleDownloadPNG = () => {
    toast.success("Downloading PNG", {
      description: "Your file is being downloaded...",
    });
  };

  const options = [
    {
      label: "Copy SVG",
      onClick: () => {
        toast.success("Copied SVG", {
          description: "SVG code copied to clipboard",
        });
      },
    },
    {
      label: "Copy Data URL",
      onClick: () => {
        toast.success("Copied Data URL", {
          description: "Data URL copied to clipboard",
        });
      },
    },
    {
      label: "Download SVG",
      onClick: () => {
        toast.success("Downloading SVG", {
          description: "Your file is being downloaded...",
        });
      },
    },
    {
      label: "Download PNG",
      onClick: () => handleDownloadPNG(),
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-2">
        <p className="text-sm my-0 md:my-5 text-muted-foreground">
          Default Split Button
        </p>
        <SplitButton options={options} mainAction={handleDownloadPNG}>
          Download PNG
        </SplitButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-2">
        <p className="text-sm my-0 md:my-5 text-muted-foreground">
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

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-2">
        <p className="text-sm my-0 md:my-5 text-muted-foreground">
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

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-2">
        <p className="text-sm my-0 md:my-5 text-muted-foreground">
          Small Size Variant
        </p>
        <SplitButton options={options} mainAction={handleDownloadPNG} size="sm">
          Download PNG
        </SplitButton>
      </div>
    </div>
  );
}
