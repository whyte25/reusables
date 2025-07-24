import { cva } from "class-variance-authority"

/**
 * Available layout variants for the bottom navigation
 */
export enum BottomNavVariant {
  DEFAULT = "default",
  HORIZONTAL = "horizontal",
  ROUNDED_CONTAINER = "rounded-container",
  PILL_BUTTONS = "pill-buttons",
  FLOATING = "floating",
  COMPACT = "compact",
  MATERIAL = "material",
  GLASS = "glass",
}

/**
 * Base styles for the navigation container
 */
export const bottomNavVariants = cva(
  "grid w-full gap-1 px-2 py-3 transition-all duration-200",
  {
    variants: {
      variant: {
        // Standard bottom navigation with top border
        default: "grid-cols-4 border-t",
        // Horizontal layout with no visual changes to container
        horizontal: "grid-cols-4 border-t",
        // Rounded container with shadow and margin
        "rounded-container":
          "mx-4 my-2 grid-cols-4 rounded-full border bg-background shadow-lg",
        // Standard container with pill-shaped buttons
        "pill-buttons": "grid-cols-4 border-t",
        // Floating container with elevation
        floating:
          "mx-4 mb-4 mt-2 grid-cols-4 rounded-xl border bg-background shadow-xl",
        // Compact version with reduced padding
        compact: "grid-cols-5 border-t px-1 py-1",
        // Material design inspired with center FAB
        material:
          "grid-flow-col grid-cols-2 grid-rows-2 rounded-t-xl bg-background px-4 py-4 shadow-lg",
        // Glass effect with backdrop blur
        glass:
          "grid-cols-4 rounded-t-xl border border-gray-200 bg-background/80 shadow-lg backdrop-blur-lg dark:border-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Button styles for the navigation buttons
 */
export const bottomNavButtonVariants = cva(
  "flex h-auto w-full items-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Standard vertical layout
        default: "flex-col py-2 2xl:py-3",
        // Horizontal layout with icon and text side-by-side
        horizontal: "flex-row justify-center gap-2 py-2 2xl:py-3",
        // Standard vertical layout in rounded container
        "rounded-container": "flex-col py-2 2xl:py-3",
        // Pill-shaped buttons
        "pill-buttons":
          "flex-col rounded-full py-2 hover:bg-accent/50 2xl:py-3",
        // Floating layout with elevated feel
        floating: "flex-col rounded-lg py-2 hover:bg-accent/50",
        // Compact buttons with minimal padding
        compact: "flex-col py-1",
        // Material design inspired buttons
        material: "flex-col py-3 hover:bg-accent/50",
        // Glass effect buttons with hover effect
        glass: "flex-col py-2 hover:bg-background/50",
      },
      active: {
        true: "bg-accent font-medium text-primary",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      active: false,
    },
  }
)

/**
 * Icon styles for the navigation icons
 */
export const bottomNavIconVariants = cva("transition-transform duration-200", {
  variants: {
    variant: {
      default: "mb-1 h-5 w-5",
      horizontal: "h-5 w-5",
      "rounded-container": "mb-1 h-5 w-5",
      "pill-buttons": "mb-1 h-5 w-5",
      floating: "mb-1 h-5 w-5 group-hover:scale-110", // Added group-hover effect
      compact: "mb-0.5 h-4 w-4", // Smaller icon for compact variant
      material: "mb-1 h-6 w-6", // Larger icon for material variant
      glass: "mb-1 h-5 w-5 opacity-80 group-hover:opacity-100", // Opacity effect for glass
    },
    active: {
      true: "text-primary",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    active: false,
  },
})

/**
 * Label styles for the navigation labels
 */
export const bottomNavLabelVariants = cva("transition-all duration-200", {
  variants: {
    variant: {
      default: "text-xs",
      horizontal: "text-left text-xs",
      "rounded-container": "text-xs",
      "pill-buttons": "text-xs font-medium",
      floating: "text-xs tracking-tight",
      compact: "text-[0.65rem] tracking-tight", // Smaller text for compact
      material: "mt-0.5 text-xs font-medium", // Slightly increased spacing
      glass: "text-xs opacity-80 group-hover:opacity-100", // Opacity effect matching icon
    },
    active: {
      true: "font-medium",
      false: "",
    },
    showLabel: {
      true: "block",
      false: "hidden md:block", // Hide on small screens, show on medium+
    },
  },
  defaultVariants: {
    variant: "default",
    active: false,
    showLabel: true,
  },
})

/**
 * Badge styles for the navigation items
 * Used to show notification counts or status indicators
 */
export const bottomNavBadgeVariants = cva(
  "absolute flex items-center justify-center rounded-full text-[0.6rem] font-bold",
  {
    variants: {
      variant: {
        default:
          "-right-1 -top-1 h-[1.1rem] min-w-[1.1rem] bg-destructive text-destructive-foreground",
        dot: "-right-0.5 -top-0.5 h-2 w-2 bg-destructive",
        outline:
          "-right-1 -top-1 h-[1.1rem] min-w-[1.1rem] border border-background bg-destructive text-destructive-foreground",
        pill: "-right-1 -top-1 h-[1.1rem] min-w-[1.1rem] bg-destructive px-1 text-destructive-foreground",
      },
      status: {
        error: "bg-destructive text-destructive-foreground",
        warning: "bg-warning text-warning-foreground",
        success: "bg-success text-success-foreground",
        info: "bg-info text-info-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      status: "error",
    },
  }
)
