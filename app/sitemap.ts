import sitemap from "@/lib/sitemap";
import { MetadataRoute } from "next";

export default async function SitemapRoute(): Promise<MetadataRoute.Sitemap> {
  return sitemap();
}
