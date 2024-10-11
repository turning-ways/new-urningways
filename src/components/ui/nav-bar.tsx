import {
  CircleHelpIcon,
  Home,
  LayoutGrid,
  Lock,
  LogOutIcon,
  NewspaperIcon,
  Settings,
  Users,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from './dialog';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './button';
import Image from 'next/image';
import { useContactContext } from '@/context/contact-context';

export default function NavBar() {
  const { churchId } = useParams();
  const { contactRole } = useContactContext();

  const pathname = usePathname();

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
    <nav className="bg-main_DarkBlue text-white hidden md:flex flex-col justify-between h-screen p-4 w-[30%] xl:w-[20%] 2xl:w-[15%] font-sans py-12 sticky top-0 left-0">
      <div className="flex flex-col gap-4 items-center justify-between w-full">
        <Link
          href={`/admin/${churchId}/`}
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
          {navLinks.map((link: any) => {
            const isAccessible =
              contactRole &&
              (contactRole === 'Admin' ||
                contactRole === 'Editor' ||
                contactRole === 'SuperAdmin')
                ? canAccess(contactRole, link.title)
                : false;

            // Adjusting logic for the dashboard link vs. others
            const isActive =
              link.title === 'Dashboard'
                ? pathname === link.to // Exact match for Dashboard
                : pathname.startsWith(link.to); // Starts with for other links

            return (
              <Link
                key={link.to}
                href={isAccessible ? link.to : '#'} // Prevent navigation if not accessible
                onClick={() => handleLinkClick(isAccessible, link.title)} // Handle click
                className={`hover:bg-main_DarkBlueHover p-3 rounded-lg gap-4 flex w-full justify-center text-center ${
                  isActive
                    ? 'bg-main_DarkBlueHover text-white items-center'
                    : ''
                } ${
                  isAccessible
                    ? 'text-gray-400 hover:animate-scale-in'
                    : 'cursor-not-allowed opacity-50'
                }`} // Add disabled styles
              >
                <div className="flex justify-start items-center gap-2 self-center">
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
    </nav>
  );
}

export function LogoutDialog() {
  const logout = async () => {
    toast.promise(signOut(), {
      loading: 'Logging out...',
      success: 'Logged out successfully',
      error: 'Failed to log out',
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="hover:bg-main_DarkBlueHover p-3 text-gray-400 rounded-lg gap-4 flex w-full justify-center text-center hover:animate-scale-in">
          <div className="flex justify-start items-center gap-2 self-center ">
            <LogOutIcon size={18} />
            <p className="hover:text-main_primaryLight w-20">Logout</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Are you sure you want to logout?</DialogHeader>
        <DialogFooter className="gap-4">
          <Button onClick={logout} className="bg-red-600 hover:bg-red-400">
            Logout
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
