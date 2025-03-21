"use client"

import { useCallback, useState } from "react"
import { useResizeObserver } from "@wojtekmaj/react-hooks"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { LoadingSpinner } from "./loading-spinner"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const resizeObserverOptions = {}
const maxWidth = 800

interface CompactViewerProps {
  url: string
}

export const CompactViewer = ({ url }: CompactViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()
  const [pageHeight, setPageHeight] = useState<number>(0)

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

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset
      return numPages ?
          Math.min(Math.max(1, newPageNumber), numPages)
        : prevPageNumber
    })
  }

  // Calculate page width based on container
  const pageWidth =
    containerWidth ? Math.min(containerWidth - 48, maxWidth) : maxWidth

  return (
    <div
      className="mx-auto w-full max-w-4xl rounded-xl bg-background/50 p-6 shadow-lg backdrop-blur-sm"
      ref={setContainerRef}
    >
      <div className="flex flex-col gap-6">
        {/* PDF Viewer */}
        <div className="flex justify-center" style={{ minHeight: pageHeight }}>
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <LoadingSpinner
                minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                minWidth={pageWidth ? `${pageWidth}px` : "800px"}
                spinnerClassName="text-white dark:text-white"
              />
            }
            className={cn(
              "flex flex-col items-center",
              "[&_.react-pdf__Page]:my-0",
              "[&_.react-pdf__Page__canvas]:max-w-full",
              "[&_.react-pdf__Page__canvas]:h-auto",
              "dark:[&_.react-pdf__Page]:brightness-90 dark:[&_.react-pdf__Page]:invert"
            )}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10"
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

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-3 py-2">
          <div className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 shadow-sm ring-1 ring-black/5 backdrop-blur-sm dark:ring-white/10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="h-8 w-8 rounded-full hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex min-w-[90px] items-center justify-center gap-1.5">
              <span className="text-sm font-medium text-foreground">
                {pageNumber}
              </span>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground">
                {numPages || "-"}
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => changePage(1)}
              disabled={pageNumber >= (numPages || 1)}
              className="h-8 w-8 rounded-full hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
