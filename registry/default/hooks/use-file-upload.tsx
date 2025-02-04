"use client"

import { useRef, useState } from "react"
import axios from "axios"

interface UseFileUploadParams {
  onSuccess?: (url: string) => void
  onError?: (error: string) => void
}

const useFileUpload = ({ onSuccess, onError }: UseFileUploadParams = {}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [data, setData] = useState(null)

  const handleFileUpload = async (file: File | null) => {
    if (!file) {
      throw new Error("No file selected")
    }

    setSelectedFile(file)
    setIsUploading(true)
    setError(null)

    abortControllerRef.current = new AbortController()

    try {
      const formData = new FormData()
      formData.append("file", file)

      // TODO: Replace with your own API endpoint
      const response = await axios.post(
        `https://your-api-endpoint.com`,
        formData,
        {
          signal: abortControllerRef.current.signal,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            )
            setProgress(percentCompleted)
          },
        }
      )
      // TODO: Replace with your own API response
      const uploadedUrl = response?.data?.secure_url

      setData(uploadedUrl)
      onSuccess?.(uploadedUrl)
      setIsUploading(false)
      setProgress(0)
      abortControllerRef.current = null
    } catch (error: any) {
      if (axios.isCancel(error)) {
        const cancelMessage = "Upload cancelled"
        console.log(cancelMessage)
      } else {
        const errorMessage = error.response?.data?.message || "Upload failed"
        setError(errorMessage)
        onError?.(errorMessage)
      }
      setIsUploading(false)
      setSelectedFile(null)
      setProgress(0)
      setData(null)
      abortControllerRef.current = null
    }
  }

  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setSelectedFile(null)
    setIsUploading(false)
    setProgress(0)
    setError(null)
    setData(null)
  }

  return {
    selectedFile,
    isUploading,
    progress,
    error,
    handleFileUpload,
    cancelUpload,
    data,
  }
}

export default useFileUpload
