import { siteConfig } from "@reusables/config";
import { AppProvider } from "@reusables/provider";
import "@reusables/ui/styles.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import React from "react";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope-sans",
});

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.title}`,
    default: siteConfig.title,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
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
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.title.toLocaleLowerCase()}`,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
