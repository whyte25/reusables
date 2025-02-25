"use client"

import { CompactViewer } from "../reusables/pdf-viewers/compact-viewer"

export default function CompactViewerDemo() {
  const samplePdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"

  return <CompactViewer url={samplePdfUrl} />
}
