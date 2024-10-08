'use client';
// components/Navigation.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center">
      <Image
        src="/assets/images/turningwayslogo.svg"
        alt="TurningWays Logo"
        width={200}
        height={40}
      />

      <div className="flex text-main sm:space-x-4 items-center font-sans text-base sm:text-lg">
        {session?.user ? (
          <Link
            href="/app/home"
            className="rounded-2xl border py-1 px-8 border-mainLight hidden sm:block hover:bg-white bg-mainLight hover:text-mainLight text-white transition-all duration-400"
          >
            Home
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="rounded-2xl border border-transparent  hover:border-mainLight py-1 px-2 sm:px-8 transition-all duration-400"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="rounded-2xl border py-1 px-8 border-mainLight hidden sm:block hover:bg-white bg-mainLight hover:text-mainLight text-white transition-all duration-400"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
