"use client"

import React, { useState } from "react"

import { useMultipleFileUpload } from "@/hooks/use-multiple-file-upload"

import {
  UniversalFileUpload,
  type FileState,
} from "../reusables/universal-file-upload"

export default function UniversalFileUploadDirectDemo() {
  const [files, setFiles] = useState<FileState[]>([])

  const { uploadMultipleFiles, uploadProgress, isUploading } =
    useMultipleFileUpload({
      onSuccess: (urls) => {
        // Update file states with uploaded URLs
        setFiles((prev) =>
          prev.map((file, index) => ({
            ...file,
            file: urls[index] || file.file,
            progress: "COMPLETE",
          }))
        )
      },
    })

  // Update the onUpload handler
  const handleUpload = async (files: File[]) => {
    // Create file states first to show immediate preview
    const newFiles = files.map<FileState>((file) => ({
      file,
      key: Math.random().toString(36).slice(2),
      progress: 0, // Start with 0 progress instead of PENDING
    }))

    // Update state to show previews immediately
    setFiles((prev) => [...prev, ...newFiles])

    // Start upload
    const filesToUpload = newFiles.map(({ key, file }) => ({
      key,
      file: file as File,
    }))

    await uploadMultipleFiles(filesToUpload)
  }

  // Update progress from uploadProgress
  React.useEffect(() => {
    if (uploadProgress.length > 0) {
      setFiles((prev) =>
        prev.map((file) => {
          const progress = uploadProgress.find((p) => p.key === file.key)
          return progress ? { ...file, progress: progress.progress } : file
        })
      )
    }
  }, [uploadProgress])

  return (
    <div className="mx-auto w-full max-w-3xl md:px-10">
      <UniversalFileUpload
        value={files}
        onChange={setFiles}
        onUpload={handleUpload}
        isDirectUpload
        disabled={isUploading}
        dropzoneOptions={{
          maxFiles: 10,
          maxSize: 1024 * 1024 * 10, // 10MB
          // Accept any file type
          accept: undefined,
        }}
      />
    </div>
  )
}
