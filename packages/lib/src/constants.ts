export const COOKIES_DEFAULT_OPTIONS: Required<Omit<CookieOptions, "domain">> =
  {
    path: "/",
    secure: true,
    sameSite: "lax",
  };
