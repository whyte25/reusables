"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"

export type UploadStatus = "PENDING" | "COMPLETE" | "ERROR"

interface UploadProgress {
  key: string
  progress: number | UploadStatus
}

interface UploadResult {
  url: string
  filename: string
}

interface FileToUpload {
  key: string
  file: File
}

interface UseMultipleFileUploadParams {
  onSuccess?: (urls: string[]) => void
  onError?: (error: string) => void
}

const getResourceType = (file: File) => {
  if (file.type.startsWith("image/")) {
    return "image"
  }

  if (file.type.startsWith("video/")) {
    return "video"
  }

  return "raw"
}

export function useMultipleFileUpload({
  onSuccess,
  onError,
}: UseMultipleFileUploadParams = {}) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map())
  const imageUrlsRef = useRef<string[]>([])

  useEffect(() => {
    return () => {
      // Cleanup URLs when component unmounts
      imageUrlsRef.current.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [])

  const uploadMultipleFiles = async (files: FileToUpload[]) => {
    setIsUploading(true)
    setError(null)
    const successfulUrls: string[] = []

    setUploadProgress(
      files.map((file) => ({
        key: file.key,
        progress: "PENDING",
      }))
    )

    try {
      await Promise.all(
        files.map(async ({ key, file }) => {
          const abortController = new AbortController()
          abortControllersRef.current.set(key, abortController)

          try {
            const blobUrl = URL.createObjectURL(file)
            imageUrlsRef.current.push(blobUrl)

            const formData = new FormData()
            formData.append("file", file)
            formData.append(
              "upload_preset",
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
            )

            // Determine resource type based on file type
            const resourceType = getResourceType(file)

            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
              formData,
              {
                signal: abortController.signal,
                onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total!
                  )
                  setUploadProgress((prev) =>
                    prev.map((item) =>
                      item.key === key ?
                        { ...item, progress: percentCompleted }
                      : item
                    )
                  )
                },
              }
            )

            const uploadedUrl = response?.data?.secure_url
            successfulUrls.push(uploadedUrl)

            await new Promise((resolve) => setTimeout(resolve, 1000))

            setUploadProgress((prev) =>
              prev.map((item) =>
                item.key === key ? { ...item, progress: "COMPLETE" } : item
              )
            )

            setUploadResults((prev) => [
              ...prev,
              {
                url: uploadedUrl,
                filename: file.name,
              },
            ])

            onSuccess?.(successfulUrls)

            URL.revokeObjectURL(blobUrl)
            imageUrlsRef.current = imageUrlsRef.current.filter(
              (url) => url !== blobUrl
            )

            abortControllersRef.current.delete(key)
          } catch (error: any) {
            if (axios.isCancel(error)) {
              console.log("Upload cancelled for file:", file.name)
            } else {
              const errorMessage =
                error.response?.data?.message || "Upload failed"
              setUploadProgress((prev) =>
                prev.map((item) =>
                  item.key === key ? { ...item, progress: "ERROR" } : item
                )
              )
              onError?.(errorMessage)
              setError(errorMessage)
            }
          }
        })
      )
    } catch (error) {
      console.error("Error in multiple file upload:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const cancelAllUploads = () => {
    abortControllersRef.current.forEach((controller) => {
      controller.abort()
    })
    abortControllersRef.current.clear()
    setUploadProgress([])
    setUploadResults([])
    setIsUploading(false)
    setError(null)
  }

  const resetUploads = () => {
    setUploadProgress([])
    setUploadResults([])
    setIsUploading(false)
    setError(null)
  }

  return {
    uploadMultipleFiles,
    uploadProgress,
    uploadResults,
    isUploading,
    error,
    cancelAllUploads,
    resetUploads,
  }
}
