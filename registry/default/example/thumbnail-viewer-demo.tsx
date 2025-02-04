"use client"

import { ThumbnailViewer } from "../reusables/pdf-viewers/thumbnail-viewer"

export default function ThumbnailViewerDemo() {
  const samplePdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"

  return <ThumbnailViewer url={samplePdfUrl} />
}
