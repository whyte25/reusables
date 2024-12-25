type SameSiteOption = "lax" | "strict" | "none";

interface CookieOptions {
  path?: string;
  secure?: boolean;
  sameSite?: SameSiteOption;
  domain?: string;
}
