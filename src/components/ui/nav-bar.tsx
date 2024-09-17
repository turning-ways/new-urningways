'use client';

import {
  BellIcon,
  CircleHelpIcon,
  Group,
  LayoutGrid,
  LogOutIcon,
  NewspaperIcon,
  PlusCircleIcon,
  Settings,
  Users,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from './dialog';
import { signOut } from 'next-auth/react';
import { Button } from './button';
import Image from 'next/image';
import { ADMIN_DASHBOARD } from '@/constants/route-constants';

export default function NavBar() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<{ email: string } | null>(
    null,
  );
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
    // Accessing localStorage in useEffect to avoid SSR issues
    const storedDetails = localStorage.getItem('user');
    if (storedDetails) {
      try {
        const parsedDetails = JSON.parse(storedDetails);
        setUserDetails(parsedDetails);
      } catch (error) {
        // Handle JSON parsing error gracefully
        toast.error('Failed to parse user details. Please log in again.');
        redirectToLogin();
      }
    } else {
      toast.warning('It seems you are not logged in or something went wrong', {
        duration: 2000,
      });
      redirectToLogin();
    }
  }, [router]);

  const redirectToLogin = () => {
    router.push('/login');
    toast.info('Redirecting to login page...');
  };

  // Dashboard NavBar links
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
    <nav className="bg-main_DarkBlue text-white hidden md:flex flex-col justify-between h-screen p-4 w-[30%] xl:w-[20%] 2xl:w-[15%] font-sans py-16 sticky top-0 left-0">
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
            <Link
              key={link.to}
              href={link.to}
              className={`hover:bg-main_DarkBlueHover p-3 text-gray-400 rounded-lg gap-4 flex w-full justify-center text-center  hover:animate-scale-in ${
                pathname.startsWith(link.to)
                  ? 'bg-main_DarkBlueHover !text-white'
                  : ''
              }`}
            >
              <div className="flex justify-start items-center gap-2 self-center ">
                {link.icon}
                <p className="hover:text-main_primaryLight w-20 ">
                  {link.title}
                </p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <LogoutDialog />
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
        <div className="hover:bg-main_DarkBlueHover p-3 text-gray-400 rounded-lg gap-4 flex w-full justify-center text-center  hover:animate-scale-in">
          <div className="flex justify-start items-center gap-2 self-center ">
            <LogOutIcon size={24} />
            <p className="hover:text-main_primaryLight w-20 ">Logout</p>
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
