"use client"

import React from "react"
import { LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileContainer } from "@/registry/reusables/ui/mobile/mobile-container"

/**
 * Demo showcasing splash screen and animation options
 */
export default function SplashScreenDemo() {
  const [showSplash, setShowSplash] = React.useState(true)
  const [animationType, setAnimationType] = React.useState<
    "default" | "custom" | "none"
  >("default")

  // Handle animation configuration
  const splashAnimationConfig = React.useMemo(() => {
    if (animationType === "custom") {
      return {
        enterClass: "animate-in zoom-in duration-500",
        exitClass: "animate-out zoom-out duration-500",
        timing: "cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
      }
    }
    return undefined
  }, [animationType])

  const resetDemo = () => {
    setShowSplash(true)
  }

  // Custom splash screen content
  const splashContent = (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-primary text-primary-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border-4 border-primary-foreground p-4">
          <LogIn className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold">Mobile App</h1>
        <p className="text-sm opacity-80">Loading your experience...</p>
      </div>
    </div>
  )

  return (
    <>
      {showSplash ?
        <MobileContainer
          splashScreen={splashContent}
          splashScreenDuration={3000}
          useSplashAnimation={animationType !== "none"}
          splashAnimationConfig={splashAnimationConfig}
          onRendered={() =>
            console.log("MobileContainer with splash screen rendered")
          }
        >
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4">
            <h1 className="text-xl font-semibold">Splash Screen Demo</h1>
            <p className="text-center text-sm text-muted-foreground">
              This example demonstrates the splash screen functionality with
              different animation options.
            </p>
            <Button onClick={resetDemo}>Reload with Splash Screen</Button>

            <div className="mt-4 grid w-full grid-cols-1 gap-2">
              <h2 className="text-sm font-medium">Animation Type:</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={animationType === "default" ? "default" : "outline"}
                  onClick={() => setAnimationType("default")}
                >
                  Default Animation
                </Button>
                <Button
                  size="sm"
                  variant={animationType === "custom" ? "default" : "outline"}
                  onClick={() => setAnimationType("custom")}
                >
                  Custom Animation
                </Button>
                <Button
                  size="sm"
                  variant={animationType === "none" ? "default" : "outline"}
                  onClick={() => setAnimationType("none")}
                >
                  No Animation
                </Button>
              </div>
            </div>
          </div>
        </MobileContainer>
      : <MobileContainer>
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4">
            <h1 className="text-xl font-semibold">Splash Screen Demo</h1>
            <p className="text-center text-sm text-muted-foreground">
              Splash screen has finished. Click the button below to see it
              again.
            </p>
            <Button onClick={resetDemo}>Reload with Splash Screen</Button>

            <div className="mt-4 grid w-full grid-cols-1 gap-2">
              <h2 className="text-sm font-medium">
                Animation Type for Next Display:
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={animationType === "default" ? "default" : "outline"}
                  onClick={() => setAnimationType("default")}
                >
                  Default Animation
                </Button>
                <Button
                  size="sm"
                  variant={animationType === "custom" ? "default" : "outline"}
                  onClick={() => setAnimationType("custom")}
                >
                  Custom Animation
                </Button>
                <Button
                  size="sm"
                  variant={animationType === "none" ? "default" : "outline"}
                  onClick={() => setAnimationType("none")}
                >
                  No Animation
                </Button>
              </div>
            </div>
          </div>
        </MobileContainer>
      }
    </>
  )
}
