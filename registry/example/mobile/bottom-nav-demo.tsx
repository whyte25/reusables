"use client"

import React from "react"
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  Check,
  Compass,
  Eye,
  Home,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Music,
  Search,
  Settings,
  Star,
  User,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNav } from "@/registry/reusables/ui/mobile/bottom-nav"
import { BottomNavVariant } from "@/registry/reusables/ui/mobile/bottom-nav-variants"
import { MobileContainer } from "@/registry/reusables/ui/mobile/mobile-container"

// Define the NavItem type to match what's used in the bottom-nav component
type NavItem = {
  href: string
  icon: typeof Home // Using a Lucide icon as reference for the LucideIcon type
  label: string
  active?: boolean
  badge?: number | string | boolean
  badgeVariant?: "default" | "dot" | "outline" | "pill"
  badgeStatus?: "error" | "warning" | "success" | "info"
}

/**
 * Demo showcasing all the features of the BottomNav component
 */
export default function BottomNavDemo() {
  // Bottom nav configuration state
  const [activeTab, setActiveTab] = React.useState("standard")
  const [activeItem, setActiveItem] = React.useState("home")
  const [showLabels, setShowLabels] = React.useState(true)
  const [iconSize, setIconSize] = React.useState<"sm" | "md" | "lg">("md")

  // Configuration options
  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  // Generate different sets of nav items for demos
  const standardNavItems: NavItem[] = [
    {
      href: "#home",
      icon: Home,
      label: "Home",
      active: activeItem === "home",
    },
    {
      href: "#search",
      icon: Search,
      label: "Search",
      active: activeItem === "search",
    },
    {
      href: "#messages",
      icon: MessageCircle,
      label: "Messages",
      active: activeItem === "messages",
    },
    {
      href: "#settings",
      icon: Settings,
      label: "Settings",
      active: activeItem === "settings",
    },
  ]

  const badgeNavItems: NavItem[] = [
    {
      href: "#home",
      icon: Home,
      label: "Home",
      badge: 2,
      badgeVariant: "default",
      badgeStatus: "error",
      active: activeItem === "home",
    },
    {
      href: "#inbox",
      icon: Bell,
      label: "Inbox",
      badge: 12,
      badgeVariant: "pill",
      badgeStatus: "warning",
      active: activeItem === "inbox",
    },
    {
      href: "#updates",
      icon: Zap,
      label: "Updates",
      badge: "New",
      badgeVariant: "outline",
      badgeStatus: "info",
      active: activeItem === "updates",
    },
    {
      href: "#profile",
      icon: User,
      label: "Profile",
      badge: "",
      badgeVariant: "dot",
      badgeStatus: "success",
      active: activeItem === "profile",
    },
  ]

  const extendedNavItems: NavItem[] = [
    {
      href: "#home",
      icon: Home,
      label: "Home",
      active: activeItem === "home",
    },
    {
      href: "#explore",
      icon: Compass,
      label: "Explore",
      active: activeItem === "explore",
    },
    {
      href: "#saved",
      icon: Star,
      label: "Saved",
      active: activeItem === "saved",
    },
    {
      href: "#notifications",
      icon: Bell,
      label: "Alerts",
      active: activeItem === "notifications",
    },
    {
      href: "#profile",
      icon: User,
      label: "Profile",
      active: activeItem === "profile",
    },
  ]

  const musicNavItems: NavItem[] = [
    {
      href: "#library",
      icon: Music,
      label: "Library",
      active: activeItem === "library",
    },
    {
      href: "#browse",
      icon: Search,
      label: "Browse",
      active: activeItem === "browse",
    },
    {
      href: "#radio",
      icon: Mic,
      label: "Radio",
      active: activeItem === "radio",
    },
  ]

  const socialNavItems: NavItem[] = [
    {
      href: "#feed",
      icon: Home,
      label: "Feed",
      active: activeItem === "feed",
    },
    {
      href: "#discover",
      icon: Compass,
      label: "Discover",
      active: activeItem === "discover",
    },
    {
      href: "#create",
      icon: Zap,
      label: "Create",
      active: activeItem === "create",
    },
    {
      href: "#activity",
      icon: Bell,
      label: "Activity",
      badge: 3,
      badgeVariant: "dot",
      badgeStatus: "error",
      active: activeItem === "activity",
    },
    {
      href: "#profile",
      icon: User,
      label: "Profile",
      active: activeItem === "profile",
    },
  ]

  const advancedNavItems: NavItem[] = [
    {
      href: "#previous",
      icon: ArrowLeft,
      label: "Previous",
      active: activeItem === "previous",
    },
    {
      href: "#home",
      icon: Home,
      label: "Home",
      active: activeItem === "home",
    },
    {
      href: "#calendar",
      icon: Calendar,
      label: "Calendar",
      badge: "5",
      badgeVariant: "default",
      badgeStatus: "info",
      active: activeItem === "calendar",
    },
    {
      href: "#archive",
      icon: Archive,
      label: "Archive",
      active: activeItem === "archive",
    },
    {
      href: "#next",
      icon: ArrowRight,
      label: "Next",
      active: activeItem === "next",
    },
    {
      href: "#more",
      icon: MoreHorizontal,
      label: "More",
      active: activeItem === "more",
    },
  ]

  // Get current navigation items based on active tab
  const getCurrentNavItems = (): NavItem[] => {
    switch (activeTab) {
      case "standard":
        return standardNavItems
      case "badges":
        return badgeNavItems
      case "extended":
        return extendedNavItems
      case "music":
        return musicNavItems
      case "social":
        return socialNavItems
      case "advanced":
        return advancedNavItems
      default:
        return standardNavItems
    }
  }

  // Handle navigation item click
  const handleTabChange = (path: string) => {
    setActiveItem(path.replace("#", ""))
  }

  return (
    <MobileContainer
      header={
        <div className="flex h-14 items-center justify-between border-b bg-background px-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Bottom Nav Demo</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      }
      bottomNav={
        <BottomNav
          items={getCurrentNavItems()}
          showLabels={showLabels}
          variant={BottomNavVariant.MATERIAL}
          iconClassName={iconSizes[iconSize]}
          linkComponent={({ href, children }) => (
            <div
              onClick={() => handleTabChange(href)}
              className="cursor-pointer"
            >
              {children}
            </div>
          )}
        />
      }
      padding="none"
      rounded="md"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-medium">Bottom Navigation Options</h2>
          <Check className="h-4 w-4 text-primary" />
        </div>

        <div className="p-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="badges">With Badges</TabsTrigger>
              <TabsTrigger value="extended">Extended</TabsTrigger>
            </TabsList>

            <TabsContent value="standard">
              <div className="mb-4 mt-2 text-xs text-muted-foreground">
                Standard navigation with 4 items
              </div>
            </TabsContent>

            <TabsContent value="badges">
              <div className="mb-4 mt-2 text-xs text-muted-foreground">
                Navigation with various badge types
              </div>
            </TabsContent>

            <TabsContent value="extended">
              <div className="mb-4 mt-2 text-xs text-muted-foreground">
                Extended navigation with 5 items
              </div>
            </TabsContent>

            <TabsList className="mt-4 grid grid-cols-3 gap-2">
              <TabsTrigger value="music" className="w-full">
                Music
              </TabsTrigger>
              <TabsTrigger value="social" className="w-full">
                Social
              </TabsTrigger>
              <TabsTrigger value="advanced" className="w-full">
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="music">
              <div className="mb-4 mt-2 text-xs text-muted-foreground">
                Music player navigation with 3 items
              </div>
            </TabsContent>

            <TabsContent value="social">
              <div className="mb-4 mt-2 text-xs text-muted-foreground">
                Social app navigation with notification badge
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              <div className="mb-4 mt-2 text-xs text-muted-foreground">
                Advanced navigation with 6 items including actions
              </div>
            </TabsContent>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-labels" className="cursor-pointer">
                  Show Labels
                </Label>
                <Switch
                  id="show-labels"
                  checked={showLabels}
                  onCheckedChange={setShowLabels}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Icon Size</Label>
                <Select
                  value={iconSize}
                  onValueChange={(value) =>
                    setIconSize(value as "sm" | "md" | "lg")
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Icon size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Tabs>
        </div>

        <div className="border-t p-4">
          <h3 className="mb-2 font-medium">Current Active Item</h3>
          <Card className="bg-muted/30 p-3">
            <p className="text-sm font-medium">{activeItem}</p>
          </Card>

          <div className="mt-4">
            <h3 className="mb-2 font-medium">Sample Features</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Check className="mr-1 h-3 w-3" /> Default
              </Button>
              <Button variant="outline" size="sm">
                <Star className="mr-1 h-3 w-3" /> Favorite
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="mr-1 h-3 w-3" /> Notify
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-1 h-3 w-3" /> Configure
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-auto border-t p-4">
          <div className="rounded-md bg-muted/50 p-3">
            <h4 className="mb-1 text-sm font-medium">BottomNav Features</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Support for icons, labels and badges</li>
              <li>• Configurable badge variants and statuses</li>
              <li>• Custom styling and icon sizes</li>
              <li>• Active state indicators</li>
              <li>• Flexible item count (3-6 items)</li>
            </ul>
          </div>
        </div>
      </div>
    </MobileContainer>
  )
}
