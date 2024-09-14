import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const { pathname, origin } = req.nextUrl;

    if (pathname === '/') {
      return NextResponse.next();
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (
      token &&
      Date.now() >= (token.data?.validity?.refresh_until || 0) * 1000
    ) {
      // Redirect to login page and clear session cookies
      const response = NextResponse.redirect(new URL('/login', origin));
      response.cookies.set('next-auth.session-token', '', { maxAge: 0 });
      response.cookies.set('next-auth.csrf-token', '', { maxAge: 0 });
      return response;
    }

    // If the user is authenticated, proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
  },
);

export const config = {
  matcher: [
    '/((?!$|api|register$|register/otp$|forgot-password|reset-password|invite|_next|proxy|assets|static|vercel).*)',
  ],
};
