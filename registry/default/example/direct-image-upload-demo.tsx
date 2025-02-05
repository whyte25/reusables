"use client"

import useFileUpload from "@/hooks/use-file-upload"

import { SingleImageDropzone } from "../reusables/single-image-upload"
import { toast } from "../reusables/ui/notify-provider"

export default function DirectImageUploadDemo() {
  const autoUpload = useFileUpload({
    onSuccess: () => toast.success(" Upload SuccessFul"),
    onError: (error) => toast.error(error),
  })

  return (
    <div className="w-full space-y-4 px-5 py-12 md:px-7 md:py-0">
      <SingleImageDropzone
        width={"100%"}
        height={"300px"}
        directUpload={true}
        progress={autoUpload.progress}
        disabled={autoUpload.isUploading}
        onChange={async (file) => {
          if (file) {
            try {
              await autoUpload.handleFileUpload(file)
            } catch (error) {
              console.error("Upload error:", error)
            }
          }
        }}
      />

      {autoUpload.error && (
        <p className="text-red-500">Error: {autoUpload.error}</p>
      )}
    </div>
  )
}
