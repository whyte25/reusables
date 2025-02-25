interface ApplicationError extends Error {
  info: string
  status: number
}

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"

export interface FetcherOptions extends Omit<RequestInit, "method"> {
  customHeaders?: Record<string, string>
  method?: HttpMethod
}

export const fetcher = async (url: string, options: FetcherOptions = {}) => {
  const { customHeaders, ...restOptions } = options

  const headers = {
    "Content-Type": "application/json",
    ...(customHeaders || {}),
    ...((options.headers as Record<string, string>) || {}),
  }

  const res = await fetch(url, {
    ...restOptions,
    headers,
  })

  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as ApplicationError

    const contentType = res.headers.get("content-type")
    error.info =
      contentType?.includes("application/json") ?
        await res.text().then((text) => {
          try {
            return JSON.parse(text)
          } catch {
            return text
          }
        })
      : await res.text()
    error.status = res.status

    throw error
  }

  return res.json()
}
