import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * The contents of our refresh call to the backend is a new access Token
   */
  export interface BackendAccessJWT {
    accessToken: string;
  }

  /**
   * The initial backend authentication response contains both an `access`
   * token and a `refresh` token. The refresh token is a long-lived token
   * that is used to obtain a new access token when the current access token
   * expires
   */
  export interface BackendJWT extends BackendAccessJWT {
    refreshToken: string;
  }

  export interface AuthValidity {
    valid_until: number;
    refresh_until: number;
  }

  export interface User {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      churchId: string;
      accessToken: string;
      refreshToken: string;
    };
    tokens: BackendJWT;
    validity: AuthValidity;
  }

  /**
   * Returned by `useSession`, `getSession`, returned by the `session`
   * callback and also the shape received as a prop on the SessionProvider
   * React Context
   */
  export interface Session {
    user: User.user;
    validity: AuthValidity;
    error: "RefreshTokenExpired" | "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  /**
   * The JWT token that we receive from the backend is a user object
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  export interface JWT {
    data: User;
    error: "RefreshTokenExpired" | "RefreshAccessTokenError";
  }
}
