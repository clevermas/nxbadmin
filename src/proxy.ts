import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

import { routes } from "./config/routes";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (req.method !== "GET") return NextResponse.next();

  const session = getSessionCookie(req);

  if (session && url.pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL(routes.admin, req.url));
  }

  if (!session && url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL(routes.login, req.url));
  }

  return NextResponse.next();
}

// Match all routes except for static files and Next.js internal routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
