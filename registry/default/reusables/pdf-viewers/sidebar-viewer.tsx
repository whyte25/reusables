"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useScreenSize from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { ChevronLeft, ChevronRight, List, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { LoadingSpinner } from "./loading-spinner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const resizeObserverOptions = {};
const maxWidth = 800;

interface SidebarViewerProps {
  url: string;
}

export const SidebarViewer = ({ url }: SidebarViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [pageHeight, setPageHeight] = useState<number>(0);
  const { isMobile } = useScreenSize();

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

  // Update the width calculation to consider sidebar visibility
  const pageWidth = containerWidth
    ? Math.min(containerWidth - (showSidebar ? 256 + 16 : 0), maxWidth)
    : maxWidth;

  return (
    <div
      className={cn(
        "relative flex min-h-[600px] w-full max-w-6xl mx-auto",
        "bg-background rounded-lg shadow-lg overflow-hidden",
        showSidebar ? "gap-4" : "gap-0"
      )}
      ref={setContainerRef}
    >
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/50 z-40"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative inset-y-0 left-0 w-64 bg-secondary/30 border-r z-50",
          "transform transition-transform duration-300 ease-in-out",
          showSidebar ? "translate-x-0" : "-translate-x-full",
          !showSidebar && "md:-translate-x-full hidden"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b backdrop-blur-sm">
          <h2 className="font-medium text-foreground">Table of Contents</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(false)}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="p-4">
            {Array.from(new Array(numPages), (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setPageNumber(index + 1);
                  if (isMobile) {
                    setShowSidebar(false);
                  }
                }}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg transition-colors",
                  pageNumber === index + 1
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary/50"
                )}
              >
                Page {index + 1}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 min-w-0 p-4 transition-all  duration-300",
          !showSidebar && "md:pl-4"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setShowSidebar((prev) => !prev);
            }}
            className={cn("h-8 w-8")}
          >
            <List className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm font-medium min-w-[80px] text-center">
              {pageNumber} / {numPages || "-"}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPageNumber((p) => Math.min(numPages || p, p + 1))
              }
              disabled={pageNumber >= (numPages || 1)}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center" style={{ minHeight: pageHeight }}>
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<LoadingSpinner />}
            className={cn(
              "flex justify-center",
              "[&_.react-pdf__Page]:my-0",
              "dark:[&_.react-pdf__Page]:invert dark:[&_.react-pdf__Page]:brightness-90"
            )}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-sm rounded-lg"
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
  );
};
