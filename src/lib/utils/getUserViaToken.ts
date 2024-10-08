import { User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getUserViaToken(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return session?.data?.user as User["user"];
}
