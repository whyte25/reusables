"use client"

import { useState } from "react"
import { ChevronRight, ExternalLink, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import AccessibilityDemo from "@/registry/example/mobile/accessibility-demo"
import BasicMobileDemo from "@/registry/example/mobile/basic-mobile-demo"
import BottomNavDemo from "@/registry/example/mobile/bottom-nav-demo"
import CompleteAppDemo from "@/registry/example/mobile/complete-app-demo"
import CustomStyleDemo from "@/registry/example/mobile/custom-style-demo"
import SlotsLayoutDemo from "@/registry/example/mobile/slots-layout-demo"
import SplashScreenDemo from "@/registry/example/mobile/splash-screen-demo"
import ThemedMobileDemo from "@/registry/example/mobile/themed-mobile-demo"

type DemoInfo = {
  id: string
  title: string
  description: string
  component: React.ComponentType
}

const mobileDemos: DemoInfo[] = [
  {
    id: "basic",
    title: "Basic Mobile Container",
    description: "Simple mobile container with header and bottom navigation",
    component: BasicMobileDemo,
  },
  {
    id: "themed",
    title: "Themed Mobile Container",
    description:
      "Mobile container with theme, size, padding, and corner radius variants",
    component: ThemedMobileDemo,
  },
  {
    id: "customstyle",
    title: "Custom Styling Demo",
    description:
      "Advanced styling options with custom classes, backgrounds, and layout modes",
    component: CustomStyleDemo,
  },
  {
    id: "splash",
    title: "Splash Screen Demo",
    description: "Mobile container with splash screen and animation options",
    component: SplashScreenDemo,
  },
  {
    id: "slots",
    title: "Slots Layout Demo",
    description: "Mobile container using slot system for complex layouts",
    component: SlotsLayoutDemo,
  },
  {
    id: "bottomnav",
    title: "Bottom Navigation Demo",
    description:
      "Showcase of all bottom navigation features including badges, sizes, and variants",
    component: BottomNavDemo,
  },
  {
    id: "accessibility",
    title: "Accessibility Demo",
    description:
      "Mobile container with accessibility features and screen reader support",
    component: AccessibilityDemo,
  },
  {
    id: "complete",
    title: "Complete App Demo",
    description: "Full-featured mobile app demo with all components combined",
    component: CompleteAppDemo,
  },
]

export default function PlaygroundPage() {
  const [activeDemo, setActiveDemo] = useState<DemoInfo | null>(null)

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Mobile UI Playground</h1>
        <p className="text-lg text-muted-foreground">
          Explore demos showcasing the flexible MobileContainer component
          capabilities
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Demo Gallery</CardTitle>
                <CardDescription>
                  Select a demo to view it in the preview panel
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="flex flex-col">
                    {mobileDemos.map((demo, index) => (
                      <Button
                        key={demo.id}
                        variant="ghost"
                        className={`h-auto justify-start rounded-none border-b px-4 py-4 ${activeDemo?.id === demo.id ? "bg-muted" : ""}`}
                        onClick={() => setActiveDemo(demo)}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            <div className="text-left">
                              <p className="font-medium">{demo.title}</p>
                              <p className="max-w-[180px] truncate text-xs text-muted-foreground">
                                {demo.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </div>
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </CardContent>
            </Card>

            {activeDemo && (
              <Card>
                <CardHeader>
                  <CardTitle>About This Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium">{activeDemo.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activeDemo.description}
                  </p>
                  <Separator className="my-4" />
                  <div className="rounded-md bg-muted p-3">
                    <h4 className="mb-2 text-sm font-medium">Key Features:</h4>
                    {activeDemo.id === "basic" && (
                      <ul className="space-y-1 text-sm">
                        <li>• Simple header and bottom navigation</li>
                        <li>• Responsive design</li>
                        <li>• Minimal configuration</li>
                      </ul>
                    )}
                    {activeDemo.id === "themed" && (
                      <ul className="space-y-1 text-sm">
                        <li>• Theme variants (default, light, dark)</li>
                        <li>
                          • Size variants (compact, comfortable, spacious)
                        </li>
                        <li>• Corner radius options</li>
                        <li>• Content padding control</li>
                      </ul>
                    )}
                    {activeDemo.id === "splash" && (
                      <ul className="space-y-1 text-sm">
                        <li>• Custom splash screen content</li>
                        <li>• Built-in animations</li>
                        <li>• Custom animation timing</li>
                        <li>• Configurable display duration</li>
                      </ul>
                    )}
                    {activeDemo.id === "slots" && (
                      <ul className="space-y-1 text-sm">
                        <li>• Flexible slot placement system</li>
                        <li>• Dynamic component rendering</li>
                        <li>• Complex layout management</li>
                        <li>• Interactive examples</li>
                      </ul>
                    )}
                    {activeDemo.id === "customstyle" && (
                      <ul className="space-y-1 text-sm">
                        <li>• Style presets (gradient, minimal, glass)</li>
                        <li>• Custom class configuration</li>
                        <li>• Content-only and no-scroll modes</li>
                        <li>• Background customization</li>
                        <li>• Header styling options</li>
                      </ul>
                    )}
                    {activeDemo.id === "bottomnav" && (
                      <ul className="space-y-1 text-sm">
                        <li>• Multiple navigation styles</li>
                        <li>• Badge variants and statuses</li>
                        <li>• Configurable icon sizes</li>
                        <li>• Toggle for showing/hiding labels</li>
                        <li>• Different item count layouts</li>
                      </ul>
                    )}
                    {activeDemo.id === "accessibility" && (
                      <ul className="space-y-1 text-sm">
                        <li>• ARIA roles and labels</li>
                        <li>• Screen reader announcements</li>
                        <li>• Content change notifications</li>
                        <li>• Toggle controls for a11y features</li>
                      </ul>
                    )}
                    {activeDemo.id === "complete" && (
                      <ul className="space-y-1 text-sm">
                        <li>• Full app simulation</li>
                        <li>• Integrated navigation system</li>
                        <li>• Multiple views and components</li>
                        <li>• All features combined</li>
                      </ul>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setActiveDemo(null)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Source
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-150px)] border shadow-sm">
            <CardContent className="flex h-full items-center justify-center bg-slate-100 p-0 dark:bg-slate-900">
              {activeDemo ?
                <div className="flex h-full w-full items-center justify-center">
                  <div className="hidden sm:block">
                    <activeDemo.component />
                  </div>
                  <div className="block p-4 text-center sm:hidden">
                    <Smartphone className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <h3 className="font-medium">Mobile Preview</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      This demo is best viewed on a desktop screen to see the
                      mobile simulator.
                    </p>
                    <Button variant="secondary" size="sm">
                      Continue Anyway
                    </Button>
                  </div>
                </div>
              : <div className="p-8 text-center">
                  <Smartphone className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                  <h2 className="mb-2 text-2xl font-bold">Select a Demo</h2>
                  <p className="mx-auto max-w-md text-muted-foreground">
                    Choose a demo from the gallery to preview the mobile
                    container component with different configurations and
                    features.
                  </p>
                </div>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
