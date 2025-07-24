import * as React from "react"
import { motion } from "framer-motion"
import { Bell, Home, LucideIcon, Settings, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  bottomNavBadgeVariants,
  bottomNavButtonVariants,
  bottomNavIconVariants,
  bottomNavLabelVariants,
  BottomNavVariant,
  bottomNavVariants,
} from "./bottom-nav-variants"

/**
 * Animation types available for the bottom navigation
 */
export enum AnimationType {
  SLIDE = "slide",
  FADE = "fade",
  SCALE = "scale",
  BOUNCE = "bounce",
}

interface NavItem {
  /**
   * URL to navigate to when clicked
   */
  href: string
  /**
   * Icon component from Lucide
   */
  icon: LucideIcon
  /**
   * Label text to display under the icon
   */
  label: string
  /**
   * Optional flag to manually set this item as active
   */
  active?: boolean
  /**
   * Optional badge count or indicator
   */
  badge?: number | string | boolean
  /**
   * Badge variant style
   */
  badgeVariant?: "default" | "dot" | "outline" | "pill"
  /**
   * Badge status color
   */
  badgeStatus?: "error" | "warning" | "success" | "info"
}

interface BottomNavButtonAnimatedProps {
  /**
   * URL to navigate to when clicked
   */
  href: string
  /**
   * Icon component from Lucide
   */
  icon: LucideIcon
  /**
   * Label text to display under the icon
   */
  label: string
  /**
   * Whether this button is currently active
   */
  active: boolean
  /**
   * Custom link component (defaults to motion.a)
   */
  linkComponent?: React.ElementType
  /**
   * Layout variant for the button
   */
  variant?: BottomNavVariant
  /**
   * Optional badge count or indicator
   */
  badge?: number | string | boolean
  /**
   * Badge variant style
   */
  badgeVariant?: "default" | "dot" | "outline" | "pill"
  /**
   * Badge status color
   */
  badgeStatus?: "error" | "warning" | "success" | "info"
  /**
   * Whether to show the label
   */
  showLabel?: boolean
  /**
   * Custom className for the button
   */
  className?: string
  /**
   * Custom className for the icon
   */
  iconClassName?: string
  /**
   * Custom className for the label
   */
  labelClassName?: string
  /**
   * Custom className for the badge
   */
  badgeClassName?: string
  /**
   * Animation type for the button
   */
  animationType: AnimationType
}

/**
 * Get animation variants based on the selected animation type
 */
const getAnimationVariants = (type: AnimationType) => {
  switch (type) {
    case AnimationType.SLIDE:
      return {
        active: { y: 0, opacity: 1 },
        inactive: { y: 10, opacity: 0.7 },
      }
    case AnimationType.FADE:
      return {
        active: { opacity: 1 },
        inactive: { opacity: 0.5 },
      }
    case AnimationType.SCALE:
      return {
        active: { scale: 1.1 },
        inactive: { scale: 1 },
      }
    case AnimationType.BOUNCE:
      return {
        active: {
          y: [0, -8, 0],
          transition: { type: "spring", stiffness: 300 },
        },
        inactive: { y: 0 },
      }
    default:
      return {
        active: {},
        inactive: {},
      }
  }
}

/**
 * A reusable animated button component for mobile bottom navigation
 */
const BottomNavButtonAnimated = ({
  href,
  icon: Icon,
  label,
  active,
  linkComponent,
  variant = BottomNavVariant.DEFAULT,
  badge,
  badgeVariant = "default",
  badgeStatus = "error",
  showLabel = true,
  className,
  iconClassName,
  labelClassName,
  badgeClassName,
  animationType,
}: BottomNavButtonAnimatedProps) => {
  const variants = getAnimationVariants(animationType)
  const LinkComponent = linkComponent || motion.a

  // Determine if a badge should be displayed
  const showBadge = badge !== undefined && badge !== false && badge !== 0

  return (
    <LinkComponent
      href={href}
      className="flex justify-center"
      aria-label={`${label} ${active ? "(current page)" : ""} ${showBadge ? `, ${typeof badge === "number" ? badge : ""} notifications` : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <Button
        variant="ghost"
        className={cn(
          bottomNavButtonVariants({ variant, active }),
          "group", // Add group class for hover effects
          className
        )}
        size="sm"
        role="tab"
        aria-selected={active}
      >
        <motion.div
          className="relative"
          initial="inactive"
          animate={active ? "active" : "inactive"}
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <Icon
            className={cn(
              bottomNavIconVariants({ variant, active }),
              iconClassName
            )}
            aria-hidden="true"
          />
          {showBadge && (
            <motion.span
              className={cn(
                bottomNavBadgeVariants({
                  variant: badgeVariant,
                  status: badgeStatus,
                }),
                badgeClassName
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              aria-hidden="true"
            >
              {(
                typeof badge === "number" && badge > 0 && badgeVariant !== "dot"
              ) ?
                badge
              : ""}
            </motion.span>
          )}
        </motion.div>
        <motion.span
          className={cn(
            bottomNavLabelVariants({ variant, active, showLabel }),
            labelClassName
          )}
          initial="inactive"
          animate={active ? "active" : "inactive"}
          variants={variants}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {label}
        </motion.span>
      </Button>
    </LinkComponent>
  )
}

interface BottomNavAnimatedProps {
  /**
   * Array of navigation items
   */
  items?: NavItem[]
  /**
   * Optional active page identifier (if not using pathname)
   */
  activePage?: string
  /**
   * Current pathname (for frameworks without usePathname)
   */
  pathname?: string
  /**
   * Custom link component for routing (e.g., from react-router, Next.js, etc.)
   */
  linkComponent?: React.ElementType
  /**
   * Custom function to determine if a nav item is active
   */
  isItemActive?: (item: NavItem, currentPath: string) => boolean
  /**
   * Layout variant for the navigation
   */
  variant?: BottomNavVariant
  /**
   * Whether to show labels
   */
  showLabels?: boolean
  /**
   * Custom className for the nav container
   */
  className?: string
  /**
   * Custom className for the button
   */
  buttonClassName?: string
  /**
   * Custom className for the icon
   */
  iconClassName?: string
  /**
   * Custom className for the label
   */
  labelClassName?: string
  /**
   * Custom className for the badge
   */
  badgeClassName?: string
  /**
   * Animation type for the buttons
   */
  animationType?: AnimationType
}

/**
 * Default function to determine if a navigation item is active
 * @param {NavItem} item - The navigation item to check
 * @param {string} currentPath - The current path to compare against
 * @returns {boolean} - Whether the item is active
 * @example
 * const item = { href: "/home", icon: Home, label: "Home" }
 * const currentPath = "/home"
 * const isActive = defaultIsItemActive(item, currentPath)
 * console.log(isActive) // true
 */
const defaultIsItemActive = (item: NavItem, currentPath: string): boolean => {
  return (
    currentPath === item.href ||
    (typeof currentPath === "string" && currentPath.includes(item.href)) ||
    currentPath === item.label
  )
}

/**
 * An animated mobile bottom navigation component that displays navigation items with icons and labels
 */
export const BottomNavAnimated = ({
  items,
  activePage,
  pathname,
  linkComponent,
  isItemActive = defaultIsItemActive,
  variant = BottomNavVariant.DEFAULT,
  showLabels = true,
  className,
  buttonClassName,
  iconClassName,
  labelClassName,
  badgeClassName,
  animationType = AnimationType.SLIDE,
}: BottomNavAnimatedProps) => {
  // Use provided pathname or activePage as the current path
  const currentPath = activePage || pathname || ""

  // Default navigation items if none provided
  const defaultItems: NavItem[] = [
    {
      href: "/home",
      icon: Home,
      label: "Home",
    },
    {
      href: "/alerts",
      icon: Bell,
      label: "Alerts",
      badge: 3,
      badgeVariant: "default",
      badgeStatus: "error",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
    {
      href: "/profile",
      icon: User,
      label: "Profile",
      badge: true,
      badgeVariant: "dot",
      badgeStatus: "success",
    },
  ]

  const navItems = items || defaultItems

  return (
    <motion.nav
      className={cn(bottomNavVariants({ variant }), className)}
      role="tablist"
      aria-label="Bottom navigation"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {navItems.map((item) => (
        <BottomNavButtonAnimated
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          linkComponent={linkComponent}
          variant={variant}
          active={
            item.active !== undefined ?
              item.active
            : isItemActive(item, currentPath)
          }
          badge={item.badge}
          badgeVariant={item.badgeVariant}
          badgeStatus={item.badgeStatus}
          showLabel={showLabels}
          className={buttonClassName}
          iconClassName={iconClassName}
          labelClassName={labelClassName}
          badgeClassName={badgeClassName}
          animationType={animationType}
        />
      ))}
    </motion.nav>
  )
}
