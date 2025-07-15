/**
 * Current version of the notify module
 */
export const NOTIFY_VERSION = "1.4.0"

// visit https://reusables.vercel.app/docs/components/notify for more information

/**
 * Default configuration for toast notifications
 */
export const DEFAULT_CONFIG = {
  duration: 4000,
  position: "bottom-right",
  closable: true,
  preventDuplicates: false,
  maxToast: 4,
  hideProgressBar: false,
  animation: "slide",
} as const
