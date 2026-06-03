import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const session = await verifySession(token);
    if (!session) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
      return response;
    }
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const session = await verifySession(token);
    if (!session) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Sesión no válida. Iniciá sesión nuevamente." },
        { status: 401 }
      );
    }
    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Sesión expirada. Iniciá sesión nuevamente." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
