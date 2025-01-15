"use client";

import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

interface ConnectionState {
  isOnline: boolean;
  lastChanged: string;
  connectionQuality: "excellent" | "good" | "poor" | "unknown";
  latency: number;
  isRetrying: boolean;
}

const useOnlineStatus = (
  options = {
    debounceTime: 1000,
    pingInterval: 30000,
    pingTimeout: 5000,
    pingURL: "https://www.google.com/favicon.ico",
  }
) => {
  const [state, setState] = useState<ConnectionState>({
    isOnline: navigator.onLine,
    lastChanged: new Date().toISOString(),
    connectionQuality: "unknown",
    latency: 0,
    isRetrying: false,
  });

  // Measure connection quality using Resource Timing API
  const checkConnectionQuality = useCallback(async () => {
    try {
      const startTime = performance.now();
      const response = await fetch(options.pingURL, {
        mode: "no-cors",
        cache: "no-cache",
      });
      console.log(response);
      const endTime = performance.now();
      const latency = endTime - startTime;

      let quality: "excellent" | "good" | "poor" | "unknown" = "unknown";
      if (latency < 100) quality = "excellent";
      else if (latency < 300) quality = "good";
      else quality = "poor";

      setState((prev) => ({
        ...prev,
        connectionQuality: quality,
        latency,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isOnline: false,
        connectionQuality: "unknown",
        latency: -1,
      }));
    }
  }, [options.pingURL]);

  // Debounced status update to prevent rapid changes
  const updateOnlineStatus = useCallback(
    debounce((isOnline: boolean) => {
      setState((prev) => ({
        ...prev,
        isOnline,
        lastChanged: new Date().toISOString(),
        isRetrying: false,
      }));
      if (isOnline) {
        checkConnectionQuality();
      }
    }, options.debounceTime),
    [checkConnectionQuality, options.debounceTime]
  );

  // Manual retry connection
  const retryConnection = useCallback(async () => {
    if (state.isOnline || state.isRetrying) return;

    setState((prev) => ({
      ...prev,
      isRetrying: true,
    }));

    try {
      await fetch(options.pingURL, { mode: "no-cors" });
      updateOnlineStatus(true);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isRetrying: false,
      }));
    }
  }, [state.isOnline, state.isRetrying, options.pingURL, updateOnlineStatus]);

  useEffect(() => {
    const handleOnline = () => updateOnlineStatus(true);
    const handleOffline = () => updateOnlineStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set up periodic connection quality checks
    const intervalId = setInterval(
      checkConnectionQuality,
      options.pingInterval
    );

    // Initial connection quality check
    checkConnectionQuality();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(intervalId);
      updateOnlineStatus.cancel();
    };
  }, [updateOnlineStatus, checkConnectionQuality, options.pingInterval]);

  return {
    ...state,
    checkConnectionNow: checkConnectionQuality,
    retryConnection,
  };
};

export default useOnlineStatus;
