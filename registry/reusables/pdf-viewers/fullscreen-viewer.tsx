"use client"

import { useEffect, useRef, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { LoadingSpinner } from "./loading-spinner"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

interface FullscreenViewerProps {
  url: string
  onClose?: () => void
}
const maxWidth = 800

export const FullscreenViewer = ({ url, onClose }: FullscreenViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1)
  const [pageHeight, setPageHeight] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>(maxWidth)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // Initialize width
    setContainerWidth(el.clientWidth)
    // Observe size changes
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setContainerWidth(Math.floor(entry.contentRect.width))
        }
      }
    })
    ro.observe(el)
    // Fallback on window resize (older browsers)
    const handleResize = () => setContainerWidth(el.clientWidth)
    window.addEventListener("resize", handleResize)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const pageWidth = Math.min(containerWidth, maxWidth)

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-100 dark:bg-gray-900">
      <div className="sticky top-0 z-10 border-b bg-white shadow-sm dark:bg-gray-600">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-2">
          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-2 md:gap-4"
            )}
          >
            {/* Navigation Controls */}
            <div className={cn("w flex items-center gap-2", "mx-auto md:mx-0")}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
                className="rounded-full dark:border-white/10 dark:bg-white/10 dark:backdrop-blur-sm dark:hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-sm font-medium">
                <span className="md:hidden">
                  {pageNumber} / {numPages || "-"}
                </span>
                <span className="hidden md:inline">
                  Page {pageNumber} of {numPages || "-"}
                </span>
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setPageNumber((p) => Math.min(numPages || p, p + 1))
                }
                disabled={pageNumber >= (numPages || 1)}
                className="rounded-full dark:border-white/10 dark:bg-white/10 dark:backdrop-blur-sm dark:hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className={cn("flex items-center gap-2", "mx-auto md:mx-0")}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                className="rounded-full text-sm hover:opacity-90 dark:border-white/10 dark:bg-white/10 dark:text-white dark:backdrop-blur-sm dark:hover:bg-white/20"
                disabled={scale <= 0.5}
                aria-label="Zoom Out"
              >
                <span className="md:hidden">
                  <ZoomOut className="h-4 w-4" />
                </span>
                <span className="hidden md:inline">Zoom Out</span>
              </Button>
              <span className="min-w-[35px] text-center text-sm font-medium">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setScale((s) => Math.min(2, s + 0.1))}
                className="rounded-full text-sm hover:opacity-90 dark:border-white/10 dark:bg-white/10 dark:text-white dark:backdrop-blur-sm dark:hover:bg-white/20"
                disabled={scale >= 2}
                aria-label="Zoom In"
              >
                <span className="md:hidden">
                  <ZoomIn className="h-4 w-4" />
                </span>
                <span className="hidden md:inline">Zoom In</span>
              </Button>

              {/* Download Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(url, "_blank")}
                className={cn(
                  "ml-2 h-8 w-8 rounded-full",
                  "hover:opacity-90 dark:bg-white/10 dark:text-white",
                  "dark:border-white/10 dark:backdrop-blur-sm dark:hover:bg-white/20",
                  "transition-all duration-200 ease-in-out"
                )}
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </Button>

              {/* Close Button */}
              {onClose && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClose}
                  className={cn(
                    "ml-2 h-8 w-8 rounded-full",
                    "hover:opacity-90 dark:bg-white/10 dark:text-white",
                    "dark:border-white/10 dark:backdrop-blur-sm dark:hover:bg-white/20",
                    "transition-all duration-200 ease-in-out"
                  )}
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center p-4 md:p-8" ref={containerRef}>
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
              "[&_.react-pdf__Page__canvas]:h-auto"
            )}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="rounded-lg shadow-xl"
              width={pageWidth * scale}
              loading={
                <LoadingSpinner
                  minHeight={pageHeight ? `${pageHeight}px` : "600px"}
                  minWidth={pageWidth ? `${pageWidth}px` : "800px"}
                  spinnerClassName="dark:text-black"
                />
              }
              onLoadSuccess={(page) => {
                setPageHeight(page.height * (pageWidth / page.width) * scale)
              }}
            />
          </Document>
        </div>
      </div>
    </div>
  )
}
