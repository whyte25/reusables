import { ReactNode } from "react"
import { ToastProvider } from "@/packages/notify/src/notify-provider"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { RootProvider } from "fumadocs-ui/provider"

import { PostHogProvider } from "./posthog-provider"

interface ProviderProps {
  children: ReactNode
}

export default function AppProvider({ children }: ProviderProps) {
  return (
    <PostHogProvider>
      <RootProvider>
        <ToastProvider>{children}</ToastProvider>
      </RootProvider>
      <Analytics />
      <SpeedInsights />
    </PostHogProvider>
  )
}
