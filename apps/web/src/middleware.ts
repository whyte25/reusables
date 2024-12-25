import { NextRequest, NextResponse } from "next/server";
const TOKEN_NAME = "";

// dont forget to use await
export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME);
  const userAgent = req.headers.get("user-agent") || "";

  if (
    userAgent.includes("Twitterbot") ||
    userAgent.includes("FacebookExternalHit") ||
    userAgent.includes("WhatsApp") ||
    userAgent.includes("WhatsApp/2.23.4.79 A") ||
    userAgent.includes("TelegramBot") ||
    req.headers.get("x-metadata-request") ||
    req.method === "HEAD" ||
    userAgent === "" ||
    (!token && userAgent.includes("bot"))
  ) {
    return NextResponse.next();
  }

  // Check if token is not present
  // if (!token) {
  //   let from = req.nextUrl.pathname;
  //   if (req.nextUrl.search) {
  //     from += req.nextUrl.search;
  //   }
  //   const response = NextResponse.redirect(
  //     new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
  //   );
  //   response.cookies.delete(TOKEN_NAME);
  //   return response;
  // }

  // Decode the token
  // const decoded = jose.decodeJwt(token?.value);

  // Check if the token is invalid or expired
  // if (!decoded || decoded.exp! * 1000 < Date.now()) {
  //   let from = req.nextUrl.pathname;
  //   if (req.nextUrl.search) {
  //     from += req.nextUrl.search;
  //   }
  //   const response = NextResponse.redirect(
  //     new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
  //   );
  //   response.cookies.delete(TOKEN_NAME);
  //   return response;
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     */
    "/((?!api|_next/static|_next/image|favicon.ico|privacy-policy|terms-of-service|login|signup|jobs).*)",
  ],
};
