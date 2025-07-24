"use client"

import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { MobileSimulator } from "./mobile-simulator"

// Define variants for the mobile container component
const mobileContainerVariants = cva(
  "flex flex-col", // Base styles
  {
    variants: {
      theme: {
        default: "", // Default theme adds no additional classes
        light: "bg-white text-slate-900",
        dark: "bg-slate-900 text-white",
        system: "", // System theme determined by the user's device preferences
      },
      size: {
        default: "", // Default size adds no additional classes
        compact: "gap-1",
        comfortable: "gap-4",
        spacious: "gap-6",
      },
      rounded: {
        default: "", // Default corner style
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      theme: "default",
      size: "default",
      rounded: "default",
    },
  }
)

const mobileContentVariants = cva(
  "flex flex-1 flex-col", // Base styles
  {
    variants: {
      scroll: {
        auto: "overflow-y-auto",
        hidden: "overflow-hidden",
        visible: "overflow-visible",
        scroll: "overflow-y-scroll",
      },
      padding: {
        none: "p-0",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      scroll: "auto",
      padding: "none",
    },
  }
)

interface MobileContainerProps
  extends VariantProps<typeof mobileContainerVariants>,
    VariantProps<typeof mobileContentVariants> {
  /**
   * Main content to render inside the mobile container
   */
  children?: React.ReactNode

  /**
   * Optional header component to render at the top
   */
  header?: React.ReactNode

  /**
   * Optional bottom navigation component to render at the bottom
   */
  bottomNav?: React.ReactNode

  /**
   * Optional splash screen to show before the main content
   */
  splashScreen?: React.ReactNode

  /**
   * Whether to use the mobile simulator on desktop devices
   * @default true
   */
  useSimulator?: boolean

  /**
   * Custom styles for the mobile container
   */
  className?: string

  /**
   * Custom styles for the content area
   */
  contentClassName?: string

  /**
   * Custom ID for the mobile container
   */
  id?: string

  /**
   * Function called when the container is fully rendered
   */
  onRendered?: () => void

  /**
   * Whether to hide the mobile UI on desktop and only show content
   * @default false
   */
  contentOnly?: boolean

  /**
   * Whether to disable scrolling in the container
   * @default false
   */
  disableScroll?: boolean

  /**
   * Background color or style for the container
   */
  background?: string

  /**
   * Additional components to render in specific positions
   */
  slots?: {
    /**
     * Component to render above the header
     */
    aboveHeader?: React.ReactNode

    /**
     * Component to render below the header
     */
    belowHeader?: React.ReactNode

    /**
     * Component to render above the content
     */
    aboveContent?: React.ReactNode

    /**
     * Component to render below the content
     */
    belowContent?: React.ReactNode

    /**
     * Component to render above the bottom navigation
     */
    aboveBottomNav?: React.ReactNode

    /**
     * Component to render below the bottom navigation
     */
    belowBottomNav?: React.ReactNode
  }

  /**
   * Duration in milliseconds for the splash screen to be displayed
   * @default 2000
   */
  splashScreenDuration?: number

  /**
   * Whether to use the built-in animation for the splash screen
   * If false, the component will render the splash screen without managing its animation
   * @default true
   */
  useSplashAnimation?: boolean

  /**
   * Optional animation configuration for the splash screen
   */
  splashAnimationConfig?: {
    /**
     * Entry animation class
     */
    enterClass?: string
    /**
     * Exit animation class
     */
    exitClass?: string
    /**
     * Animation timing function
     */
    timing?: string
  }

  /**
   * ARIA label for the mobile container
   */
  ariaLabel?: string

  /**
   * ARIA role for the mobile container
   * @default "region"
   */
  ariaRole?: string

  /**
   * Whether the content should be announced to screen readers when it changes
   * @default false
   */
  announceContentChanges?: boolean
}

/**
 * A flexible mobile container component that simulates a mobile device on desktop
 * and provides a mobile-optimized view on mobile devices.
 *
 * @example
 * // Basic usage
 * <MobileContainer>
 *   <YourContent />
 * </MobileContainer>
 *
 * @example
 * // With header and bottom navigation
 * <MobileContainer
 *   header={<AppHeader />}
 *   bottomNav={<BottomNav items={navItems} />}
 * >
 *   <YourContent />
 * </MobileContainer>
 *
 * @example
 * // With theme and variants
 * <MobileContainer
 *   theme="dark"
 *   size="comfortable"
 *   rounded="lg"
 *   padding="md"
 * >
 *   <YourContent />
 * </MobileContainer>
 *
 * @example
 * // With custom slots and animations
 * <MobileContainer
 *   slots={{
 *     aboveContent: <Breadcrumbs />,
 *     belowContent: <Disclaimer />
 *   }}
 *   splashScreen={<AppSplash />}
 *   splashAnimationConfig={{
 *     enterClass: "animate-fadeIn",
 *     exitClass: "animate-fadeOut",
 *     timing: "ease-in-out"
 *   }}
 * >
 *   <YourContent />
 * </MobileContainer>
 */
export function MobileContainer({
  // Content props
  children,
  header,
  bottomNav,
  splashScreen,
  slots,

  // Theme and style variants
  theme,
  size,
  rounded,
  padding,
  background,
  className,
  contentClassName,

  // Container behavior
  useSimulator = true,
  id,
  contentOnly = false,
  disableScroll = false,

  // Animation controls
  splashScreenDuration = 3000,
  useSplashAnimation = true,
  splashAnimationConfig,

  // Accessibility
  ariaLabel,
  ariaRole = "region",
  announceContentChanges = false,

  // Lifecycle
  onRendered,
}: MobileContainerProps) {
  // Define scroll after disableScroll to fix parameter ordering
  const scroll = disableScroll ? "hidden" : "auto"
  // For announcing content changes to screen readers
  const [announcement, setAnnouncement] = React.useState("")
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Call the onRendered callback when the component mounts
  React.useEffect(() => {
    if (onRendered) {
      onRendered()
    }
  }, [onRendered])

  // Handle content change announcements for screen readers
  React.useEffect(() => {
    if (announceContentChanges && children) {
      // Simple implementation - announce when children change
      setAnnouncement("Content updated")

      // Clear announcement after it's been read
      const timer = setTimeout(() => setAnnouncement(""), 1000)
      return () => clearTimeout(timer)
    }
  }, [children, announceContentChanges])

  // If splashScreen is provided, render it with a timeout before showing content
  const [showSplash, setShowSplash] = React.useState(Boolean(splashScreen))
  const [splashAnimationState, setSplashAnimationState] = React.useState<
    "enter" | "exit" | null
  >(splashScreen ? "enter" : null)

  // Handle splash screen animation and timing
  React.useEffect(() => {
    if (splashScreen && showSplash) {
      if (useSplashAnimation) {
        // Start exit animation before hiding the splash screen
        const exitTimer = setTimeout(() => {
          setSplashAnimationState("exit")

          // After exit animation, hide the splash screen
          const hideTimer = setTimeout(() => {
            setShowSplash(false)
            setSplashAnimationState(null)
          }, 500) // Default exit animation duration

          return () => {
            clearTimeout(hideTimer)
          }
        }, splashScreenDuration)

        return () => {
          clearTimeout(exitTimer)
        }
      } else {
        // Use simple timeout without animations if useSplashAnimation is false
        const timer = setTimeout(
          () => setShowSplash(false),
          splashScreenDuration
        )
        return () => clearTimeout(timer)
      }
    }
  }, [splashScreen, showSplash, splashScreenDuration, useSplashAnimation])

  // Get animation classes based on configuration
  const getSplashAnimationClass = () => {
    if (!useSplashAnimation) return ""

    if (splashAnimationState === "enter") {
      return (
        splashAnimationConfig?.enterClass || "animate-in fade-in duration-300"
      )
    } else if (splashAnimationState === "exit") {
      return (
        splashAnimationConfig?.exitClass || "animate-out fade-out duration-300"
      )
    }

    return ""
  }

  // Apply animation style
  const splashAnimationStyle =
    useSplashAnimation && splashAnimationConfig?.timing ?
      { transition: `all ${splashAnimationConfig.timing}` }
    : {}

  // Construct the mobile content layout
  const mobileContent = (
    <>
      {/* Screen reader announcement area */}
      {announceContentChanges && (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement}
        </div>
      )}

      {slots?.aboveHeader}

      {header && <div className="sticky top-0 z-10 w-full">{header}</div>}

      {slots?.belowHeader}

      <div
        ref={contentRef}
        className={cn(
          mobileContentVariants({ scroll, padding }),
          background && background,
          contentClassName
        )}
        aria-label={ariaLabel ? `${ariaLabel} content area` : undefined}
      >
        {slots?.aboveContent}
        {children}
        {slots?.belowContent}
      </div>

      {slots?.aboveBottomNav}

      {bottomNav && (
        <div className="sticky bottom-0 z-10 w-full">{bottomNav}</div>
      )}

      {slots?.belowBottomNav}
    </>
  )

  // If we're displaying only content (no mobile UI), just return the content directly
  if (contentOnly) {
    return mobileContent
  }

  // Handle splash screen display
  if (splashScreen && showSplash) {
    const splashContent = (
      <div
        className={cn(getSplashAnimationClass())}
        style={splashAnimationStyle}
      >
        {splashScreen}
      </div>
    )

    return (
      <>
        {useSimulator && (
          <div className="hidden sm:block">
            <MobileSimulator>{splashContent}</MobileSimulator>
          </div>
        )}
        <div className="h-svh sm:hidden">{splashContent}</div>
      </>
    )
  }

  // Main render with simulator for desktop and direct for mobile
  return (
    <>
      {/* On desktop, render using the mobile simulator container if enabled */}
      {useSimulator && (
        <div className="hidden sm:block">
          <MobileSimulator>
            <div
              id={id}
              className={cn(
                mobileContainerVariants({ theme, size, rounded }),
                "min-h-full",
                className
              )}
              role={ariaRole}
              aria-label={ariaLabel}
            >
              {mobileContent}
            </div>
          </MobileSimulator>
        </div>
      )}

      {/* On mobile or if simulator is disabled, render directly */}
      <div
        id={id}
        className={cn(
          mobileContainerVariants({ theme, size, rounded }),
          "h-svh sm:hidden",
          useSimulator ? "" : "sm:block sm:h-full",
          className
        )}
        role={ariaRole}
        aria-label={ariaLabel}
      >
        {mobileContent}
      </div>
    </>
  )
}
