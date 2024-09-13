// app/page.tsx
import Navigation from "@/components/common/landingPage/nav";
import HeroSection from "@/components/common/landingPage/hero";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="px-10 md:px-20 py-6 max-w-[1440px]">
        <Navigation />
        <HeroSection />
      </div>
    </main>
  );
}
