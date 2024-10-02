'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NavItem from './navItem';
import { BellIcon } from 'lucide-react';
import ProfileDropdown from './header';
import { MobileNav } from './mobile-nav';

const navItems = [
  {
    name: 'Dashboard',
    to:'/system/dashboard',
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

export default function SystemNavBar() {
  const pathname = usePathname();

  return (
    <div className="text-white lg:sticky lg:top-0 px-3 md:px-10 lg:px-20 py-2 lg:py-5 bg-main_DarkBlue flex flex-row justify-between items-center">
      <Image
        src={'/assets/images/whiteLogo.png'}
        width={200}
        height={40}
        priority={true}
        alt="logo"
      />
      <div className="hidden lg:flex flex-row space-x-5">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={pathname === item.to}
          />
        ))}
      </div>
      <div className='flex items-center md:gap-3 lg:gap-6'>
        <div className='relative'>
          <span className='absolute -top-2 -right-1 bg-main_primary rounded-full px-1.5 py-0.5 flex text-xs items-center justify-center text-white font-medium'>4</span>
          <BellIcon
            size={28}
            aria-disabled
            className="text-white"
          />
        </div>
        <ProfileDropdown/>
        <MobileNav/>
      </div>
    </div>
  );
}
