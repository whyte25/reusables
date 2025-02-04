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

interface HoverNavigationViewerProps {
  url: string
}

export const HoverNavigationViewer = ({ url }: HoverNavigationViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isHovering, setIsHovering] = useState(false)
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

  const pageWidth =
    containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth

  return (
    <div
      className="relative mx-auto w-full max-w-4xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={setContainerRef}
    >
      <div className="flex justify-center" style={{ minHeight: pageHeight }}>
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<LoadingSpinner />}
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="rounded-lg shadow-lg"
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

      {numPages && numPages > 1 && isHovering && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className={cn(
              "absolute left-2 top-1/2 z-50 -translate-y-1/2 rounded-full",
              "bg-white/90 shadow-lg transition-all duration-200 hover:bg-white dark:bg-white dark:text-black dark:hover:bg-white"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 1)}
            className={cn(
              "absolute right-2 top-1/2 z-50 -translate-y-1/2 rounded-full",
              "bg-white/90 shadow-lg transition-all duration-200 hover:bg-white dark:bg-white dark:text-black dark:hover:bg-white"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium shadow-lg dark:text-black">
            Page {pageNumber} of {numPages}
          </div>
        </>
      )}
    </div>
  )
}
