import Cookies from "js-cookie";
import { COOKIES_DEFAULT_OPTIONS } from "./constants";

export const ClientCookies = {
  set(name: string, value: string, options: Partial<CookieOptions> = {}) {
    Cookies.set(name, value, COOKIES_DEFAULT_OPTIONS);
  },

  get(name: string) {
    return Cookies.get(name) || null;
  },

  delete(name: string) {
    Cookies.remove(name, COOKIES_DEFAULT_OPTIONS);
  },
};
