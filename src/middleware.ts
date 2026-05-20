import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const COMING_SOON_BYPASS = [
  "/coming-soon",
  "/studio",
  "/api",
  "/_next",
  "/brand",
  "/videos",
  "/favicon.ico",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (process.env.NEXT_PUBLIC_COMING_SOON === "true") {
    const isBypassed = COMING_SOON_BYPASS.some((p) => pathname.startsWith(p));
    if (!isBypassed) {
      return NextResponse.redirect(new URL("/coming-soon", request.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).)"],
};
