"use client"

import { useEffect, useState } from "react"

type ScreenSize = "xs" | "sm" | "md" | "lg" | "2xl" | "4k" | undefined

interface ScreenSizeResult {
  screenSize: ScreenSize
  isMobile: boolean
}

const useScreenSize = (): ScreenSizeResult => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(undefined)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQueries = {
      xs: window.matchMedia("(max-width: 425px)"),
      sm: window.matchMedia("(min-width: 426px) and (max-width: 600px)"),
      md: window.matchMedia("(min-width: 601px) and (max-width: 768px)"),
      lg: window.matchMedia("(min-width: 769px) and (max-width: 1200px)"),
      _2xl: window.matchMedia("(min-width: 1201px) and (max-width: 1400px)"),
      _4k: window.matchMedia("(min-width: 1800px)"),
    }

    const updateScreenSize = () => {
      if (mediaQueries.xs.matches) {
        setScreenSize("xs")
        setIsMobile(true)
      } else if (mediaQueries.sm.matches) {
        setScreenSize("sm")
        setIsMobile(true)
      } else if (mediaQueries.md.matches) {
        setScreenSize("md")
        setIsMobile(false)
      } else if (mediaQueries.lg.matches) {
        setScreenSize("lg")
        setIsMobile(false)
      } else if (mediaQueries._2xl.matches) {
        setScreenSize("2xl")
        setIsMobile(false)
      } else if (mediaQueries._4k.matches) {
        setScreenSize("4k")
        setIsMobile(false)
      }
    }

    updateScreenSize()

    Object.values(mediaQueries).forEach((query) => {
      query.addEventListener("change", updateScreenSize)
    })

    return () => {
      Object.values(mediaQueries).forEach((query) => {
        query.removeEventListener("change", updateScreenSize)
      })
    }
  }, [])

  return { screenSize, isMobile }
}

export default useScreenSize
