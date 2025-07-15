"use server"

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

type SameSiteOption = "lax" | "strict" | "none"

interface CookieOptions {
  path?: string
  secure?: boolean
  sameSite?: SameSiteOption
  domain?: string
  expires?: Date
  maxAge?: number
  httpOnly?: boolean
}
const COOKIES_DEFAULT_OPTIONS: Required<Omit<CookieOptions, "domain">> = {
  path: "/",
  secure: true,
  sameSite: "lax",
  httpOnly: true,
  expires: new Date(Date.now() + 60 * 60 * 24 * 7),
  maxAge: 60 * 60 * 24 * 7,
}

/**
 * This module provides a way to interact with cookies on the server.
 * The first ServerCookies object is for Next.js 12 and later. while the second set is for Next.js 15.
 * you will get error if you use the first set in Next.js 15 because async/await is expected.
 *
 * - `set` sets a cookie with the given name and value.
 * - `get` gets the value of a cookie with the given name.
 * - `delete` deletes a cookie with the given name.
 */

/**
 * This is for Next.js 13 - 14.

export const ServerCookies = {
  set(name: string, value: string, options: Partial<CookieOptions> = {}) {
   const cookieOptions: ResponseCookie = {
      name,
      value,
      path: options.path || COOKIES_DEFAULT_OPTIONS.path,
      secure: options.secure ?? COOKIES_DEFAULT_OPTIONS.secure,
      sameSite: options.sameSite || COOKIES_DEFAULT_OPTIONS.sameSite,
      httpOnly: options.httpOnly ?? COOKIES_DEFAULT_OPTIONS.httpOnly,
      expires: options.expires || COOKIES_DEFAULT_OPTIONS.expires,
      maxAge: options.maxAge || COOKIES_DEFAULT_OPTIONS.maxAge,
    };


    if (options.domain) {
      cookieOptions.domain = options.domain
    }

    cookies().set(cookieOptions)
  },

  get(name: string) {
    return cookies().get(name)?.value ?? null
  },

  delete(name: string) {
    cookies().delete(name)
  },
}
 */

export const ServerCookiesNext15 = {
  async set(name: string, value: string, options: Partial<CookieOptions> = {}) {
    const cookieOptions: ResponseCookie = {
      name,
      value,
      path: options.path || COOKIES_DEFAULT_OPTIONS.path,
      secure: options.secure ?? COOKIES_DEFAULT_OPTIONS.secure,
      sameSite: options.sameSite || COOKIES_DEFAULT_OPTIONS.sameSite,
      httpOnly: options.httpOnly ?? COOKIES_DEFAULT_OPTIONS.httpOnly,
      expires: options.expires || COOKIES_DEFAULT_OPTIONS.expires,
      maxAge: options.maxAge || COOKIES_DEFAULT_OPTIONS.maxAge,
    }

    if (options.domain) {
      cookieOptions.domain = options.domain
    }

    ;(await cookies()).set(cookieOptions)
  },

  async get(name: string) {
    return (await cookies()).get(name)?.value ?? null
  },

  async delete(name: string) {
    ;(await cookies()).delete(name)
  },
}
