import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const protectedRoute =
    pathname.startsWith("/dashboard");

  // temporarily allow dashboard access during testing
  if (protectedRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};