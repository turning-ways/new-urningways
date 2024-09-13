// components/HeroSection.tsx
import Image from "next/image";
import dynamic from "next/dynamic";

const AuthForm = dynamic(
  () => import("@/components/common/landingPage/authForm"),
  {
    ssr: false,
  }
);

export default function HeroSection() {
  return (
    <div className="lg:grid grid-cols-[1fr,1fr] xl:grid-cols-[500px,1fr] mt-5 gap-x-10 font-sans">
      <div>
        <h1 className="text-4xl font-sans lg:text-5xl font-semibold text-textGray lg:leading-[60px] lg:mb-4 text-center lg:text-start w-full">
          Your one-stop digital church platform
        </h1>
        <p className="text-textGray mt-5 text-center lg:text-start">
          TurningWays is an AI-powered digital tool designed to help churches
          efficiently organize their membership, manage giving, events, and
          soul-winning all in one place.
        </p>
        <div className="lg:hidden flex justify-center items-center mt-2">
          <div className="relative">
            <Image
              src={"/assets/images/Dashboard.svg"}
              alt="Dashboard"
              priority
              width={700}
              height={700}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0Y/hfDwADnwHGwFJ2twAAAABJRU5ErkJggg=="
              className="w-full h-auto"
            />
            <Image
              src={"/assets/images/DashboardMobile.svg"}
              alt="Dashboard"
              priority
              width={100}
              height={150}
              className="absolute bottom-0 right-0 w-1/3 h-auto transform translate-x-10 translate-y-10"
            />
          </div>
        </div>
        <AuthForm />
      </div>
      <div className="hidden lg:flex justify-center items-center">
        <div className="relative">
          <Image
            src={"/assets/images/Dashboard.svg"}
            alt="Dashboard"
            priority
            width={700}
            height={700}
            className="w-full h-auto"
          />
          <Image
            src={"/assets/images/DashboardMobile.svg"}
            alt="Dashboard"
            priority
            width={100}
            height={150}
            className="absolute bottom-0 right-0 w-1/3 h-auto transform translate-x-10 translate-y-10"
          />
        </div>
      </div>
    </div>
  );
}
