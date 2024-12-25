import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { COOKIES_DEFAULT_OPTIONS } from "./constants";

export const ServerCookies = {
  set(name: string, value: string, options: Partial<CookieOptions> = {}) {
    const cookieOptions: ResponseCookie = {
      name,
      value,
      path: options.path || COOKIES_DEFAULT_OPTIONS.path,
      secure: options.secure ?? COOKIES_DEFAULT_OPTIONS.secure,
      sameSite: options.sameSite || COOKIES_DEFAULT_OPTIONS.sameSite,
    };

    if (options.domain) {
      cookieOptions.domain = options.domain;
    }

    cookies().set(cookieOptions);
  },

  get(name: string) {
    return cookies().get(name)?.value ?? null;
  },

  delete(name: string) {
    cookies().delete(name);
  },
};
