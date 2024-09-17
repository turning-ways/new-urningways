'use client';

import { Sheet, SheetContent, SheetTrigger, SheetClose } from './sheet';
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
import { AccountDropdown } from '../common/admin/header';
import { AnimatedHamburgerButton } from './hamburger';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogoutDialog } from './nav-bar';
import { useContactContext } from '@/context/contact-context';
import { ADMIN_DASHBOARD, ADMIN_DIRECTORY } from '@/constants/route-constants';
import Image from 'next/image';

export const MobileNav = () => {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { contacts } = useContactContext();

  const navLinks = [
    {
      title: 'Dashboard',
      to: '/admin/dashboard',
      icon: <LayoutGrid size={24} />,
    },
    { title: 'Directory', to: '/admin/directory', icon: <Users size={24} /> },
    { title: 'Contacts', to: '/admin/contacts', icon: <Workflow size={24} /> },
    { title: 'Forms', to: '/admin/forms', icon: <NewspaperIcon size={24} /> },
    { title: 'Settings', to: '/admin/settings', icon: <Settings size={24} /> },
    { title: 'Help', to: '/admin/help', icon: <CircleHelpIcon size={24} /> },
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
              href={`${ADMIN_DASHBOARD}`}
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
              <p className="text-lg font-bold">Membership</p>
            </Link>
            <ul className="flex flex-col gap-4 w-full items-center">
              {navLinks.map((link: any) => (
                <SheetClose key={link.to} asChild>
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`hover:bg-main_DarkBlueHover p-3 text-gray-400 rounded-lg gap-4 flex w-full justify-center text-center  hover:animate-scale-in ${
                      pathname.startsWith(link.to)
                        ? 'bg-main_DarkBlueHover !text-white'
                        : ''
                    }`}
                  >
                    <div className="flex justify-start items-center gap-4 self-center ">
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
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/images/avatar.jpg" alt="User avatar" />
          <AvatarFallback className="bg-yellow-500 text-white pt-1">
            {contacts?.churchName[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-light">{contacts?.churchName}</h1>
      </div>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-bold cursor-default">Dashboard</h2>
        <div className="flex items-center gap-4">
          <Link href={`${ADMIN_DIRECTORY}/new`}>
            <PlusCircleIcon size={28} />
          </Link>
          <BellIcon size={24} aria-disabled className="hidden md:block" />
          <AccountDropdown contacts={contacts} />
        </div>
      </div>
    </div>
  );
};
