import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"

import { siteConfig } from "@/constant/site-config"
import { source } from "@/lib/source"
import { baseOptions } from "@/app/layout.config"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      githubUrl={siteConfig.links.github}
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        collapsible: false,
        prefetch: false,
      }}
    >
      {children}
    </DocsLayout>
  )
}
