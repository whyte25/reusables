"use client"

import { useEffect } from "react"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

import { env } from "@/env"

import SuspendedPostHogPageView from "./posthog-pageview"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === "development"

  // In development, return children directly
  if (isDevelopment) {
    return <>{children}</>
  }

  // Only initialize PostHog in production
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
      person_profiles: "always",
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}
