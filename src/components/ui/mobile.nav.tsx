'use client';

import { Sheet, SheetContent, SheetTrigger, SheetClose } from './sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BellIcon,
  CircleHelpIcon,
  Group,
  Home,
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
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogoutDialog } from './nav-bar';
import { useContactContext } from '@/context/contact-context';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const MobileNav = () => {
  const { churchId } = useParams();
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { contacts, contactRole } = useContactContext();
  const router = useRouter();

  // Permissions for different roles
  const ROLE_PERMISSIONS = {
    SuperAdmin: [
      'Dashboard',
      'Directory',
      'Contacts',
      'Forms',
      'Settings',
      'Help',
    ],
    Admin: ['Dashboard', 'Directory', 'Contacts', 'Forms', 'Settings', 'Help'],
    Editor: ['Directory', 'Contacts'],
  };

  // Function to check if the role has access to a given link
  const canAccess = (role: keyof typeof ROLE_PERMISSIONS, title: string) => {
    return ROLE_PERMISSIONS[role]?.includes(title);
  };

  // Dashboard NavBar links
  const navLinks = [
    {
      title: 'Dashboard',
      to: `/admin/${churchId}`,
      icon: <LayoutGrid size={18} />,
    },
    {
      title: 'Directory',
      to: `/admin/${churchId}/directory`,
      icon: <Users size={18} />,
    },
    {
      title: 'Contacts',
      to: `/admin/${churchId}/contacts`,
      icon: <Workflow size={18} />,
    },
    {
      title: 'Forms',
      to: `/admin/${churchId}/forms`,
      icon: <NewspaperIcon size={18} />,
    },
    {
      title: 'Settings',
      to: `/admin/${churchId}/settings`,
      icon: <Settings size={18} />,
    },
    {
      title: 'Help',
      to: `/admin/${churchId}/help`,
      icon: <CircleHelpIcon size={18} />,
    },
  ];

  const handleLinkClick = (isAccessible: boolean, title: any) => {
    if (!isAccessible) {
      toast.error(`You do not have access to the ${title} page.`);
    }
  };

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
              href={`/admin/${churchId}`}
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
            <ul className="flex flex-col gap-2 w-full items-center">
              {navLinks.map((link) => {
                const isAccessible =
                  contactRole &&
                  (contactRole === 'SuperAdmin' ||
                    contactRole === 'Admin' ||
                    contactRole === 'Editor')
                    ? canAccess(contactRole, link.title)
                    : false;

                const isActive =
                  link.title === 'Dashboard'
                    ? pathname === link.to // Exact match for Dashboard
                    : pathname.startsWith(link.to);

                return (
                  <SheetClose key={link.to} asChild>
                    <Link
                      href={isAccessible ? link.to : '#'} // Prevent navigation if not accessible
                      onClick={() => handleLinkClick(isAccessible, link.title)} // Handle click
                      className={`hover:bg-main_DarkBlueHover p-3 text-gray-400 rounded-lg gap-4 flex w-full justify-center text-center  hover:animate-scale-in ${
                        isActive ? 'bg-main_DarkBlueHover !text-white' : ''
                      }${
                        isAccessible
                          ? 'text-gray-400 hover:animate-scale-in'
                          : 'cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="flex justify-start items-center gap-4 self-center ">
                        {link.icon}
                        <p
                          className={`w-20 ${
                            isActive
                              ? 'text-main_primaryLight font-bold'
                              : 'text-gray-400'
                          }`}
                        >
                          {link.title}
                        </p>
                      </div>
                    </Link>
                  </SheetClose>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-2 items-center  w-full">
            <Link
              href="/app/home"
              className="p-3 rounded-lg gap-4 flex w-full justify-center text-center text-gray-400 hover:animate-scale-in hover:bg-main_DarkBlueHover"
            >
              <div className="flex justify-start items-center gap-2 self-center">
                <Home size={18} />
                <p className="w-20 text-gray-400">Go Home</p>
              </div>
            </Link>
            <LogoutDialog />
          </div>
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
          <Link href={`/admin/${churchId}/directory/new`}>
            <PlusCircleIcon size={28} />
          </Link>
          <BellIcon size={24} aria-disabled className="hidden md:block" />
          <AccountDropdown contacts={contacts} />
        </div>
      </div>
    </div>
  );
};
