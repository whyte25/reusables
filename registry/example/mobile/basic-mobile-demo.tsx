"use client"

import React from "react"
import { Bell, Home, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BottomNav } from "@/registry/reusables/ui/mobile/bottom-nav"
import { MobileContainer } from "@/registry/reusables/ui/mobile/mobile-container"

/**
 * Basic mobile container demo showing standard layout with header and bottom navigation
 */
export default function BasicMobileDemo() {
  return (
    <MobileContainer
      header={
        <div className="flex h-12 items-center justify-center border-b bg-background p-2">
          <h1 className="text-lg font-semibold">Basic Example</h1>
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
              href: "#notifications",
              icon: Bell,
              label: "Alerts",
              badge: 3,
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
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
        <p className="text-center text-sm text-muted-foreground">
          Standard mobile container with header and bottom navigation
        </p>
        <Button>Click Me</Button>
      </div>
    </MobileContainer>
  )
}
