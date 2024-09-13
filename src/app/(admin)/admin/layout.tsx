"use client";
import Header from "@/components/common/admin/header";
import { MobileNav } from "@/components/ui/mobile.nav";
import NavBar from "@/components/ui/nav-bar";
import useIsMobile from "@/hooks/use_Responsive";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile(1024);
  return (
    <div className="flex w-full h-screen relative overflow-hidden">
      {!isMobile && <NavBar />}
      <div className="flex flex-col h-full w-full pt-4 lg:pt-12 p-4 md:p-10">
        {!isMobile ? <Header /> : <MobileNav />}
        {children}
      </div>
    </div>
  );
}
