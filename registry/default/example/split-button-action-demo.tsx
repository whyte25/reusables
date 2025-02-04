"use client"

import { useState } from "react"
import {
  Copy,
  Download,
  Facebook,
  File,
  FileDown,
  FileJson,
  FileText,
  Github,
  Image,
  Link,
  Linkedin,
  Share2,
  Twitter,
} from "lucide-react"

import { toast } from "../reusables/ui/notify-provider"
import SplitButtonAction from "../reusables/ui/split-button-action"

export default function SplitButton2Demo() {
  const [loadingStates, setLoadingStates] = useState({
    download: false,
    share: false,
    export: false,
    small: false,
    default: false,
    large: false,
  })

  const handleAction = async (action: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [action]: true }))
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoadingStates((prev) => ({ ...prev, [action]: false }))
    toast.success(
      `${action.charAt(0).toUpperCase() + action.slice(1)} Successful`,
      {
        description: `Your ${action} action has been completed.`,
      }
    )
  }

  const options = [
    {
      label: "Copy SVG",
      onClick: () => {
        toast.success("Copied SVG", {
          description: "SVG code copied to clipboard",
        })
      },
      icon: <Copy className="h-4 w-4" />,
    },
    {
      label: "Copy URL",
      onClick: () => {
        toast.success("Copied URL", {
          description: "URL copied to clipboard",
        })
      },
      icon: <Link className="h-4 w-4" />,
    },
    {
      label: "Download PNG",
      onClick: () => {
        toast.success("Downloading PNG", {
          description: "Your PNG file is being downloaded...",
        })
      },
      icon: <Image className="h-4 w-4" />,
    },
  ]

  const shareOptions = [
    {
      label: "Share on Twitter",
      onClick: () => {
        toast.success("Sharing on Twitter", {
          description: "Opening Twitter share dialog...",
        })
      },
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      label: "Share on Facebook",
      onClick: () => {
        toast.success("Sharing on Facebook", {
          description: "Opening Facebook share dialog...",
        })
      },
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      label: "Share on LinkedIn",
      onClick: () => {
        toast.success("Sharing on LinkedIn", {
          description: "Opening LinkedIn share dialog...",
        })
      },
      icon: <Linkedin className="h-4 w-4" />,
    },
  ]

  const exportOptions = [
    {
      label: "Export as PDF",
      onClick: () => {
        toast.success("Exporting PDF", {
          description: "Your file is being exported as PDF...",
        })
      },
      icon: <File className="h-4 w-4 text-red-500" />,
    },
    {
      label: "Export as JSON",
      onClick: () => {
        toast.success("Exporting JSON", {
          description: "Your file is being exported as JSON...",
        })
      },
      icon: <FileJson className="h-4 w-4 text-yellow-500" />,
    },
    {
      label: "Export as TXT",
      onClick: () => {
        toast.success("Exporting TXT", {
          description: "Your file is being exported as TXT...",
        })
      },
      icon: <FileText className="h-4 w-4 text-gray-500" />,
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Modern Split Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <SplitButtonAction
            options={options}
            mainAction={() => handleAction("download")}
            icon={<Download className="h-4 w-4" />}
            isLoading={loadingStates.download}
          >
            Download
          </SplitButtonAction>

          <SplitButtonAction
            options={shareOptions}
            mainAction={() => handleAction("share")}
            icon={<Share2 className="h-4 w-4" />}
            glassMorphism
            variant="secondary"
            isLoading={loadingStates.share}
          >
            Share
          </SplitButtonAction>

          <SplitButtonAction
            options={exportOptions}
            mainAction={() => handleAction("export")}
            icon={<FileDown className="h-4 w-4" />}
            variant="destructive"
            isLoading={loadingStates.export}
          >
            Export
          </SplitButtonAction>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Size Variants</h3>
        <div className="flex flex-wrap items-center gap-4">
          <SplitButtonAction
            options={options}
            mainAction={() => handleAction("small")}
            size="sm"
            icon={<Github className="h-3 w-3" />}
            variant="outline"
            isLoading={loadingStates.small}
          >
            Small
          </SplitButtonAction>

          <SplitButtonAction
            options={options}
            mainAction={() => handleAction("default")}
            icon={<Github className="h-4 w-4" />}
            variant="outline"
            isLoading={loadingStates.default}
          >
            Default
          </SplitButtonAction>

          <SplitButtonAction
            options={options}
            mainAction={() => handleAction("large")}
            size="lg"
            icon={<Github className="h-5 w-5" />}
            variant="outline"
            isLoading={loadingStates.large}
          >
            Large
          </SplitButtonAction>
        </div>
      </div>
    </div>
  )
}
