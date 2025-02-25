"use client"

import { useState } from "react"
import { Monitor, Smartphone, Tablet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import useScreenSize from "../hooks/use-screen-size"

export default function ScreenSizeDemo() {
  const { screenSize, isMobile } = useScreenSize()
  const [forcedWidth, setForcedWidth] = useState<string | null>(null)

  const breakpoints = [
    {
      name: "Mobile",
      width: "400px",
      icon: <Smartphone className="h-6 w-6" />,
      expected: ["xs", "sm"],
    },
    {
      name: "Tablet",
      width: "758px",
      icon: <Tablet className="h-6 w-6" />,
      expected: ["md"],
    },
    {
      name: "Desktop",
      width: "1200px",
      icon: <Monitor className="h-6 w-6" />,
      expected: ["lg"],
    },
    // {
    //   name: "4K",
    //   width: "1800px",
    //   icon: <Television className="w-6 h-6" />,
    //   expected: ["4k"],
    // },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {breakpoints.map((point) => (
          <Button
            key={point.name}
            variant={forcedWidth === point.width ? "default" : "outline"}
            onClick={() =>
              setForcedWidth(forcedWidth === point.width ? null : point.width)
            }
            className="flex items-center gap-2"
          >
            {point.icon}
            {point.name}
          </Button>
        ))}
      </div>

      <Card
        style={{ width: forcedWidth || "100%" }}
        className="p-6 transition-all duration-300"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {breakpoints.map((point) => (
              <div
                key={point.name}
                className={`rounded p-2 ${
                  point.expected.includes(screenSize || "") ?
                    "bg-primary text-primary-foreground"
                  : "bg-muted"
                }`}
              >
                {point.icon}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium">
              Current Screen Size:{" "}
              <span className="text-primary">{screenSize}</span>
            </p>
            <p>Device Type: {isMobile ? "Mobile" : "Desktop"}</p>
            <p className="text-sm text-muted-foreground">
              Resize the card or your browser window to see changes
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
