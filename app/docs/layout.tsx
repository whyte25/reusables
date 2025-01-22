import { baseOptions } from "@/app/layout.config";
import { siteConfig } from "@/constant/site-config";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

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
  );
}
