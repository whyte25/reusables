"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useFileUpload from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export default function FileUploadDemo() {
  const {
    handleFileUpload,
    cancelUpload,
    selectedFile,
    isUploading,
    progress,
    error,
    data,
  } = useFileUpload();

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-center w-full">
        {data ? (
          <Image
            height={400}
            width={1000}
            src={data}
            alt="image"
            className="max-h-[400px] h-full object-contain"
          />
        ) : (
          <label
            className={cn(
              `flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer`,
              isUploading ? "bg-gray-50" : "bg-gray-50 hover:bg-gray-100",
              error ? "border-red-500" : "border-gray-300"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
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
        )}
      </div>

      {(isUploading || selectedFile) && !data && (
        <div className="p-4 bg-background rounded-lg shadow-sm border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
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
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
