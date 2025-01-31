"use client";

import {
  FileState,
  MultiImageDropzone,
} from "@/components/multiple-image-upload";
import { useMultipleFileUpload } from "@/hooks/use-multiple-file-upload";
import * as React from "react";

export default function AutoMultipleImageUploadDemo() {
  const [fileStates, setFileStates] = React.useState<FileState[]>([]);

  const { uploadMultipleFiles, uploadProgress, error } = useMultipleFileUpload({
    onSuccess: (urls) => {
      console.log("Successfully uploaded files:", urls);
      // Update file states with uploaded URLs
      setFileStates((prevStates) =>
        prevStates.map((state, index) => ({
          ...state,
          file: urls[index] || state.file, // Replace File with URL string
          progress: "COMPLETE",
        }))
      );
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

  const handleUpload = async (files: File[]) => {
    // Create file states first to show immediate preview
    const newFileStates = files.map<FileState>((file) => ({
      file,
      key: Math.random().toString(36).slice(2),
      progress: "PENDING",
    }));

    // Update state to show previews immediately
    setFileStates((prev) => [...prev, ...newFileStates]);

    // Start upload
    const filesToUpload = newFileStates.map(({ key, file }) => ({
      key,
      file: file as File,
    }));

    await uploadMultipleFiles(filesToUpload);
  };

  return (
    <div className="px-10 w-full">
      <MultiImageDropzone
        value={fileStates}
        height="300px"
        dropzoneOptions={{
          maxFiles: 6,
          maxSize: 1024 * 1024 * 1, // 1 MB
        }}
        onChange={setFileStates}
        isDirectUpload
        onUpload={handleUpload}
      />
      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  );
}
