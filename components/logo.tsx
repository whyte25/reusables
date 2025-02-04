import { RefreshCcwDot } from "lucide-react"

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
