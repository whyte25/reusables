"use client";
import { useEffect, useState } from "react";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "2xl" | "4k" | undefined;

interface ScreenSizeResult {
  screenSize: ScreenSize;
  isMobile: boolean;
}

const useScreenSize = (): ScreenSizeResult => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 425) {
      setScreenSize("xs");
      setIsMobile(true);
    } else if (width <= 600) {
      setScreenSize("sm");
      setIsMobile(true);
    } else if (width <= 758) {
      setScreenSize("md");
      setIsMobile(false);
    } else if (width <= 1200) {
      setScreenSize("lg");
      setIsMobile(false);
    } else if (width <= 1400) {
      setScreenSize("2xl");
      setIsMobile(false);
    } else if (width >= 1800) {
      setScreenSize("4k");
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenSize, isMobile };
};

export default useScreenSize;
