import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

/** Guards /admin: no valid session cookie -> login page. Server actions re-check the session too. */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const authed = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);

  if (!authed && !isLogin) return NextResponse.redirect(new URL("/admin/login", req.url));
  if (authed && isLogin) return NextResponse.redirect(new URL("/admin", req.url));

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
