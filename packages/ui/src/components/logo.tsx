"use client";
import { LogoIcon1, LogoIcon2 } from "@reusables/assets/icons";
import { cn } from "@reusables/lib";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  variant = "orange",
  href,
  className,
}: {
  variant?: "black" | "orange";
  href: string;
  className?: string;
}) => {
  const logoSrc = variant === "orange" ? LogoIcon1 : LogoIcon2;
  return (
    <Link href={href}>
      <Image
        src={logoSrc}
        alt=""
        height={50}
        width={160}
        className={cn(className)}
      />
    </Link>
  );
};
