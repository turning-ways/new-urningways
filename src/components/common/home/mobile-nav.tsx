'use client';

import {
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AnimatedHamburgerButton } from '@/components/ui/hamburger';
import { LogoutDialog } from '@/components/ui/nav-bar';
// import ProfileDropdown from './header';
import { useSession } from 'next-auth/react';

export const MobileNav = () => {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    {
      title: 'Home',
      to: '/app/home',
      icon: <Home size={24} />,
    },
  ];

  return (
    <div className="flex flex-col space-y-5 font-sans lg:hidden">
      <Sheet open={active} onOpenChange={setActive}>
        <SheetTrigger className="text-start">
          <AnimatedHamburgerButton className='bg-white' active={active} setActive={setActive} />
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className="bg-main_DarkBlue text-white flex flex-col justify-between pt-16"
        >
          <div className="flex flex-col gap-4 items-center justify-between w-full">
            <Link href={'/app/home'} className="flex items-center gap-2 mb-10">
              <div className="flex items-center bg-main_secondaryDark p-2 rounded-xl">
                <Image
                  src={'/assets/images/Membership.svg'}
                  width={20}
                  height={20}
                  alt="membership"
                />
              </div>
              <p className="text-lg font-bold">Home</p>
            </Link>
            <ul className="flex flex-col gap-4 w-full items-center">
              {navLinks.map((link: any) => (
                <SheetClose key={link.to} asChild>
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`hover:bg-main_DarkBlueHover p-3 text-gray-400 rounded-lg gap-4 flex w-full justify-center  hover:animate-scale-in ${
                      pathname.startsWith(link.to)
                        ? 'bg-main_DarkBlueHover !text-white'
                        : ''
                    }`}
                  >
                    <div className="flex justify-start items-center gap-4  ">
                      {link.icon}
                      <p className="hover:text-main_primaryLight w-36 ">
                        {link.title}
                      </p>
                    </div>
                  </Link>
                </SheetClose>
              ))}
              <Link
                href={'/app/home'}
                className="px-4 py-3 w-full text-sm bg-main_secondaryDark flex justify-center text-white hover:bg-main_secondary rounded-lg hover:text-gray-800 transition-colors duration-500"
              >
                Create Church
              </Link>
            </ul>
          </div>
          <LogoutDialog />
        </SheetContent>
      </Sheet>
    </div>
  );
};
