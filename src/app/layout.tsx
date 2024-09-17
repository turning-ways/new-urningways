import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "sonner";
import Head from "next/head";
import ReactQueryProvider from "./queryProvider";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: "TurningWays - Your Digital Church Platform",
  description:
    "A LinkedIn-based Church Management System (ChMS) designed to help churches efficiently organize and manage their activities.",
  keywords:
    "Church Management, Digital Church, Church Software, Church Platform",
  openGraph: {
    title: "TurningWays",
    description: "A LinkedIn-based ChMS System for Churches",
    url: "https://turningways.com",
    type: "website",
    images: [
      {
        url: "/assets/images/turningWaysLogo.svg",
        width: 800,
        height: 600,
        alt: "TurningWays Logo",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>TurningWays - Your Digital Church Platform</title>
      </Head>
      <body>
        <Toaster richColors position="top-right" closeButton  />
        <ReactQueryProvider>
          <Provider>{children}</Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
