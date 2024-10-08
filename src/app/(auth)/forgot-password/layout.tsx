"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "Forgot Password",
  description: "Send a reset password link to your email",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="fixed top-3 left-2  md:top-9 md:left-9 w-fit h-16  flex items-center px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 size-12 rounded-full bg-[#F5F7FD] justify-center">
          <ChevronLeft className="size-6" />
        </button>
      </div>
      <main className="flex px-8 lg:px-0 items-center pt-10 md:pt-0 justify-center w-full mt-16">
        {children}
      </main>
    </div>
  );
}
