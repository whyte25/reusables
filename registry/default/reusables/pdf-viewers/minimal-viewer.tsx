"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { LoadingSpinner } from "./loading-spinner";

// Important: Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const resizeObserverOptions = {};
const maxWidth = 800;

interface MinimalViewerProps {
  url: string;
}

export const MinimalViewer = ({ url }: MinimalViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [pageHeight, setPageHeight] = useState<number>(0);

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

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return numPages
        ? Math.min(Math.max(1, newPageNumber), numPages)
        : prevPageNumber;
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        previousPage();
      } else if (event.key === "ArrowRight") {
        nextPage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const pageWidth = containerWidth
    ? Math.min(containerWidth - 48, maxWidth)
    : maxWidth;

  return (
    <div className="w-full max-w-4xl mx-auto" ref={setContainerRef}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-center" style={{ minHeight: pageHeight }}>
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <LoadingSpinner
                minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                minWidth={pageWidth ? `${pageWidth}px` : "800px"}
                spinnerClassName="dark:text-black"
              />
            }
            className={cn(
              "flex flex-col gap-2 md:gap-4 w-full items-center",
              "[&_.react-pdf__message]:p-5",
              "[&_.react-pdf__message]:text-white",
              "[&_.react-pdf__Page]:my-0"
            )}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg rounded-lg"
              width={pageWidth}
              loading={
                <LoadingSpinner
                  minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                  minWidth={pageWidth ? `${pageWidth}px` : "800px"}
                  spinnerClassName="dark:text-black"
                />
              }
              onLoadSuccess={(page) => {
                setPageHeight(page.height * (pageWidth / page.width));
              }}
            />
          </Document>
        </div>

        <div
          className={cn(
            "flex items-center justify-center mx-auto w-11/12 gap-4 mt-4 p-2",
            "bg-white/80 dark:bg-black/80 backdrop-blur rounded-full shadow-sm"
          )}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-sm font-medium">
            {pageNumber} / {numPages || "-"}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={numPages !== null && pageNumber >= numPages}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MinimalViewer;
