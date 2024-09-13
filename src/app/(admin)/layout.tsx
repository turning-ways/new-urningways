import { Metadata } from "next";
import AdminAuthWrapper from "./auth";
import { ContactProvider } from "@/context/contact-context";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard layout",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminAuthWrapper>
        <ContactProvider>
          <div className="flex min-h-svh w-full">{children}</div>
        </ContactProvider>
      </AdminAuthWrapper>
    </Suspense>
  );
}
