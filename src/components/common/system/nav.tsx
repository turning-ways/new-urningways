'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NavItem from './navItem';
import { BellIcon } from 'lucide-react';
import ProfileDropdown from './header';
import { MobileNav } from './mobile-nav';
import useIsMobile from '@/hooks/use_Responsive';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { MobileNav as MobileNavHome } from '../home/mobile-nav';

const navs = [
  {
    name: 'Home',
    to: '/app/home',
  },
  {
    name: 'Dashboard',
    to: '/system/dashboard',
  },
  {
    name: 'Accounts',
    to: '/system/accounts',
  },
  {
    name: 'User Management',
    to: '/system/user',
  },
];

export default function SystemNavBar({
  nav,
}: {
  nav?: { name: string; to: string }[];
}) {
  const isMobile = useIsMobile();
  const navItems = nav || navs;
  const { data: session } = useSession();
  const pathname = usePathname();

  if (isMobile) {
    return (
      <div className="text-white lg:sticky lg:top-0 px-3 md:px-10 lg:px-20 py-2 lg:py-5 bg-main_DarkBlue flex flex-row justify-between items-center">
        <Image
          src="/assets/images/whiteLogo.png"
          width={200}
          height={40}
          priority={true}
          alt="logo"
        />
        {pathname.includes(`app/home`) && <MobileNavHome />}
        {/* {pathname.includes(`app/home`) && <MobileNav />} */}
      </div>
    );
  }

  return (
    <div className="text-white lg:sticky lg:top-0 px-3 md:px-5 lg:px-20 py-2 z-50 lg:py-5 bg-main_DarkBlue flex flex-row justify-between items-center">
      <Image
        src="/assets/images/whiteLogo.png"
        width={200}
        height={40}
        priority={true}
        alt="logo"
      />
      <div className="hidden md:flex flex-row items-center space-x-5">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={pathname === item.to}
          />
        ))}
        {pathname.includes(`app/home`) && (
          <Link
            href={'/register/setup'}
            className="px-4 py-2 text-sm bg-main_secondaryDark text-white hover:bg-main_secondary rounded-lg hover:text-gray-800 transition-colors duration-500"
          >
            Create Church
          </Link>
        )}
      </div>
      <div className="hidden md:flex items-center md:gap-3 lg:gap-6">
        {session?.user && (
          <Fragment>
            <div className="relative">
              <span className="absolute -top-2 -right-1 bg-main_primary rounded-full px-1.5 py-0.5 flex text-xs items-center justify-center text-white font-medium">
                4
              </span>
              <BellIcon size={25} aria-disabled className="text-white" />
            </div>
            <ProfileDropdown />
          </Fragment>
        )}
      </div>
    </div>
  );
}
