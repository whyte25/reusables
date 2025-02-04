import { Suspense } from "react"

import { validateRegistryComponent } from "@/lib/registry-helpers"

interface PreviewPageProps {
  params: Promise<{
    name: string
  }>
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { name } = await params
  const Component = validateRegistryComponent(name)

  return (
    <div className=" ">
      <div className="flex flex-col gap-4">
        <div className="flex min-h-screen items-center justify-center rounded-lg border bg-background px-4 md:p-4">
          <Suspense
            fallback={
              <div className="flex h-[400px] w-full items-center justify-center">
                <div className="animate-spin">Loading...</div>
              </div>
            }
          >
            <Component />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
