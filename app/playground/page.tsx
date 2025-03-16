import RotateAnimatedDemo from "@/registry/example/animated-card-carousel-demo"

export default function PlaygroundPage() {
  return (
    <div className=" ">
      <div className="flex flex-col gap-4">
        <div className="flex min-h-screen items-center justify-center rounded-lg border bg-background px-4 md:p-4">
          <RotateAnimatedDemo />
        </div>
      </div>
    </div>
  )
}
