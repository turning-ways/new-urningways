'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NavItem from './navItem';

const navItems = [
  {
    name: 'Dashboard',
    to: '/system',
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
    <div className="px-20 py-5 bg-main_DarkBlue flex flex-row justify-between items-center">
      <Image
        src={'/assets/images/whiteLogo.png'}
        width={200}
        height={40}
        priority={true}
        alt="logo"
      />
      <div className="flex flex-row space-x-5">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={pathname === item.to}
          />
        ))}
      </div>
    </div>
  );
}
