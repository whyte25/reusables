"use client"

import { SidebarViewer } from "../reusables/pdf-viewers/sidebar-viewer"

export default function SidebarViewerDemo() {
  const samplePdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"

  return <SidebarViewer url={samplePdfUrl} />
}
