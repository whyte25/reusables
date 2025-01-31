"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { File, UploadCloudIcon, X } from "lucide-react";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

export const formatFileSize = (bytes: number) => {
  if (typeof bytes !== "number") return "0 B";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"] as const;
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const size = Number((bytes / Math.pow(1024, exponent)).toFixed(2));
  return `${size} ${units[exponent]}`;
};

const dropzoneVariants = cva(
  "relative flex justify-center items-center flex-col cursor-pointer transition-all duration-300 ease-in-out border-2 border-dashed rounded-lg",
  {
    variants: {
      variant: {
        base: "border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500",
        active: "border-gray-400 dark:border-gray-500",
        disabled:
          "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-not-allowed",
        accept:
          "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20",
        reject:
          "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20",
        image:
          "border-0 p-0 w-full h-full relative  shadow-md bg-slate-200 dark:bg-slate-900 rounded-md aspect-square",
      },
    },
    defaultVariants: {
      variant: "base",
    },
  }
);

export type FileState = {
  file: File | string;
  key: string;
  progress: "PENDING" | "COMPLETE" | "ERROR" | number;
};

type InputProps = {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
  isDirectUpload?: boolean;
  onUpload?: (files: File[]) => void | Promise<void>;
  width?: string;
  height?: string;
  displayMode?: "grid" | "list";
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const MultiImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      dropzoneOptions,
      value,
      className,
      disabled,
      onChange,
      onFilesAdded,
      isDirectUpload,
      onUpload,
      width = "100%",
      height = "240px",
      displayMode = "grid",
    } = props;

    const [customError, setCustomError] = React.useState<string>();

    const imageUrls = React.useMemo(() => {
      if (value) {
        return value.map((fileState) => {
          if (typeof fileState.file === "string") {
            // in case an url is passed in, use it to display the image
            return fileState.file;
          } else {
            // in case a file is passed in, create a base64 url to display the image
            return URL.createObjectURL(fileState.file);
          }
        });
      }
      return [];
    }, [value]);

    const handleDrop = async (acceptedFiles: File[]) => {
      const files = acceptedFiles;
      setCustomError(undefined);

      if (
        dropzoneOptions?.maxFiles &&
        (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
      ) {
        setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
        return;
      }

      if (files) {
        const addedFiles = files.map<FileState>((file) => ({
          file,
          key: Math.random().toString(36).slice(2),
          progress: "PENDING",
        }));

        if (isDirectUpload && onUpload) {
          await onUpload(files);
        }

        void onFilesAdded?.(addedFiles);
        void onChange?.([...(value ?? []), ...addedFiles]);
      }
    };

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      disabled,
      onDrop: handleDrop,
      ...dropzoneOptions,
    });

    // Update the variant logic
    const variant = React.useMemo(() => {
      if (disabled) return "disabled";
      if (isDragReject) return "reject";
      if (isDragAccept) return "accept";
      if (isFocused) return "active";
      return "base";
    }, [isFocused, isDragAccept, isDragReject, disabled]);

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div className="w-full space-y-4">
        <div
          {...getRootProps()}
          className={cn(dropzoneVariants({ variant }), className)}
          style={{ width, height }}
        >
          <input ref={ref} {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <UploadCloudIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Drop your images here
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {dropzoneOptions?.maxFiles &&
                `Max ${dropzoneOptions.maxFiles} files, `}
              {dropzoneOptions?.maxSize &&
                `up to ${formatFileSize(dropzoneOptions.maxSize)}`}
            </div>
            <button
              type="button"
              disabled={disabled}
              className="rounded-full bg-gray-800 dark:bg-gray-200 px-4 py-1.5 text-sm font-medium text-white dark:text-gray-800"
            >
              Browse
            </button>
          </div>
        </div>

        {displayMode === "grid" ? (
          <div className="grid grid-cols-[repeat(1,1fr)] gap-4 sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)]">
            {/* Images */}
            {value?.map(({ file, progress }, index) => (
              <div
                key={index}
                className={dropzoneVariants({ variant: "image" })}
              >
                <div className="h-full w-full  rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                  {typeof file !== "string" ? (
                    <img
                      src={imageUrls[index]}
                      alt={file.name}
                      className="h-full w-full m-0 object-cover"
                    />
                  ) : (
                    <File className="h-full w-full p-2 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                {/* Progress Bar */}
                {typeof progress === "number" && (
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-md bg-black bg-opacity-70">
                    <CircleProgress progress={progress} />
                  </div>
                )}
                {/* Remove Image Icon */}
                {imageUrls[index] && !disabled && progress === "PENDING" && (
                  <div
                    className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      void onChange?.(
                        value.filter((_, i) => i !== index) ?? []
                      );
                    }}
                  >
                    <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                      <X
                        className="text-gray-500 dark:text-gray-400"
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {value?.map(({ file, progress, key }, index) => (
              <div
                key={key}
                className="group relative flex items-center justify-between p-3 bg-zinc-900/5 dark:bg-white/5 rounded-lg hover:bg-zinc-900/10 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center min-w-0 flex-1">
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">
                        {typeof file === "string" ? file : file.name}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {typeof file !== "string" && formatFileSize(file.size)}
                      </span>
                    </div>
                    <div className="flex flex-wrap  items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>
                        {typeof file !== "string"
                          ? `image/${
                              file.name.split(".").pop()?.toLowerCase() ||
                              "unknown"
                            }`
                          : "image/unknown"}
                      </span>
                      <span>•</span>
                      <span>modified {new Date().toLocaleDateString()}</span>
                    </div>
                    {typeof progress === "number" && (
                      <div className="mt-2">
                        <LinearProgress progress={progress} />
                      </div>
                    )}
                  </div>
                </div>
                {!disabled && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange?.(value.filter((_, i) => i !== index));
                    }}
                    className="ml-4 p-1 rounded-lg hover:bg-zinc-900/10 dark:hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-1 text-xs text-red-500">
          {customError ?? errorMessage}
        </div>
      </div>
    );
  }
);
MultiImageDropzone.displayName = "MultiImageDropzone";

export { MultiImageDropzone };

function CircleProgress({ progress }: { progress: number }) {
  const strokeWidth = 10;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative h-16 w-16">
      <svg
        className="absolute top-0 left-0 -rotate-90 transform"
        width="100%"
        height="100%"
        viewBox={`0 0 ${(radius + strokeWidth) * 2} ${
          (radius + strokeWidth) * 2
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="text-gray-400"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
        />
        <circle
          className="text-white stroke-green-600 transition-all duration-300 ease-in-out"
          stroke=""
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={((100 - progress) / 100) * circumference}
          strokeLinecap="round"
          fill="none"
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
        />
      </svg>
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center text-xs text-white">
        {Math.round(progress)}%
      </div>
    </div>
  );
}

function LinearProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-600 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
