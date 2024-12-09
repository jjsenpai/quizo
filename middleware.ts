import { JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { deleteSession, verifyAuth } from "@/lib/actions";
import { FRONTEND_URLS, UserType } from "@/lib/constants";

const publicRoutes = [
  "/",
  FRONTEND_URLS.SIGNUP,
  FRONTEND_URLS.LOGIN_ATTEMPT,
  FRONTEND_URLS.LOGIN_CREATE,
  FRONTEND_URLS.FORGOT_PASSWORD,
  FRONTEND_URLS.RESET_PASSWORD,
];

const adminRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);

  let verifiedToken: JWTPayload | null;
  try {
    verifiedToken = await verifyAuth(req);
  } catch {
    verifiedToken = null;
  }

  if (!verifiedToken && !isPublicRoute) {
    console.log(1);
    await deleteSession();
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } else if (verifiedToken && !verifiedToken.iad && isAdminRoute) {
    console.log(2);
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } else if (verifiedToken?.role === UserType.Teacher && isPublicRoute) {
    console.log(3);
    return NextResponse.redirect(new URL("/create", req.nextUrl));
  } else if (verifiedToken?.role === UserType.User && isPublicRoute) {
    console.log(4);
    return NextResponse.redirect(new URL("/attempt", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
