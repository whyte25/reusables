import Cookies from "js-cookie"

type SameSiteOption = "lax" | "strict" | "none"

interface CookieOptions {
  path?: string
  secure?: boolean
  sameSite?: SameSiteOption
  domain?: string
}

const COOKIES_DEFAULT_OPTIONS: Required<Omit<CookieOptions, "domain">> = {
  path: "/",
  secure: true,
  sameSite: "lax",
}

/**
 * This module provides a way to interact with cookies on the client.
 *
 * - `set` sets a cookie with the given name and value.
 * - `get` gets the value of a cookie with the given name.
 * - `delete` deletes a cookie with the given name.
 */

export const ClientCookies = {
  set(name: string, value: string, options: Partial<CookieOptions> = {}) {
    Cookies.set(name, value, COOKIES_DEFAULT_OPTIONS)
  },

  get(name: string) {
    return Cookies.get(name) || null
  },

  delete(name: string) {
    Cookies.remove(name, COOKIES_DEFAULT_OPTIONS)
  },
}
