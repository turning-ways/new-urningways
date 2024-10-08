import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { getUserViaToken } from './lib/utils/getUserViaToken';

export default withAuth(
  async function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const referer = req.headers.get('referer');
    if (pathname === '/') {
      return NextResponse.next();
    }
    const user = await getUserViaToken(req);

    if (!user) {
      return NextResponse.redirect(new URL('/login', origin));
    } else if (user) {
      // console.debug('User:', user);
      if (
        user &&
        user.role === 'ADMIN' &&
        user.churchId === null &&
        referer?.includes('/login') &&
        pathname !== '/register/otp' &&
        pathname !== '/register/setup'
      ) {
        return NextResponse.redirect(new URL('/register/setup', origin));
      }
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
