"use client"

import React, { useState } from "react"

import { useMultipleFileUpload } from "@/hooks/use-multiple-file-upload"
import { Button } from "@/components/ui/button"

import {
  UniversalFileUpload,
  type FileState,
} from "../reusables/universal-file-upload"

export default function UniversalFileUploadDemo() {
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const {
    uploadMultipleFiles,
    uploadProgress,
    isUploading,
    error,
    uploadResults,
  } = useMultipleFileUpload({
    onSuccess: (urls) => {
      // Update file states with uploaded URLs
      setFileStates((prev) =>
        prev.map((file, index) => ({
          ...file,
          file: urls[index] || file.file,
          progress: "COMPLETE",
        }))
      )
    },
    onError: (error) => {
      console.error("Upload error:", error)
    },
  })

  // Update progress states
  React.useEffect(() => {
    if (uploadProgress.length > 0) {
      setFileStates((prev) =>
        prev.map((file) => {
          const progress = uploadProgress.find((p) => p.key === file.key)
          return progress ? { ...file, progress: progress.progress } : file
        })
      )
    }
  }, [uploadProgress])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 md:px-10">
      <UniversalFileUpload
        value={fileStates}
        onChange={setFileStates}
        displayMode="list"
        disabled={isUploading}
        dropzoneOptions={{
          maxFiles: 10,
          maxSize: 1024 * 1024 * 10, // 10MB
          // Accept any file type
          accept: undefined,
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates((prev) => [...prev, ...addedFiles])
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
