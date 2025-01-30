"use client";

import {
  FileState,
  MultiImageDropzone,
} from "@/components/multiple-image-upload";
import { Button } from "@/components/ui/button";
import { useMultipleFileUpload } from "@/hooks/use-multiple-file-upload";
import * as React from "react";

export default function ManualMultipleImageUploadDemo() {
  const [fileStates, setFileStates] = React.useState<FileState[]>([]);
  const { uploadMultipleFiles, uploadProgress, isUploading, error } =
    useMultipleFileUpload({
      onSuccess: (urls) => {
        console.log("Successfully uploaded files:", urls);
      },
      onError: (error) => {
        console.error("Upload error:", error);
      },
    });

  // Update file progress based on upload progress
  React.useEffect(() => {
    if (uploadProgress.length) {
      setFileStates((fileStates) => {
        const newFileStates = structuredClone(fileStates);
        uploadProgress.forEach(({ key, progress }) => {
          const fileState = newFileStates.find(
            (fileState) => fileState.key === key
          );
          if (fileState) {
            fileState.progress = progress;
          }
        });
        return newFileStates;
      });
    }
  }, [uploadProgress]);

  return (
    <div className="px-10 w-full">
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
          maxSize: 1024 * 1024 * 1, // 1 MB
        }}
        height="300px"
        displayMode="list"
        onChange={setFileStates}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
        }}
      />
      <Button
        className="mt-2"
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
            }));

          uploadMultipleFiles(pendingFiles);
        }}
        disabled={
          isUploading ||
          !fileStates.filter((fileState) => fileState.progress === "PENDING")
            .length
        }
      >
        Upload
      </Button>
      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  );
}
