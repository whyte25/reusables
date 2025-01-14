"use client";

import { cn } from "@/lib/utils";
import type { ImageProps } from "next/image";
import Image from "next/image";

interface ThemeImageProps extends Omit<ImageProps, "src" | "className"> {
  lightSrc: ImageProps["src"];
  darkSrc: ImageProps["src"];
  className?: string;
}

const ThemeImage = ({
  lightSrc,
  darkSrc,
  alt,
  className,
  ...props
}: ThemeImageProps) => {
  return (
    <>
      <Image
        src={lightSrc}
        alt={alt}
        className={cn("dark:hidden", className)}
        {...props}
      />
      <Image
        src={darkSrc}
        alt={alt}
        className={cn("hidden dark:block", className)}
        {...props}
      />
    </>
  );
};

export default ThemeImage;
