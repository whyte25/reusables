"use client"

import * as React from "react"

import { useMultipleFileUpload } from "@/hooks/use-multiple-file-upload"
import { Button } from "@/components/ui/button"

import { MultiFileUpload, type FileState } from "../reusables/multi-file-upload"

export default function ManualMultiFileUploadDemo() {
  const [fileStates, setFileStates] = React.useState<FileState[]>([])
  const {
    uploadMultipleFiles,
    uploadProgress,
    isUploading,
    error,
    uploadResults,
  } = useMultipleFileUpload({
    onSuccess: (urls) => {
      console.log("Successfully uploaded files:", urls)
    },
    onError: (error) => {
      console.error("Upload error:", error)
    },
  })

  console.log("uploadResults", uploadResults)

  // Update file progress based on upload progress
  React.useEffect(() => {
    if (uploadProgress.length) {
      setFileStates((fileStates) => {
        const newFileStates = structuredClone(fileStates)
        uploadProgress.forEach(({ key, progress }) => {
          const fileState = newFileStates.find(
            (fileState) => fileState.key === key
          )
          if (fileState) {
            fileState.progress = progress
          }
        })
        return newFileStates
      })
    }
  }, [uploadProgress])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 md:px-10">
      <MultiFileUpload
        value={fileStates}
        onChange={setFileStates}
        displayMode="list"
        disabled={isUploading}
        dropzoneOptions={{
          maxFiles: 4,
          maxSize: 1024 * 1024 * 2, // 2MB
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles])
        }}
      />

      <Button
        onClick={() => {
          const pendingFiles = fileStates
            .filter(
              (fileState) =>
                fileState.progress === "PENDING" &&
                typeof fileState.file !== "string"
            )
            .map((fileState) => ({
              key: fileState.key,
              file: fileState.file as File,
            }))

          uploadMultipleFiles(pendingFiles)
        }}
        disabled={
          isUploading ||
          !fileStates.filter((fileState) => fileState.progress === "PENDING")
            .length
        }
      >
        {isUploading ? "Uploading..." : "Upload Files"}
      </Button>
      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  )
}
