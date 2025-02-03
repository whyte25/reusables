"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw, Signal, WifiIcon } from "lucide-react";
import useOnlineStatus from "../hooks/use-online-status";

export default function NetworkStatusMonitor() {
  const {
    isOnline,
    lastChanged,
    connectionQuality,
    latency,
    checkConnectionNow,
    retryConnection,
    isRetrying,
  } = useOnlineStatus();

  return (
    <div className="p-6  mx-auto rounded-xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg my-0 font-semibold">Network Status</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isOnline
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <WifiIcon className="w-4 h-4 inline mr-2" />
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <div className="grid gap-4 p-4 rounded-lg bg-gray-50/5">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Quality</span>
            <div className="flex items-center gap-2">
              <Signal className="w-4 h-4 " />
              <span className="font-medium ">{connectionQuality}</span>
              {latency > 0 && (
                <span className="ml-2 text-sm ">{latency.toFixed(0)}ms</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 justify-between">
            <span className="text-gray-500">Last Updated</span>
            <span className="font-medium">
              {new Date(lastChanged).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col  gap-3">
          {isOnline ? (
            <Button
              onClick={checkConnectionNow}
              className="flex-1 px-4 py-2  rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Check Now
            </Button>
          ) : (
            <Button onClick={retryConnection}>
              <WifiIcon className="w-4 h-4 shrink-0" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
