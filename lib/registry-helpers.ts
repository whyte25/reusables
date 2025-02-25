import { notFound } from "next/navigation"
import { Index } from "@/__registry__"

export type Style = {
  name: string
  type: string
  registryDependencies?: string[]
  files: string[]
  component: React.LazyExoticComponent<any>
  source: string
  category: string
  subcategory: string
  chunks: string[]
}

export const DEFAULT_REGISTRY_STYLE = "default"

const memoizedIndex: typeof Index = Object.fromEntries(
  Object.entries(Index).map(([style, items]) => [style, { ...items }])
)

export function getRegistryComponent(name: string) {
  return memoizedIndex[name]?.component
}

export function getRegistryItem(name: string) {
  return memoizedIndex[name]
}

export function validateRegistryComponent(name: string) {
  const Component = getRegistryComponent(name)

  if (!Component) {
    return notFound()
  }

  return Component
}
