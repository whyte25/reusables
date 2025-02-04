"use client"

import { useCallback, useState } from "react"
import { useResizeObserver } from "@wojtekmaj/react-hooks"
import { ChevronLeft, ChevronRight, List, X } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import useScreenSize from "@/registry/default/hooks/use-screen-size"

import { LoadingSpinner } from "./loading-spinner"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const resizeObserverOptions = {}
const maxWidth = 800

interface SidebarViewerProps {
  url: string
}

export const SidebarViewer = ({ url }: SidebarViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [showSidebar, setShowSidebar] = useState(false)
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()
  const [pageHeight, setPageHeight] = useState<number>(0)
  const { isMobile } = useScreenSize()

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries
    if (entry) {
      setContainerWidth(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const pageWidth =
    containerWidth ? Math.min(containerWidth - 48, maxWidth) : maxWidth

  return (
    <div
      className={cn(
        "relative mx-auto min-h-[600px] w-full max-w-6xl",
        "overflow-hidden rounded-lg bg-background shadow-lg"
      )}
      ref={setContainerRef}
    >
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="absolute inset-0 z-40 bg-black/20 dark:bg-black/50"
          onClick={() => setShowSidebar(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={cn(
          "absolute left-0 top-0 z-50 h-full w-64 border-r bg-background/95 backdrop-blur-sm",
          "transform transition-transform duration-300 ease-in-out",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="not-prose text-base font-medium text-foreground">
            Table of Contents
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(false)}
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
                  setPageNumber(index + 1)
                  setShowSidebar(false)
                }}
                className={cn(
                  "w-full rounded-lg px-4 py-2 text-left transition-colors",
                  pageNumber === index + 1 ?
                    "bg-primary text-primary-foreground"
                  : "hover:bg-secondary/50"
                )}
              >
                Page {index + 1}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>{" "}
      {/* Main Content */}
      <div className="w-full p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSidebar(true)}
            className="h-8 w-8"
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

            <span className="min-w-[80px] text-center text-sm font-medium">
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
            loading={
              <LoadingSpinner
                minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                minWidth={pageWidth ? `${pageWidth}px` : "800px"}
                spinnerClassName="dark:text-black"
              />
            }
            className={cn(
              "flex justify-center",
              "[&_.react-pdf__Page]:my-0",
              "dark:[&_.react-pdf__Page]:brightness-90 dark:[&_.react-pdf__Page]:invert"
            )}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="rounded-lg shadow-sm"
              width={pageWidth}
              loading={
                <LoadingSpinner
                  minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                  minWidth={pageWidth ? `${pageWidth}px` : "800px"}
                  spinnerClassName="dark:text-black"
                />
              }
              onLoadSuccess={(page) => {
                setPageHeight(page.height * (pageWidth / page.width))
              }}
            />
          </Document>
        </div>
      </div>
    </div>
  )
}
