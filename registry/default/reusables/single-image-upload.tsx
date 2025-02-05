"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { UploadCloud, X } from "lucide-react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"

import { cn } from "@/lib/utils"

export const formatFileSize = (bytes: number) => {
  if (typeof bytes !== "number") return "0 B"
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"] as const
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  )
  const size = Number((bytes / Math.pow(1024, exponent)).toFixed(2))
  return `${size} ${units[exponent]}`
}

const dropzoneVariants = cva(
  "relative mx-auto flex max-w-3xl cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        base: "border-gray-300 bg-white hover:border-gray-400 dark:border-gray-600 dark:bg-transparent dark:hover:border-gray-500 dark:hover:bg-gray-800",
        image: "border-transparent bg-transparent",
        active: "border-gray-400 dark:border-gray-500",
        disabled:
          "cursor-not-allowed border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700",
        accept:
          "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20",
        reject:
          "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20",
      },
    },
    defaultVariants: {
      variant: "base",
    },
  }
)

type ProgressType = "linear" | "circular"

type InputProps = {
  width?: string
  height?: string
  className?: string
  value?: File | string
  onChange?: (file?: File) => void | Promise<void>
  disabled?: boolean
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">
  directUpload?: boolean
  progress?: number
  progressType?: ProgressType
}

const ERROR_MESSAGES = {
  fileTooLarge: (maxSize: number) =>
    `File too large. Max size: ${formatFileSize(maxSize)}.`,
  fileInvalidType: () => "Invalid file type.",
  tooManyFiles: (maxFiles: number) => `Max ${maxFiles} file(s) allowed.`,
  fileNotSupported: () => "File type not supported.",
}

export const SingleImageDropzone = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      dropzoneOptions,
      width = "100%",
      height = "300px",
      value,
      className,
      disabled,
      onChange,
      directUpload = true,
      progress,
      progressType = "linear",
    },
    ref
  ) => {
    const [localValue, setLocalValue] = React.useState<File | undefined>(
      undefined
    )

    // Sync localValue with form value
    React.useEffect(() => {
      if (!value) {
        setLocalValue(undefined)
      }
    }, [value])

    const imageUrl = React.useMemo(() => {
      const fileToUse = directUpload ? localValue : value
      if (typeof fileToUse === "string") return fileToUse
      if (fileToUse instanceof File) return URL.createObjectURL(fileToUse)
      return null
    }, [value, localValue, directUpload])

    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (!file) return

        setLocalValue(file)
        void onChange?.(file)
      },
      [onChange]
    )

    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      disabled,
      onDrop,
      ...dropzoneOptions,
    })

    const variant = React.useMemo(() => {
      if (imageUrl) return "image"
      if (disabled) return "disabled"
      if (isDragReject || fileRejections.length) return "reject"
      if (isDragAccept) return "accept"
      if (isFocused) return "active"
      return "base"
    }, [
      isFocused,
      imageUrl,
      fileRejections,
      isDragAccept,
      isDragReject,
      disabled,
    ])

    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0]
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0)
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType()
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0)
        } else {
          return ERROR_MESSAGES.fileNotSupported()
        }
      }
      return undefined
    }, [fileRejections, dropzoneOptions])

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      setLocalValue(undefined)
      void onChange?.(undefined)
    }

    return (
      <div className="w-full">
        <div
          {...getRootProps({
            className: cn(dropzoneVariants({ variant }), className),
            style: { width, height },
          })}
        >
          <input ref={ref} {...getInputProps()} />

          {imageUrl ?
            <div className="group relative h-full w-full overflow-hidden rounded-lg">
              <img
                className="my-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={imageUrl}
                alt={acceptedFiles[0]?.name}
              />

              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black",
                  progress ? "bg-opacity-90" : (
                    "bg-opacity-20 group-hover:bg-opacity-90"
                  )
                )}
              >
                {progress ?
                  <>
                    {progressType === "linear" && (
                      <span className="duration-[3000ms] animate-pulse text-lg font-medium text-white transition-opacity">
                        Uploading...
                      </span>
                    )}
                    <ProgressIndicator
                      progress={progress}
                      type={progressType}
                    />
                  </>
                : <span className="text-lg font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Replace image
                  </span>
                }
              </div>
            </div>
          : <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-700">
                <UploadCloud className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Drag & drop your image here
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">or</div>
              <button
                type="button"
                disabled={disabled}
                className="rounded-full bg-gray-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 dark:disabled:bg-gray-600"
              >
                Browse files
              </button>
            </div>
          }

          {imageUrl && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-2 rounded-full bg-white p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </div>
        )}
      </div>
    )
  }
)

SingleImageDropzone.displayName = "SingleImageDropzone"

const ProgressIndicator = ({
  progress = 0,
  type = "linear",
}: {
  progress: number
  type?: ProgressType
}) => {
  if (type === "circular") {
    return (
      <div className="relative h-16 w-16">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle
            className="stroke-gray-300 dark:stroke-gray-600"
            fill="none"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="8"
          />
          <circle
            className="stroke-green-600 transition-all duration-300 ease-out"
            fill="none"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.82743}, 282.743`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full bg-green-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
