import { validateRegistryComponent } from "@/lib/registry-helpers";
import { Suspense } from "react";

interface PreviewPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { name } = await params;
  const Component = validateRegistryComponent(name);

  return (
    <div className=" ">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border bg-background min-h-screen px-4  md:p-4  flex items-center justify-center ">
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
  );
}
