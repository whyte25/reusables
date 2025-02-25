"use client"

import Image from "next/image"
import { Upload, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function FileUploadDemo() {
  const {
    handleFileUpload,
    cancelUpload,
    selectedFile,
    isUploading,
    progress,
    error,
    data,
  } = useFileUpload()

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="flex w-full items-center justify-center">
        {data ?
          <Image
            height={1000}
            width={1000}
            src={data}
            alt="image"
            className="h-full max-h-[400px] object-cover"
          />
        : <label
            className={cn(
              `flex w-full cursor-pointer flex-col items-center justify-center rounded-lg`
            )}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <Upload className="mb-3 h-10 w-10 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload image</span>
              </p>
              <p className="text-xs text-gray-500">Any file up to 5MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files?.[0]!)}
              disabled={isUploading}
            />
          </label>
        }
      </div>

      {(isUploading || selectedFile) && !data && (
        <div className="space-y-3 rounded-lg border bg-background p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {selectedFile?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile?.size! / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {isUploading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelUpload}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {isUploading && <Progress value={progress} className="h-2" />}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  )
}
