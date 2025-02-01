"use client";

import PDFViewerTabs from "../reusables/pdf-viewers/pdf-viewer-tabs";

export default function PDFViewerDemo() {
  const samplePdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

  return <PDFViewerTabs url={samplePdfUrl} />;
}
