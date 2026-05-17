import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"

import { source } from "@/lib/source"
import { MDXRenderer } from "@/components/mdx-components"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return (
    <DocsPage
      toc={page.data.toc}
      lastUpdate={page.data.lastModified}
      full={page.data.full}
      editOnGithub={{
        owner: "whyte25",
        repo: "reusables",
        sha: "main",
        path: `content/docs/${page.path}`,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXRenderer code={page.data.body} />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata
}
