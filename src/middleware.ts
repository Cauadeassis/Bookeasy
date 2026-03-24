import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  console.log("Middleware acionado em:", request.nextUrl.pathname);
  const pathname = request.nextUrl.pathname;
  const cookie = request.cookies.get("bookeasy-session");
  const isLoginPage = pathname.startsWith("/login");

  if (!cookie && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (cookie && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
