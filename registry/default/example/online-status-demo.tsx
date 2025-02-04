"use client"

import { RefreshCcw, Signal, WifiIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import useOnlineStatus from "../hooks/use-online-status"

export default function NetworkStatusMonitor() {
  const {
    isOnline,
    lastChanged,
    connectionQuality,
    latency,
    checkConnectionNow,
    retryConnection,
    isRetrying,
  } = useOnlineStatus()

  return (
    <div className="mx-auto rounded-xl border border-gray-200/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="my-0 text-lg font-semibold">Network Status</h2>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              isOnline ?
                "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
            }`}
          >
            <WifiIcon className="mr-2 inline h-4 w-4" />
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <div className="grid gap-4 rounded-lg bg-gray-50/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Quality</span>
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4" />
              <span className="font-medium">{connectionQuality}</span>
              {latency > 0 && (
                <span className="ml-2 text-sm">{latency.toFixed(0)}ms</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-500">Last Updated</span>
            <span className="font-medium">
              {new Date(lastChanged).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {isOnline ?
            <Button
              onClick={checkConnectionNow}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />
              Check Now
            </Button>
          : <Button onClick={retryConnection}>
              <WifiIcon className="h-4 w-4 shrink-0" />
              Retry
            </Button>
          }
        </div>
      </div>
    </div>
  )
}
