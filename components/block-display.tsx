import * as React from "react"
import { registryItemFileSchema } from "shadcn/registry"
import { z } from "zod"

import {
  createFileTreeForRegistryItemFiles,
  getRegistryItem,
} from "@/lib/registry-helpers"
import { cn } from "@/lib/utils"

import { BlockViewer } from "./block-viewer"
import { highlight } from "./code-block-highlighter"
import { ComponentSource } from "./component-source"

export async function BlockDisplay({ name }: { name: string }) {
  const item = await getCachedRegistryItem(name)

  if (!item?.files) {
    return null
  }

  const [tree, highlightedFiles] = await Promise.all([
    getCachedFileTree(item.files),
    getCachedHighlightedFiles(item.files),
  ])

  return (
    <BlockViewer item={item} tree={tree} highlightedFiles={highlightedFiles}>
      <ComponentSource
        name={item.name}
        hideCode
        className={cn(
          "**:[.preview]:h-auto **:[.preview]:p-4 **:[.preview>.p-6]:p-0 my-0",
          item.meta?.containerClassName
        )}
      />
    </BlockViewer>
  )
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name)
})

const getCachedFileTree = React.cache(
  async (files: Array<{ path: string; target?: string }>) => {
    if (!files) {
      return null
    }

    return await createFileTreeForRegistryItemFiles(files)
  }
)

const getCachedHighlightedFiles = React.cache(
  async (files: z.infer<typeof registryItemFileSchema>[]) => {
    return await Promise.all(
      files.map(async (file) => ({
        ...file,
        highlightedContent: await highlight(file.content ?? "", "tsx"),
      }))
    )
  }
)
