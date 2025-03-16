'use client';

import { signIn } from 'next-auth/react';
// import { deleteCookie, setCookie } from 'cookies-next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export const GoogleButton = ({
  authType = 'SIGNIN',
}: {
  authType?: 'SIGNIN' | 'REGISTER' | 'INVITE';
}) => {
  if (authType === 'SIGNIN') {
    return (
      <div
        onClick={async () => {
          // deleteCookie('userType');
          signIn('google', {
            redirect: false,
            callbackUrl: '/app/home',
          });
        }}
        className="border border-[#CBD5E0] rounded-[8px] py-3 px-6 flex justify-center lg:justify-normal space-x-2 lg:space-x-3 items-center w-full  cursor-pointer mt-5 hover:bg-slate-50"
      >
        <Image
          src="/assets/images/Google.svg"
          alt="Google Logo"
          width={18}
          height={18}
        />
        <p className=" lg:text-center lg:w-full text-[#67728A] text-sm lg:text-base font-medium">
          Continue with google
        </p>
      </div>
    );
  }
};
