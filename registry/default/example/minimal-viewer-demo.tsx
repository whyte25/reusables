"use client"

import { MinimalViewer } from "../reusables/pdf-viewers/minimal-viewer"

export default function MinimalViewerDemo() {
  const samplePdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"

  return <MinimalViewer url={samplePdfUrl} />
}
