"use client"

import { ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"

interface ConfirmModalProps {
  title: string
  description: string
  children?: ReactNode
  trigger?: ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onConfirm: () => void
  onCancel?: () => void
  cancelText?: string
  confirmText?: string
  dialogContentClassName?: string
  descriptionClassName?: string
  titleClassName?: string
  disabledOnConfirm?: boolean
}

export const ConfirmModal = ({
  title,
  description,
  children,
  trigger = true,
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  cancelText = "Cancel",
  confirmText = "Continue",
  dialogContentClassName,
  descriptionClassName,
  titleClassName,
  disabledOnConfirm,
}: ConfirmModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent
        className={cn("max-w-[90%] gap-6 p-0 pt-3", dialogContentClassName)}
        onClick={(e) => e.stopPropagation()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className={cn(
              "text-center text-sm text-primary 2xl:text-base",
              titleClassName
            )}
          >
            {title}
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription
            className={cn(
              "px-2 pt-3 text-center text-sm 2xl:text-base",
              descriptionClassName
            )}
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children && <div>{children}</div>}
        <AlertDialogFooter className="space-x-0 border-t">
          <AlertDialogCancel
            className="w-full rounded-r-none text-sm 2xl:text-base"
            onClick={onCancel}
          >
            {cancelText}
          </AlertDialogCancel>
          <Separator orientation="vertical" />
          <AlertDialogAction
            disabled={disabledOnConfirm}
            className="w-full rounded-l-none text-sm 2xl:text-base"
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
