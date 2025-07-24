"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { RefreshCcwDot } from "lucide-react"

interface SplashScreenProps {
  children: React.ReactNode
}

export const SplashScreen = ({ children }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Show splash screen for 3 seconds then fade out
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className="z-99999 fixed inset-0 flex items-center justify-center bg-[#080808]"
          >
            {/* Exact background from container-with-gradient.tsx */}
            <div className="absolute inset-0 h-full w-full" />

            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                  duration: 0.8,
                },
              }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="relative z-10 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.5, duration: 0.8 },
                }}
              >
                <Logo />
              </motion.div>

              {/* Animated loading indicator */}
              <motion.div
                className="mt-8 h-1 overflow-hidden rounded-full bg-white/20"
                initial={{ width: "0%" }}
                animate={{ width: "70%" }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-primary to-[#3b0606]"
                  animate={{
                    x: ["0%", "100%", "0%"],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render children regardless of splash state, but they'll be visible only after splash is gone */}
      <div className={`${showSplash ? "invisible" : "visible"}`}>
        {children}
      </div>
    </>
  )
}

export const Logo = () => {
  return (
    <div className="group flex items-center gap-2">
      <RefreshCcwDot
        size={17}
        className="transition-transform duration-300 group-hover:rotate-180"
      />
      <p>Reusables</p>
    </div>
  )
}
