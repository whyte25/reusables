"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { LoadingSpinner } from "./loading-spinner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface FullscreenViewerProps {
  url: string;
  onClose?: () => void;
}
const maxWidth = 800;

export const FullscreenViewer = ({ url }: FullscreenViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [pageHeight, setPageHeight] = useState<number>(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setScale(isMobile ? 0.5 : 1);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const pageWidth = containerWidth
    ? Math.min(containerWidth - 48, maxWidth)
    : maxWidth;

  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 z-50 overflow-auto">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-600 border-b shadow-sm">
        <div className="w-full max-w-[1400px] mx-auto px-4 py-2">
          <div
            className={cn(
              "flex flex-col md:flex-row md:items-center justify-between gap-4"
            )}
          >
            {/* Navigation Controls */}
            <div className={cn("flex items-center gap-2", "mx-auto md:mx-0")}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
                className="dark:bg-white/10 dark:backdrop-blur-sm dark:hover:bg-white/20 dark:border-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-sm font-medium min-w-[80px] text-center">
                Page {pageNumber} of {numPages || "-"}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setPageNumber((p) => Math.min(numPages || p, p + 1))
                }
                disabled={pageNumber >= (numPages || 1)}
                className="dark:bg-white/10 dark:backdrop-blur-sm dark:hover:bg-white/20 dark:border-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className={cn("flex items-center gap-2", "mx-auto md:mx-0")}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                className="text-sm whitespace-nowrap dark:bg-white/10 dark:text-white hover:opacity-90 dark:backdrop-blur-sm dark:hover:bg-white/20 dark:border-white/10 rounded-full"
                disabled={scale <= 0.5}
              >
                Zoom Out
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setScale((s) => Math.min(2, s + 0.1))}
                className="text-sm whitespace-nowrap dark:bg-white/10 dark:text-white hover:opacity-90 dark:backdrop-blur-sm dark:hover:bg-white/20 dark:border-white/10 rounded-full"
                disabled={scale >= 2}
              >
                Zoom In
              </Button>

              {/* Download Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(url, "_blank")}
                className={cn(
                  "ml-2 h-8 w-8 rounded-full",
                  "dark:bg-white/10 dark:text-white hover:opacity-90",
                  "dark:backdrop-blur-sm dark:hover:bg-white/20 dark:border-white/10",
                  "transition-all duration-200 ease-in-out"
                )}
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center p-4 md:p-8" ref={setContainerRef}>
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
              "flex flex-col items-center",
              "[&_.react-pdf__Page]:my-0",
              "[&_.react-pdf__Page__canvas]:max-w-full",
              "[&_.react-pdf__Page__canvas]:h-auto"
            )}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-xl rounded-lg"
              width={pageWidth * scale}
              loading={
                <LoadingSpinner
                  minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                  minWidth={pageWidth ? `${pageWidth}px` : "800px"}
                  spinnerClassName="dark:text-black"
                />
              }
              onLoadSuccess={(page) => {
                setPageHeight(page.height * (pageWidth / page.width) * scale);
              }}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};
