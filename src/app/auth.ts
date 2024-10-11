import NextAuth, {
  Account,
  AuthValidity,
  BackendJWT,
  NextAuthOptions,
  User,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { getCookie, setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { create } from 'domain';

async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
  try {
    // Request to the API Refresh Token endpoint
    const axiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
      {
        refreshToken: nextAuthJWTCookie.data.user.refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const accessToken = axiosResponse?.data.data.accessToken;

    const expiry = jwtDecode(accessToken).exp || 0;
    nextAuthJWTCookie.data.validity.valid_until = expiry;
    nextAuthJWTCookie.data.user.accessToken = accessToken;
    return nextAuthJWTCookie;
  } catch (error: any) {
    return { ...nextAuthJWTCookie, error: 'RefreshAccessTokenError' };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          // Request to the API Login endpoint
          const axiosResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          // If the response is successful, return the user object
          const user = axiosResponse?.data?.data;

          // set the tokens in the user object
          const tokens: BackendJWT = {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };

          // set the validity of the token
          const validity: AuthValidity = {
            valid_until: jwtDecode(user.accessToken)?.exp || 0,
            refresh_until: jwtDecode(user.refreshToken).exp || 0,
          };

          // If the response is successful and the user object is not null, return the user object
          if (axiosResponse.status === 200 && user) {
            return {
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isDev: user.isDev,
                devRole: user.devRole,
                createdAt: user.createdAt,
                churchId: user.churchId,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
              },
              tokens,
              validity,
            } as unknown as User;
          } else {
            return null;
          }
        } catch (error: any) {
          // If the response is unsuccessful, return the error message
          return { error: error.response.data.message } as unknown as User;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: { user: any }) {
      if (user?.error) {
        throw new Error(user?.error);
      }

      return true;
    },

    // the redirect
    async redirect({ url, baseUrl }) {
      // If the URL is a relative path (like `/admin`), return it appended to the baseUrl
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }

      // If the URL is part of the same origin as baseUrl, return it as is
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      // Otherwise, default to the baseUrl (homepage)
      return baseUrl;
    },
    // @ts-ignore
    async jwt({ token, user, account, trigger, session }) {
      const userType = getCookie('userType', { cookies });
      // console.log('User Type', userType);

      if (trigger && trigger === 'update') {
        token.data.user.churchId = session.churchId;
        return token;
      }

      if (account && account.provider === 'google') {
        try {
          const response = await api.post('/auth/google-verify', {
            token: account.id_token,
            role: userType,
          });
          const user = response?.data?.data;

          // process the user object
          // set the tokens in the user object
          const tokens: BackendJWT = {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };

          // set the validity of the token
          const validity: AuthValidity = {
            valid_until: jwtDecode(user.accessToken)?.exp || 0,
            refresh_until: jwtDecode(user.refreshToken).exp || 0,
          };

          return {
            ...token,
            data: {
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                churchId: user.churchId,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
              },
              tokens,
              validity,
            },
          };
        } catch (err) {
          cookies().set('AuthError', 'User_not_registered', {
            maxAge: 60,
            // domain: `localhost`,
          });
          console.error(err);
          return { ...token, error: 'User not registered' };
        }
      }

      if (user) {
        console.log(token);
        // console.debug("Initial User:", user);
        return { ...token, data: user };
      }

      if (Date.now() < token?.data?.validity?.valid_until * 1000) {
        console.debug('Access Token is still valid');
        return token;
      }

      //The refresh token is still valid
      if (Date.now() < token?.data?.validity?.refresh_until * 1000) {
        console.debug(
          'Access Token has expired, but Refresh Token is still valid',
        );
        return await refreshAccessToken(token);
      }

      // The current access token and refresh token have both expired
      // This should not really happen unless you get really unlucky with
      // the timing of the token expiration because the middleware should
      // have caught this case before the callback is called
      console.debug('Both tokens have expired');
      return { ...token, error: 'RefreshTokenExpired' } as JWT;
    },
    async session({ session, token, user }) {
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;
      // console.debug('Session:', session);
      return session;
    },
  },
};

export default authOptions;
