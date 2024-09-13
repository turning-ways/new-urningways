import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    // console.debug(pathname);
    if (pathname === "/") {
      return NextResponse.next();
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token && Date.now() >= token.data.validity.refresh_until * 1000) {
      // if the access token is expired, redirect to the login page
      const response = NextResponse.redirect(new URL("/login", req.url));
      // Clear the session cookies
      response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
      response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
      return response;
    }
    // If the user is authenticated, return the next response
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
      error: "/login",
    },
  }
);

// Authenticate all routes except for /api, /_next/static, /_next/image, .png files and / (root) paths
export const config = {
  matcher: [
    "/((?!$|api|register$|register/otp$|forgot-password|reset-password|invite|_next|proxy|assets|static|vercel).*)",
  ],
};
