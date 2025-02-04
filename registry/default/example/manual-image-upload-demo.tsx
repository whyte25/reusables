"use client"

import { useState } from "react"

import useFileUpload from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"

import { SingleImageDropzone } from "../reusables/single-image-upload"
import { toast } from "../reusables/ui/notify-provider"

export default function ManualImageUploadDemo() {
  const manualUpload = useFileUpload({
    onSuccess: () => toast.success(" Upload SuccessFul"),
    onError: (error) => toast.error(error),
  })
  const [manualFile, setManualFile] = useState<File | undefined>()

  return (
    <div className="w-full space-y-4 px-5 py-12 md:px-7 md:py-0">
      <SingleImageDropzone
        width={"100%"}
        height={"300px"}
        directUpload={false}
        progress={manualUpload.progress}
        disabled={manualUpload.isUploading}
        value={manualFile}
        onChange={setManualFile}
        progressType="circular"
      />

      <Button
        onClick={() => {
          manualFile && manualUpload.handleFileUpload(manualFile)
          manualUpload.isUploading && toast.loading("Uploading...")
        }}
        disabled={!manualFile || manualUpload.isUploading}
      >
        {manualUpload.isUploading ? "Uploading..." : "Start Upload"}
      </Button>
    </div>
  )
}
