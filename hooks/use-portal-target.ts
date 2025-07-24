import * as React from "react"

import { useIsMobile } from "./use-mobile"

/**
 * Returns the portal target element for dialogs/modals.
 * If a .mobile-simulator element exists, returns it; otherwise, returns document.body.
 */
export function usePortalTarget(): HTMLElement | null {
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(
    null
  )
  const isMobile = useIsMobile()

  React.useEffect(() => {
    const mobileSimulator = document.querySelector(
      ".mobile-simulator"
    ) as HTMLElement | null

    if (isMobile) {
      setPortalTarget(document.body)
    } else {
      setPortalTarget(mobileSimulator || document.body)
    }
  }, [isMobile])

  return portalTarget
}
