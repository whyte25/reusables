"use client";

import { paths } from "@/constant/paths";
import { siteConfig } from "@/constant/site-config";
import { cn } from "@/lib/utils";
import { ChevronRight, Github } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import AnimatedGradientText from "./ui/animated-gradient-text";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className=" ">
      <div className=" flex w-full items-center justify-center overflow-hidden rounded-lg ">
        <div className="relative px-4">
          <div className="text-center">
            <motion.div
              className="relative z-10 mb-4 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={paths.docs}
                className="z-10 flex items-center justify-center"
              >
                <AnimatedGradientText className="border rounded-full">
                  🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                  <span className={cn("inline animate-gradient ")}>
                    Reusables
                  </span>
                  <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
              </Link>
            </motion.div>

            <motion.h1
              className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Reusable Building Blocks for Faster Interface Design.
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              A curated collection of reusable components, hooks, and utility
              functions for React, TypeScript, Tailwind CSS, and Framer Motion.
              Copy, customize, and integrate directly into your projects.
            </motion.p>
            <motion.div
              className="flex flex-col items-center justify-center mt-6 sm:flex-row sm:space-x-4 sm:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="mx-auto flex w-full max-w-sm  flex-wrap items-center justify-center gap-3 md:flex-nowrap">
                <Button
                  variant={"outline"}
                  className="w-full rounded-full "
                  asChild
                >
                  <Link
                    href={paths.docs}
                    className="flex flex-row items-center gap-2 "
                  >
                    Explore Docs
                  </Link>
                </Button>
                <Button className="w-full  rounded-full" asChild>
                  <Link
                    href={siteConfig.links.github}
                    aria-label="Dokploy on GitHub"
                    target="_blank"
                    className="flex flex-row items-center gap-2"
                  >
                    <Github />
                    Github
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
