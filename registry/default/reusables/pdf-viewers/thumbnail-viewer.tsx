"use client"

import { useCallback, useState } from "react"
import { useResizeObserver } from "@wojtekmaj/react-hooks"
import { Document, Page, pdfjs } from "react-pdf"

import { cn } from "@/lib/utils"

import { LoadingSpinner } from "./loading-spinner"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const resizeObserverOptions = {}
const maxWidth = 800

interface ThumbnailViewerProps {
  url: string
}

export const ThumbnailViewer = ({ url }: ThumbnailViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()
  const [pageHeight, setPageHeight] = useState(0)

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

  // Calculate main viewer width based on container width
  const mainViewerWidth =
    containerWidth ? Math.min(containerWidth - 48, maxWidth) : maxWidth

  // Calculate thumbnail width - more responsive now
  const thumbnailWidth =
    containerWidth ? Math.min(120, containerWidth * 0.15) : 96

  return (
    <div className="mx-auto w-full max-w-6xl" ref={setContainerRef}>
      <div className={cn("flex flex-col gap-4 lg:flex-row")}>
        {/* Thumbnails */}
        <div
          className={cn(
            "flex gap-2 overflow-x-auto p-4",
            "lg:max-h-screen lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden",
            "rounded-xl bg-background/50 shadow-lg backdrop-blur-sm",
            "h-fit min-w-full max-w-full lg:min-w-[150px] lg:max-w-[150px]",
            "scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
          )}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <button
              key={index}
              onClick={() => setPageNumber(index + 1)}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-lg transition-all",
                "hover:ring-2 hover:ring-primary/50",
                "bg-background/50",
                pageNumber === index + 1 && "ring-2 ring-primary"
              )}
              style={{
                width: thumbnailWidth,
                height: thumbnailWidth * 1.4,
              }}
            >
              <Document file={url}>
                <Page
                  pageNumber={index + 1}
                  width={thumbnailWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={
                    <LoadingSpinner
                      minHeight={`${thumbnailWidth * 1.4}px`}
                      minWidth={`${thumbnailWidth}px`}
                      className="bg-muted"
                    />
                  }
                />
              </Document>
            </button>
          ))}
        </div>

        {/* Main Viewer */}
        <div className="min-w-0 flex-1 overflow-y-auto lg:max-h-screen">
          <div
            className="flex justify-center"
            style={{ minHeight: pageHeight }}
          >
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <LoadingSpinner
                  minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                  minWidth={mainViewerWidth ? `${mainViewerWidth}px` : "800px"}
                  spinnerClassName="dark:text-black"
                />
              }
              className={cn(
                "flex flex-col items-center",
                "[&_.react-pdf__Page]:my-0"
              )}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="rounded-lg shadow-xl"
                width={mainViewerWidth}
                loading={
                  <LoadingSpinner
                    minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                    minWidth={
                      mainViewerWidth ? `${mainViewerWidth}px` : "800px"
                    }
                    spinnerClassName="dark:text-black"
                  />
                }
                onLoadSuccess={(page) => {
                  setPageHeight(page.height * (mainViewerWidth / page.width))
                }}
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  )
}
