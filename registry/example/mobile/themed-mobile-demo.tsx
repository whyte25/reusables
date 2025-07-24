"use client"

import React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileContainer } from "@/registry/reusables/ui/mobile/mobile-container"

/**
 * Demo showcasing theme variants and styling options for MobileContainer
 */
export default function ThemedMobileDemo() {
  const [theme, setTheme] = React.useState<"default" | "light" | "dark">(
    "default"
  )
  const [size, setSize] = React.useState<
    "default" | "compact" | "comfortable" | "spacious"
  >("default")
  const [rounded, setRounded] = React.useState<
    "default" | "none" | "sm" | "md" | "lg" | "xl"
  >("default")
  const [padding, setPadding] = React.useState<
    "none" | "sm" | "md" | "lg" | "xl"
  >("none")

  return (
    <MobileContainer
      theme={theme}
      size={size}
      rounded={rounded}
      padding={padding}
      header={
        <div className="flex h-12 items-center justify-between border-b bg-background p-2">
          <h1 className="text-lg font-semibold">Theme Options</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ?
              <Sun className="h-5 w-5" />
            : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      }
    >
      <div className="flex flex-1 flex-col gap-6 p-4">
        <section>
          <h2 className="mb-2 font-medium">Theme</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={theme === "default" ? "default" : "outline"}
              onClick={() => setTheme("default")}
            >
              Default
            </Button>
            <Button
              size="sm"
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
            >
              Light
            </Button>
            <Button
              size="sm"
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
            >
              Dark
            </Button>
          </div>
        </section>

        <section>
          <h2 className="mb-2 font-medium">Spacing</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={size === "default" ? "default" : "outline"}
              onClick={() => setSize("default")}
            >
              Default
            </Button>
            <Button
              size="sm"
              variant={size === "compact" ? "default" : "outline"}
              onClick={() => setSize("compact")}
            >
              Compact
            </Button>
            <Button
              size="sm"
              variant={size === "comfortable" ? "default" : "outline"}
              onClick={() => setSize("comfortable")}
            >
              Comfortable
            </Button>
            <Button
              size="sm"
              variant={size === "spacious" ? "default" : "outline"}
              onClick={() => setSize("spacious")}
            >
              Spacious
            </Button>
          </div>
        </section>

        <section>
          <h2 className="mb-2 font-medium">Corner Radius</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={rounded === "default" ? "default" : "outline"}
              onClick={() => setRounded("default")}
            >
              Default
            </Button>
            <Button
              size="sm"
              variant={rounded === "none" ? "default" : "outline"}
              onClick={() => setRounded("none")}
            >
              None
            </Button>
            <Button
              size="sm"
              variant={rounded === "sm" ? "default" : "outline"}
              onClick={() => setRounded("sm")}
            >
              Small
            </Button>
            <Button
              size="sm"
              variant={rounded === "md" ? "default" : "outline"}
              onClick={() => setRounded("md")}
            >
              Medium
            </Button>
            <Button
              size="sm"
              variant={rounded === "lg" ? "default" : "outline"}
              onClick={() => setRounded("lg")}
            >
              Large
            </Button>
            <Button
              size="sm"
              variant={rounded === "xl" ? "default" : "outline"}
              onClick={() => setRounded("xl")}
            >
              XL
            </Button>
          </div>
        </section>

        <section>
          <h2 className="mb-2 font-medium">Content Padding</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={padding === "none" ? "default" : "outline"}
              onClick={() => setPadding("none")}
            >
              None
            </Button>
            <Button
              size="sm"
              variant={padding === "sm" ? "default" : "outline"}
              onClick={() => setPadding("sm")}
            >
              Small
            </Button>
            <Button
              size="sm"
              variant={padding === "md" ? "default" : "outline"}
              onClick={() => setPadding("md")}
            >
              Medium
            </Button>
            <Button
              size="sm"
              variant={padding === "lg" ? "default" : "outline"}
              onClick={() => setPadding("lg")}
            >
              Large
            </Button>
            <Button
              size="sm"
              variant={padding === "xl" ? "default" : "outline"}
              onClick={() => setPadding("xl")}
            >
              XL
            </Button>
          </div>
        </section>

        <div className="rounded-md bg-primary/10 p-4 text-center">
          <p className="text-sm">
            Current configuration:
            <br />
            <code>{`theme="${theme}", size="${size}", rounded="${rounded}", padding="${padding}"`}</code>
          </p>
        </div>
      </div>
    </MobileContainer>
  )
}
