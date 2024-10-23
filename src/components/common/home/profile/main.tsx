/* eslint-disable @next/next/no-img-element */
'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileNameFormatter } from '@/lib/utils/capitalize';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Main() {
  const { data: session } = useSession();
  return (
    <div className="bg-white flex flex-col rounded-lg pb-6 gap-6 w-full">
      <div>
        <div className="relative w-full">
          <img
            className="w-full h-36 mb-8 rounded-tl-lg rounded-tr-lg"
            src="/assets/images/Home/profile.png"
            alt="Profile"
          />
          <Avatar className="absolute -bottom-5 left-[40%] border-4 border-white w-[72px] h-[72px]">
            <AvatarImage src={''} alt="User avatar" className="object-cover" />
            {session?.user ? (
              <AvatarFallback className="bg-main_primary text-white pt-1">
                {ProfileNameFormatter(
                  session?.user?.firstName,
                  session?.user?.lastName,
                )}
              </AvatarFallback>
            ) : (
              <AvatarFallback className=" animate-pulse rounded-md bg-gray-200"></AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
         {session?.user ? <h3 className="text-xl font-semibold">
            {session?.user?.firstName + ' ' + session?.user?.lastName}
          </h3> : <div className="h-3 w-36 animate-pulse rounded-md bg-gray-200" />}
          <p className="font-medium text-textDark">Saved by Grace</p>
        </div>
      </div>

      <div className="flex w-full py-2 items-center justify-center gap-4">
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-lg font-medium">100</h4>
          <p>Followers</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-lg font-medium">100</h4>
          <p>Following</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-lg font-medium">100</h4>
          <p>Saved</p>
        </div>
      </div>
    </div>
  );
}
