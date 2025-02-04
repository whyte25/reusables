import type { Node } from "unist"

interface MDXProps {
  children?: {
    props?: {
      className?: string
    }
  }
}

interface UnistNode extends Node {
  type: string
  name?: string
  tagName?: string
  value?: string
  properties?: {
    __rawString__?: string
    __className__?: string
    __event__?: string
    [key: string]: unknown
  } & NpmCommands
  attributes?: {
    name: string
    value: unknown
    type?: string
  }[]
  children?: UnistNode[]
}

interface UnistTree extends Node {
  children: UnistNode[]
}
