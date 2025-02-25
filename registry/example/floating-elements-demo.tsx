"use client"

import { cn } from "@/lib/utils"

import { FloatingElements } from "../reusables/floating-elements"

const logos = [
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179100/skyLogo_zi6fow.jpg",
    link: "#",
    bgColor: "bg-[#0f0f10]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/wearecasinoLogo_bffqz7.gif",
    link: "#",
    bgColor: "bg-[#023fee]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/pixwinLogo_kmwxzv.svg",
    link: "#",
    bgColor: "bg-[#060d1c]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/wearelotteryLogo_n5fz08.png",
    link: "#",
    bgColor: "bg-[#0e132a]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/socketLogo_ct5obw.png",
    link: "#",
    bgColor: "bg-[#060d1c]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179065/paysureLogo_pvo0zh.png",
    link: "#",
    bgColor: "bg-[#ffffff]",
  },
  {
    img: "https://res.cloudinary.com/duli9q35f/image/upload/v1740179064/kudipalLogo_ha6a43.png",
    link: "#",
    bgColor: "bg-[#006fee]",
  },
]

export default function FloatingElementsDemo() {
  return (
    <FloatingElements title="Trusted by" className="py-20">
      {logos.map((logo, i) => (
        <a
          key={i}
          href={logo.link}
          className={cn(
            `relative flex h-36 w-36 items-center justify-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition duration-500 ease-in-out hover:scale-100 sm:hover:scale-110`,
            logo.bgColor
          )}
        >
          <img
            src={logo.img}
            alt={`${logo.link} logo`}
            className="h-28 w-28 object-contain"
          />
        </a>
      ))}
    </FloatingElements>
  )
}
