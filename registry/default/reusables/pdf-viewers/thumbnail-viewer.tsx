"use client";

import { cn } from "@/lib/utils";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { LoadingSpinner } from "./loading-spinner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const resizeObserverOptions = {};
const maxWidth = 800;
const thumbnailScale = 0.2; // Scale for thumbnails

interface ThumbnailViewerProps {
  url: string;
}

export const ThumbnailViewer = ({ url }: ThumbnailViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(800);
  const [pageHeight, setPageHeight] = useState(0);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Calculate main viewer width based on container width
  const mainViewerWidth = containerWidth
    ? Math.min(containerWidth - 120, maxWidth) // 120px for thumbnail column + gap
    : maxWidth;

  // Calculate thumbnail width
  const thumbnailWidth = Math.min(96, mainViewerWidth * thumbnailScale);

  return (
    <div className="w-full max-w-6xl mx-auto" ref={setContainerRef}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails */}
        <div
          className={cn(
            "flex md:flex-col gap-2 p-4 overflow-auto",
            "bg-white/50 backdrop-blur-sm rounded-xl shadow-lg",
            "md:w-48"
          )}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <button
              key={index}
              onClick={() => setPageNumber(index + 1)}
              className={cn(
                "relative rounded-lg overflow-hidden transition-all",
                "hover:ring-2 hover:ring-primary/50",
                pageNumber === index + 1 && "ring-2 ring-primary"
              )}
            >
              <Document file={url}>
                <Page
                  pageNumber={index + 1}
                  width={150}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={<LoadingSpinner minHeight="100px" />}
                />
              </Document>
            </button>
          ))}
        </div>

        {/* Main Viewer */}
        <div className="flex-1 min-w-0">
          <div
            className="flex justify-center"
            style={{ minHeight: pageHeight }}
          >
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<LoadingSpinner />}
              className={cn(
                "flex flex-col items-center",
                "[&_.react-pdf__Page]:my-0"
              )}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-xl rounded-lg"
                width={pageWidth}
                loading={
                  <LoadingSpinner
                    minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                    spinnerClassName="dark:text-black"
                  />
                }
                onLoadSuccess={(page) => {
                  setPageHeight(page.height * (pageWidth / page.width));
                }}
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};
