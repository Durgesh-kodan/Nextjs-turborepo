import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const isPublicRoute =
    pathname.startsWith("/auth") || pathname === "/unauthorized";

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  if (session && !isPublicRoute) {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (session.user?.email !== adminEmail) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.ico$).*)",
  ],
};
