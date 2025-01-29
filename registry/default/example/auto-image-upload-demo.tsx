"use client";

import { toast } from "@/components/ui/notify-provider";
import useFileUpload from "@/hooks/use-file-upload";
import { SingleImageDropzone } from "../reusables/single-image-upload";

export default function AutoImageUploadDemo() {
  const autoUpload = useFileUpload({
    onSuccess: () => toast.success(" Upload SuccessFul"),
    onError: (error) => toast.error(error),
  });

  return (
    <div className="space-y-4 w-full px-5 md:px-7 py-12 md:py-0">
      <SingleImageDropzone
        width={"100%"}
        height={"300px"}
        directUpload={true}
        progress={autoUpload.progress}
        disabled={autoUpload.isUploading}
        onChange={async (file) => {
          if (file) {
            try {
              await autoUpload.handleFileUpload(file);
            } catch (error) {
              console.error("Upload error:", error);
            }
          }
        }}
      />

      {autoUpload.error && (
        <p className="text-red-500">Error: {autoUpload.error}</p>
      )}
    </div>
  );
}
