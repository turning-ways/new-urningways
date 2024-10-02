'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BellIcon,
  CircleHelpIcon,
  Group,
  LayoutGrid,
  NewspaperIcon,
  PlusCircleIcon,
  Settings,
  Users,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useContactContext } from '@/context/contact-context';
import { ADMIN_DASHBOARD, ADMIN_DIRECTORY } from '@/constants/route-constants';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AnimatedHamburgerButton } from '@/components/ui/hamburger';
import { LogoutDialog } from '@/components/ui/nav-bar';
import ProfileDropdown from './header';

export const MobileNav = () => {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { contacts } = useContactContext();

  const navLinks = [
    {
      title: 'Dashboard',
      to: '/system/dashboard',
      icon: <LayoutGrid size={24} />,
    },
    { title: 'Accounts', to: '/system/accounts', icon: <Users size={24} /> },
    { title: 'User Management', to: '/system/user', icon: <Users size={24} /> },
  ];

  return (
    <div className="flex flex-col space-y-5 font-sans lg:hidden">
      <Sheet open={active} onOpenChange={setActive}>
        <SheetTrigger className="text-start">
          <AnimatedHamburgerButton active={active} setActive={setActive} />
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className="bg-main_DarkBlue text-white flex flex-col justify-between pt-16"
        >
          <div className="flex flex-col gap-4 items-center justify-between w-full">
            <Link
              href={'/system/dashboard'}
              className="flex items-center gap-2 mb-10"
            >
              <div className="flex items-center bg-main_secondaryDark p-2 rounded-xl">
                <Image
                  src={'/assets/images/Membership.svg'}
                  width={20}
                  height={20}
                  alt="membership"
                />
              </div>
              <p className="text-lg font-bold">Admin</p>
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
                      <p className="hover:text-main_primaryLight w-20 xl:w-28">
                        {link.title}
                      </p>
                    </div>
                  </Link>
                </SheetClose>
              ))}
            </ul>
          </div>
          <LogoutDialog />
        </SheetContent>
      </Sheet>
    </div>
  );
};
