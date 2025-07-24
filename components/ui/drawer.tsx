"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"
import { usePortalTarget } from "@/hooks/use-portal-target"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = ({
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) => {
  const portalTarget = usePortalTarget()
  if (!portalTarget) return null
  return (
    <DrawerPrimitive.Portal container={portalTarget} {...props}>
      {children}
    </DrawerPrimitive.Portal>
  )
}

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const portalTarget = usePortalTarget()
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn(
        "inset-0 z-50 bg-black/80",
        portalTarget?.classList.contains("mobile-simulator") ?
          "absolute"
        : "fixed",
        className
      )}
      {...props}
    />
  )
})
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    "ref"
  > & {
    overlayClassName?: string
    showKnob?: boolean
  }
>(
  (
    { className, children, overlayClassName, showKnob = true, ...props },
    ref
  ) => {
    const portalTarget = usePortalTarget()
    return (
      <DrawerPortal>
        <DrawerOverlay className={overlayClassName} />
        <DrawerPrimitive.Content
          ref={ref}
          className={cn(
            "inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
            portalTarget?.classList.contains("mobile-simulator") ?
              "absolute"
            : "fixed",
            className
          )}
          style={{
            position:
              portalTarget?.classList.contains("mobile-simulator") ?
                "absolute"
              : "fixed",
          }}
          {...props}
        >
          {showKnob && (
            <div className="mx-auto mt-4 h-2 w-[50px] rounded-full bg-muted" />
          )}
          {children}
        </DrawerPrimitive.Content>
      </DrawerPortal>
    )
  }
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
