"use client"

import React from "react"
import { Eye, EyeOff, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MobileContainer } from "@/registry/reusables/ui/mobile/mobile-container"

/**
 * Demo showcasing accessibility features of the MobileContainer
 */
export default function AccessibilityDemo() {
  const [contentState, setContentState] = React.useState("initial")
  const [announceChanges, setAnnounceChanges] = React.useState(true)
  const [ariaLabels, setAriaLabels] = React.useState(true)

  return (
    <MobileContainer
      header={
        <div className="flex h-14 items-center justify-between border-b bg-background px-3">
          <h1 className="text-lg font-semibold">Accessibility Features</h1>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      }
      ariaLabel={ariaLabels ? "Accessibility demo container" : undefined}
      ariaRole="main"
      announceContentChanges={announceChanges}
      theme="default"
      rounded="md"
      padding="md"
    >
      <div className="flex flex-col gap-6">
        <section>
          <h2 className="text-lg font-medium">Accessibility Options</h2>
          <p className="text-sm text-muted-foreground">
            Configure accessibility features for the mobile container
          </p>

          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="announceChanges"
                checked={announceChanges}
                onCheckedChange={(checked) =>
                  setAnnounceChanges(checked === true)
                }
              />
              <Label htmlFor="announceChanges">Announce content changes</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ariaLabels"
                checked={ariaLabels}
                onCheckedChange={(checked) => setAriaLabels(checked === true)}
              />
              <Label htmlFor="ariaLabels">Use ARIA labels</Label>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-lg font-medium">Dynamic Content</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            This section demonstrates how content changes are announced to
            screen readers when enabled.
          </p>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setContentState("page1")}
              variant={contentState === "page1" ? "default" : "outline"}
            >
              Show Page 1
            </Button>
            <Button
              onClick={() => setContentState("page2")}
              variant={contentState === "page2" ? "default" : "outline"}
            >
              Show Page 2
            </Button>
            <Button
              onClick={() => setContentState("page3")}
              variant={contentState === "page3" ? "default" : "outline"}
            >
              Show Page 3
            </Button>
          </div>

          <div className="mt-6 rounded-md border p-4">
            {contentState === "initial" && (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <p className="text-muted-foreground">
                  Select a page to view content
                </p>
              </div>
            )}

            {contentState === "page1" && (
              <div className="duration-300 animate-in fade-in">
                <h3 className="mb-2 font-medium">Page 1: Welcome</h3>
                <p className="text-sm">
                  This is the first page of content. When you navigate between
                  pages, screen readers will announce the content change if
                  enabled.
                </p>
              </div>
            )}

            {contentState === "page2" && (
              <div className="duration-300 animate-in fade-in">
                <h3 className="mb-2 font-medium">Page 2: Features</h3>
                <ul className="space-y-1 text-sm">
                  <li>• ARIA roles and labels</li>
                  <li>• Content change announcements</li>
                  <li>• Proper focus management</li>
                  <li>• Screen reader compatible layout</li>
                </ul>
              </div>
            )}

            {contentState === "page3" && (
              <div className="duration-300 animate-in fade-in">
                <h3 className="mb-2 font-medium">Page 3: Settings</h3>
                <div className="space-y-2 text-sm">
                  <p>You can toggle accessibility features on or off:</p>
                  <div className="flex justify-between rounded-md bg-muted p-2">
                    <span>Screen reader announcements</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => setAnnounceChanges(!announceChanges)}
                      aria-label={
                        announceChanges ?
                          "Disable announcements"
                        : "Enable announcements"
                      }
                    >
                      {announceChanges ?
                        <Eye className="h-4 w-4" />
                      : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex justify-between rounded-md bg-muted p-2">
                    <span>ARIA labels</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => setAriaLabels(!ariaLabels)}
                      aria-label={
                        ariaLabels ?
                          "Disable ARIA labels"
                        : "Enable ARIA labels"
                      }
                    >
                      {ariaLabels ?
                        <Eye className="h-4 w-4" />
                      : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-md bg-muted/30 p-4">
          <h3 className="font-medium">Current Accessibility Status</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p>• ARIA Label: {ariaLabels ? "Enabled" : "Disabled"}</p>
            <p>
              • Content Announcements:{" "}
              {announceChanges ? "Enabled" : "Disabled"}
            </p>
            <p>• ARIA Role: "main"</p>
            <p>
              • Content State:{" "}
              {contentState === "initial" ?
                "Initial"
              : `Page ${contentState.slice(4)}`}
            </p>
          </div>
        </section>
      </div>
    </MobileContainer>
  )
}
