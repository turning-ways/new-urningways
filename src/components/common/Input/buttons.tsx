"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle, Mail, Phone } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

interface NormalButtonProps {
  children?: string;
  className?: string;
  isPending?: boolean;
  text?: string;
  overrideFn?: () => void;
}

export const NextButton = ({
  isPending,
  text,
  className,
  overrideFn,
}: NormalButtonProps) => {
  return (
    <Button
      type="submit"
      onClick={(e) => {
        if (overrideFn) {
          e.preventDefault();
          overrideFn();
        }
      }}
      className={cn(
        "w-full !py-3 h-auto bg-main_primaryDark hover:bg-main_primary text-sm lg:text-xl font-medium font-sans rounded-md text-white flex justify-center",
        className
      )}
      disabled={isPending}>
      {!isPending ? (
        <span>{text || "Next"}</span>
      ) : (
        <LoaderCircle className="size-5 animate-spin" />
      )}
    </Button>
  );
};

export const EmailButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="border border-[#CBD5E0] rounded-lg py-3 px-6 flex justify-center lg:justify-normal space-x-2 lg:space-x-3 items-center w-full  cursor-pointer mt-5"
      onClick={onClick}>
      <Mail className="size-5" />
      <p className=" lg:text-center lg:w-full text-[#67728A] text-sm lg:text-base font-medium">
        Continue with Email
      </p>
    </div>
  );
};

export const PhoneButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="border border-[#CBD5E0] rounded-lg py-3 px-6 flex justify-center lg:justify-normal space-x-2 lg:space-x-3 items-center w-full  cursor-pointer mt-5"
      onClick={onClick}>
      <Phone className="size-5" />
      <p className=" lg:text-center lg:w-full text-[#67728A] text-sm lg:text-base font-medium">
        Continue with Phone
      </p>
    </div>
  );
};

export const TurningWaysButton = () => {
  return (
    <Link
      href="/register"
      className="border border-[#CBD5E0] py-3 rounded-[8px] lg:space-x-1 flex px-6 justify-center lg:justify-normal space-x-3 items-center w-full cursor-pointer mt-5 hover:bg-slate-50">
      <Image
        src={"/assets/images/twsymbol.svg"}
        alt="turningWays Logo"
        width={20}
        height={20}
      />
      <p className="lg:text-center text-[#67728A] text-sm lg:text-base font-medium lg:w-full">
        New to TurningWays, Join Now
      </p>
    </Link>
  );
};
