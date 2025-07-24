import * as React from "react"
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

export interface BottomNavButtonProps {
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
   * Custom link component (defaults to <a>)
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
}

/**
 * A reusable button component for mobile bottom navigation
 */
const BottomNavButton = ({
  href,
  icon: Icon,
  label,
  active,
  linkComponent: LinkComponent = "a",
  variant = BottomNavVariant.DEFAULT,
  badge,
  badgeVariant = "default",
  badgeStatus = "error",
  showLabel = true,
  className,
  iconClassName,
  labelClassName,
  badgeClassName,
}: BottomNavButtonProps) => {
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
        <div className="relative">
          <Icon
            className={cn(
              bottomNavIconVariants({ variant, active }),
              iconClassName
            )}
            aria-hidden="true"
          />
          {showBadge && (
            <span
              className={cn(
                bottomNavBadgeVariants({
                  variant: badgeVariant,
                  status: badgeStatus,
                }),
                badgeClassName
              )}
              aria-hidden="true"
            >
              {(
                typeof badge === "number" && badge > 0 && badgeVariant !== "dot"
              ) ?
                badge
              : ""}
            </span>
          )}
        </div>
        <span
          className={cn(
            bottomNavLabelVariants({ variant, active, showLabel }),
            labelClassName
          )}
        >
          {label}
        </span>
      </Button>
    </LinkComponent>
  )
}

export interface NavItem {
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

interface BottomNavProps {
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
}

/**
 * Default function to determine if a navigation item is active
 * @param item - The navigation item to check
 * @param currentPath - The current path to compare against
 * @returns boolean indicating if the item is active
 */
const defaultIsItemActive = (item: NavItem, currentPath: string): boolean => {
  return (
    currentPath === item.href ||
    (typeof currentPath === "string" && currentPath.includes(item.href)) ||
    currentPath === item.label
  )
}

/**
 * A mobile bottom navigation component that displays navigation items with icons and labels
 */
export const BottomNav = ({
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
}: BottomNavProps) => {
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
    <nav
      className={cn(bottomNavVariants({ variant }), className)}
      role="tablist"
      aria-label="Bottom navigation"
    >
      {navItems.map((item) => (
        <BottomNavButton
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
        />
      ))}
    </nav>
  )
}
