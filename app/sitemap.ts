import { MetadataRoute } from "next"

import sitemap from "@/lib/sitemap"

export default async function SitemapRoute(): Promise<MetadataRoute.Sitemap> {
  return sitemap()
}
