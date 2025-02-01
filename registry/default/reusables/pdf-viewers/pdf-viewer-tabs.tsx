"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompactViewer } from "./compact-viewer";
import { FullscreenViewer } from "./fullscreen-viewer";
import { HoverNavigationViewer } from "./hover-navigation-viewer";
import { MinimalViewer } from "./minimal-viewer";
import { SidebarViewer } from "./sidebar-viewer";
import { ThumbnailViewer } from "./thumbnail-viewer";

const PDFViewerTabs = ({ url }: { url: string }) => {
  const samplePdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 overflow-hidden">
      <Tabs defaultValue="hover" className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-4">
          <TabsTrigger value="hover">Hover Nav</TabsTrigger>
          <TabsTrigger value="minimal">Minimal</TabsTrigger>
          <TabsTrigger value="fullscreen">Fullscreen</TabsTrigger>
          <TabsTrigger value="thumbnail">Thumbnails</TabsTrigger>
          <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
          <TabsTrigger value="compact">Compact</TabsTrigger>
        </TabsList>

        <div className="relative w-full mt-10 overflow-hidden rounded-lg">
          <TabsContent value="hover">
            <HoverNavigationViewer url={samplePdfUrl} />
          </TabsContent>

          <TabsContent value="minimal">
            <MinimalViewer url={samplePdfUrl} />
          </TabsContent>

          <TabsContent value="fullscreen">
            <FullscreenViewer
              url={samplePdfUrl}
              onClose={() => {
                const hoverTab = document.querySelector(
                  '[value="hover"]'
                ) as HTMLButtonElement;
                if (hoverTab) hoverTab.click();
              }}
            />
          </TabsContent>

          <TabsContent value="thumbnail">
            <ThumbnailViewer url={samplePdfUrl} />
          </TabsContent>

          <TabsContent value="sidebar">
            <SidebarViewer url={samplePdfUrl} />
          </TabsContent>

          <TabsContent value="compact">
            <CompactViewer url={samplePdfUrl} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PDFViewerTabs;
