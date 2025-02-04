import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { siteConfig } from "@/constant/site-config"
import { ToastProvider } from "@/registry/default/reusables/ui/notify-provider"

import "fumadocs-twoslash/twoslash.css"

import type { ReactNode } from "react"
import { Metadata } from "next"
import { RootProvider } from "fumadocs-ui/provider"

import "./global.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.author_url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@fasifeoluwa",
  },
  icons: {
    icon: "/favicon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <ToastProvider>{children}</ToastProvider>
        </RootProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
