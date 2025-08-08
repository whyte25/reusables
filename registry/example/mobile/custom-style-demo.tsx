"use client"

import React from "react"
import { ChevronsRight, Palette, Smartphone, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { MobileContainer } from "@/registry/reusables/ui/mobile/mobile-container"

/**
 * Demo showcasing custom styling and advanced configuration options
 */
export default function CustomStyleDemo() {
  // Configuration state
  const [contentOnly, setContentOnly] = React.useState(false)
  const [disableScroll, setDisableScroll] = React.useState(false)
  const [customClass, setCustomClass] = React.useState<string | null>(null)
  const [customContentClass, setCustomContentClass] = React.useState<
    string | null
  >(null)
  const [customBackground, setCustomBackground] = React.useState<string | null>(
    null
  )
  const [showHeader, setShowHeader] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState("gradient")

  // Style presets
  const stylePresets = {
    gradient: {
      contentClass: "bg-gradient-to-b from-violet-500/20 to-indigo-500/20",
      headerClass:
        "bg-gradient-to-r from-violet-500 to-indigo-500 text-white border-none",
      background: null,
    },
    minimal: {
      contentClass: "bg-zinc-50 dark:bg-zinc-900",
      headerClass: "bg-transparent border-none",
      background: null,
    },
    glassmorphism: {
      contentClass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md",
      headerClass:
        "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800",
      background:
        "bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-blue-500/20",
    },
    dark: {
      contentClass: "bg-black text-white",
      headerClass: "bg-zinc-900 text-white border-b border-zinc-800",
      background: "bg-zinc-950",
    },
    playful: {
      contentClass: "bg-yellow-50",
      headerClass: "bg-yellow-400 border-b-4 border-yellow-500",
      background: "bg-yellow-100",
    },
  }

  // Apply preset styles
  React.useEffect(() => {
    if (activeTab === "custom") return

    const preset = stylePresets[activeTab as keyof typeof stylePresets]
    setCustomContentClass(preset.contentClass)
    setCustomBackground(preset.background)

    // Don't override header if not showing
    if (showHeader) {
      setCustomClass(preset.headerClass)
    }
  }, [activeTab, showHeader])

  // Custom header component
  const header =
    showHeader ?
      <div
        className={`flex h-14 items-center justify-between px-4 ${customClass || ""}`}
      >
        <div className="flex items-center gap-3">
          <Smartphone className="h-5 w-5" />
          <h2 className="font-medium">Custom Styling</h2>
        </div>
        <div className="flex items-center gap-1">
          <Palette className="h-4 w-4" />
        </div>
      </div>
    : undefined

  return (
    <MobileContainer
      header={header}
      contentOnly={contentOnly}
      disableScroll={disableScroll}
      contentClassName={customContentClass || undefined}
      className={customClass || undefined}
      background={customBackground || undefined}
      padding="md"
      rounded="lg"
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Style Customization</h2>
            <Badge variant="outline">
              <Sparkles className="mr-1 h-3 w-3" /> Custom
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Customize the appearance and behavior of the mobile container
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-2 grid grid-cols-3">
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-2 gap-2">
            <TabsTrigger value="glassmorphism" className="w-full">
              Glass
            </TabsTrigger>
            <TabsTrigger value="dark" className="w-full">
              Dark
            </TabsTrigger>
          </TabsList>

          <TabsContent value="custom" className="mt-4 space-y-4">
            <div className="grid gap-2">
              <Label>Content Class</Label>
              <Select
                value={customContentClass || ""}
                onValueChange={setCustomContentClass}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Default</SelectItem>
                  <SelectItem value="bg-gradient-to-b from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30">
                    Sky Gradient
                  </SelectItem>
                  <SelectItem value="bg-white dark:bg-black rounded-t-2xl">
                    Rounded Top
                  </SelectItem>
                  <SelectItem value="bg-slate-100 dark:bg-slate-900 shadow-inner">
                    Inset Shadow
                  </SelectItem>
                  <SelectItem value="bg-white dark:bg-black border border-dashed border-slate-300 dark:border-slate-700">
                    Dashed Border
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Background</Label>
              <Select
                value={customBackground || ""}
                onValueChange={setCustomBackground}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select background style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Default</SelectItem>
                  <SelectItem value="bg-slate-100 dark:bg-slate-900">
                    Slate
                  </SelectItem>
                  <SelectItem value="bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-blue-500/20">
                    Gradient
                  </SelectItem>
                  <SelectItem value="bg-[url('/images/grid.png')] bg-repeat">
                    Grid Pattern
                  </SelectItem>
                  <SelectItem value="bg-black dark:bg-white">
                    Inverted
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Header Class</Label>
              <Select
                value={customClass || ""}
                onValueChange={setCustomClass}
                disabled={!showHeader}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select header style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Default</SelectItem>
                  <SelectItem value="bg-primary text-primary-foreground">
                    Primary
                  </SelectItem>
                  <SelectItem value="bg-transparent border-b">
                    Transparent
                  </SelectItem>
                  <SelectItem value="bg-black text-white">Black</SelectItem>
                  <SelectItem value="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none">
                    Gradient
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Layout Options</h3>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="content-only" className="text-sm font-medium">
                Content Only
              </Label>
              <p className="text-xs text-muted-foreground">
                Remove simulator frame on desktop
              </p>
            </div>
            <Toggle
              id="content-only"
              pressed={contentOnly}
              onPressedChange={setContentOnly}
              aria-label="Toggle content only mode"
            >
              <Smartphone className="h-4 w-4" />
            </Toggle>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="disable-scroll" className="text-sm font-medium">
                Disable Scroll
              </Label>
              <p className="text-xs text-muted-foreground">
                Fix content to prevent scrolling
              </p>
            </div>
            <Toggle
              id="disable-scroll"
              pressed={disableScroll}
              onPressedChange={setDisableScroll}
              aria-label="Toggle scroll mode"
            >
              <ChevronsRight className="h-4 w-4" />
            </Toggle>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-header" className="text-sm font-medium">
                Show Header
              </Label>
              <p className="text-xs text-muted-foreground">
                Toggle header visibility
              </p>
            </div>
            <Toggle
              id="show-header"
              pressed={showHeader}
              onPressedChange={setShowHeader}
              aria-label="Toggle header visibility"
            >
              <ChevronsRight className="h-4 w-4" />
            </Toggle>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-sm font-medium">Current Configuration</h3>
          <div className="space-y-1 font-mono text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">contentOnly:</span>{" "}
              {contentOnly.toString()}
            </p>
            <p>
              <span className="font-medium text-foreground">
                disableScroll:
              </span>{" "}
              {disableScroll.toString()}
            </p>
            <p>
              <span className="font-medium text-foreground">showHeader:</span>{" "}
              {showHeader.toString()}
            </p>
            <p className="truncate">
              <span className="font-medium text-foreground">
                contentClassName:
              </span>{" "}
              {customContentClass || "undefined"}
            </p>
            <p className="truncate">
              <span className="font-medium text-foreground">className:</span>{" "}
              {customClass || "undefined"}
            </p>
            <p className="truncate">
              <span className="font-medium text-foreground">background:</span>{" "}
              {customBackground || "undefined"}
            </p>
          </div>
        </div>

        <Card className="border-dashed bg-muted/50">
          <div className="p-4 text-center">
            <h4 className="text-sm font-medium">
              MobileContainer Customization
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              The MobileContainer component supports custom styling through
              className, contentClassName, and background props.
            </p>
          </div>
        </Card>
      </div>
    </MobileContainer>
  )
}
