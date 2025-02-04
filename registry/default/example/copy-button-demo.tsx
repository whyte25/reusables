import CopyButton from "../reusables/ui/copy-button"

export default function CopyButtonDemo() {
  const text = "Built by Fas"

  return (
    <div className="flex items-center gap-2">
      <p>{text}</p>
      <CopyButton value={text} />
    </div>
  )
}
