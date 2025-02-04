"use client"

import { HoverNavigationViewer } from "../reusables/pdf-viewers/hover-navigation-viewer"

export default function HoverNavigationDemo() {
  const samplePdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"

  return <HoverNavigationViewer url={samplePdfUrl} />
}
