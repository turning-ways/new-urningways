'use client';

import { signIn } from 'next-auth/react';
import { deleteCookie, setCookie } from 'cookies-next';
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
          deleteCookie('userType');
          signIn('google', {
            redirect: false,
            callbackUrl: '/admin',
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
  } else if (authType === 'REGISTER') {
    return (
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="border border-[#CBD5E0] rounded-[8px] py-3 px-6 flex justify-center lg:justify-normal space-x-2 lg:space-x-3 items-center w-full  cursor-pointer mt-5 hover:bg-slate-50">
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
        </DialogTrigger>
        {/* To Register as an admin or User */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register As</DialogTitle>
            <DialogDescription>
              Choose the type of user you want to register as
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-4 items-center">
            <div
              onClick={async () => {
                setCookie('userType', 'USER');
                signIn('google', {
                  redirect: true,
                  callbackUrl: '/admin',
                });
              }}
              className="border border-[#CBD5E0] rounded-[8px] py-3 px-6 flex justify-center lg:justify-normal space-x-2 lg:space-x-3 items-center w-full  cursor-pointer mt-5 hover:bg-slate-50"
            >
              <Image
                src="/assets/images/Google.svg"
                alt="Google Logo"
                width={18}
                height={18}
                priority={true}
              />
              <p className=" lg:text-center lg:w-full text-[#67728A] text-sm lg:text-base font-medium">
                User
              </p>
            </div>
            <div
              onClick={async () => {
                setCookie('userType', 'ADMIN');
                signIn('google', {
                  redirect: true,
                  callbackUrl: '/admin',
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
                Admin
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};
