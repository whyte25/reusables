import { cn } from "@/lib/utils"

interface ComponentWrapperProps {
  className?: string
  children: any
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        "relative flex max-w-screen flex-col items-center justify-center rounded-xl bg-background p-0 pt-10 md:border md:p-16",
        className
      )}
    >
      {children}
    </div>
  )
}

export default ComponentWrapper
