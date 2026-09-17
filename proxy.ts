import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// ตรวจแบบเร็วจาก cookie เท่านั้น (optimistic) การตรวจ session จริงอยู่ที่ verifySession() ในแต่ละหน้า
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/contacts/:path*"],
};
