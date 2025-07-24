"use client"

import React from "react"
import {
  Bell,
  ChevronLeft,
  Home,
  LayoutGrid,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomNav } from "@/registry/reusables/ui/mobile/bottom-nav"
import { MobileContainer } from "@/registry/reusables/ui/mobile/mobile-container"

/**
 * Demo showcasing the flexible slots system for complex layouts
 */
export default function SlotsLayoutDemo() {
  const [showSearchBar, setShowSearchBar] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(false)
  const [showNotifications, setShowNotifications] = React.useState(false)

  return (
    <MobileContainer
      header={
        <div className="flex h-14 items-center justify-between border-b bg-background px-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Complex Layout</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      }
      bottomNav={
        <BottomNav
          items={[
            {
              href: "#home",
              icon: Home,
              label: "Home",
              active: true,
            },
            {
              href: "#search",
              icon: Search,
              label: "Search",
            },
            {
              href: "#browse",
              icon: LayoutGrid,
              label: "Browse",
            },
            {
              href: "#settings",
              icon: Settings,
              label: "Settings",
            },
            {
              href: "#profile",
              icon: User,
              label: "Profile",
            },
          ]}
        />
      }
      slots={{
        belowHeader: (
          <>
            {showSearchBar && (
              <div className="border-b bg-background p-3 duration-200 animate-in slide-in-from-top-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSearchBar(false)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Search..." className="h-9" autoFocus />
                </div>
              </div>
            )}
            {showFilters && (
              <div className="border-b bg-muted/50 p-3 duration-200 animate-in slide-in-from-top-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium">Filters:</span>
                  <Button size="sm" variant="secondary" className="h-7 text-xs">
                    Recent
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Popular
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Featured
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-auto h-7 text-xs"
                    onClick={() => setShowFilters(false)}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </>
        ),
        aboveContent: (
          <>
            {showNotifications && (
              <div className="border-b bg-muted/30 p-3 duration-200 animate-in fade-in slide-in-from-right-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Notifications</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotifications(false)}
                  >
                    Close
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="rounded-md bg-background p-2 shadow-sm">
                    <p className="text-sm font-medium">New feature available</p>
                    <p className="text-xs text-muted-foreground">
                      Check out the new slots system for complex layouts
                    </p>
                  </div>
                  <div className="rounded-md bg-background p-2 shadow-sm">
                    <p className="text-sm font-medium">
                      Your account was updated
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your profile settings have been saved
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        ),
        aboveBottomNav: (
          <div className="border-t bg-background p-2 text-center animate-in fade-in-0">
            <p className="text-xs text-muted-foreground">
              Custom section above bottom nav
            </p>
          </div>
        ),
      }}
      rounded="md"
      padding="md"
    >
      <div className="flex flex-col gap-6">
        <section>
          <h2 className="mb-2 text-lg font-medium">Flexible Layout Options</h2>
          <p className="text-sm text-muted-foreground">
            This example demonstrates how to use the slots system to create
            complex layouts with components in specific positions.
          </p>

          <div className="mt-4 grid gap-2">
            <Button
              onClick={() => setShowSearchBar(!showSearchBar)}
              variant="outline"
            >
              {showSearchBar ? "Hide" : "Show"} Search Bar (belowHeader slot)
            </Button>

            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
            >
              {showFilters ? "Hide" : "Show"} Filters (belowHeader slot)
            </Button>

            <Button
              onClick={() => setShowNotifications(!showNotifications)}
              variant="outline"
            >
              {showNotifications ? "Hide" : "Show"} Notifications (aboveContent
              slot)
            </Button>
          </div>
        </section>

        <section className="rounded-md bg-muted/50 p-4">
          <h3 className="font-medium">Available Slots</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              • <code>aboveHeader</code>: Above the header component
            </li>
            <li>
              • <code>belowHeader</code>: Below the header component
            </li>
            <li>
              • <code>aboveContent</code>: Above the main content area
            </li>
            <li>
              • <code>belowContent</code>: Below the main content area
            </li>
            <li>
              • <code>aboveBottomNav</code>: Above the bottom navigation
            </li>
            <li>
              • <code>belowBottomNav</code>: Below the bottom navigation
            </li>
          </ul>
        </section>
      </div>
    </MobileContainer>
  )
}
