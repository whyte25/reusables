"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import { FullscreenViewer } from "../reusables/pdf-viewers/fullscreen-viewer"

export default function FullscreenViewerDemo() {
  const [showPDF, setShowPDF] = useState(false)
  const samplePdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"

  return (
    <div>
      <Button onClick={() => setShowPDF(true)}>Open PDF in Fullscreen</Button>
      {showPDF && (
        <FullscreenViewer
          url={samplePdfUrl}
          onClose={() => setShowPDF(false)}
        />
      )}
    </div>
  )
}
