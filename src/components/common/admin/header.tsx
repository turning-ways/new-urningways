'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useContact } from '@/lib/swr/use-contact';
import {
  BellIcon,
  LogOutIcon,
  PlusCircleIcon,
  Settings,
  User,
} from 'lucide-react';
import { nameCapitalizer } from '@/lib/utils/capitalize';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { useContactContext } from '@/context/contact-context';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Header() {
  const { contacts } = useContactContext();
  const { churchId } = useParams();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getPageTitle = () => {
    if (pathname.includes(`/admin/${churchId}/contacts/`)) {
      return 'Contacts';
    }
    if (
      pathname.includes(`/admin/${churchId}/directory/`) &&
      pathname.includes('/new')
    )
      return 'Create New Member';
    if (
      pathname.includes(`/admin/${churchId}/directory/`) &&
      pathname.includes('/edit')
    )
      return 'Edit Member';
    if (pathname.startsWith(`/admin/${churchId}/directory/`)) {
      const viewParam = searchParams.get('view');
      if (viewParam === 'personal') return 'Personal Information';
      if (viewParam === 'contact') return 'Contact Information';
      if (viewParam === 'church') return 'Church Information';
      if (viewParam === 'history') return 'Membership History';

      return 'Directory';
    }

    if (pathname === `/admin/${churchId}/`) return 'Dashboard';
    return 'Dashboard'; // Default title
  };

  return (
    <div className="flex flex-col space-y-5 font-sans">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-yellow-500 text-white pt-1">
            {contacts?.churchName[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-light">{contacts?.churchName}</h1>
      </div>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-bold cursor-default">{getPageTitle()}</h2>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/admin/${churchId}/directory/new`}>
                  <PlusCircleIcon size={28} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Add a Member</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <BellIcon size={24} aria-disabled className="hidden md:block" />
          <AccountDropdown contacts={contacts} />
        </div>
      </div>
    </div>
  );
}

export function AccountDropdown({ contacts }: { contacts: any }) {
  const logout = async () => {
    toast.promise(signOut(), {
      loading: 'Logging out...',
      success: 'Logged out successfully',
      error: 'Failed to log out',
    });
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={contacts?.photo}
                alt="User avatar"
                className="object-cover"
              />
              <AvatarFallback className="bg-main_primary text-white pt-1">
                {contacts?.firstName[0]}
                {contacts?.lastName ? contacts.lastName[0] : ''}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-normal">
              {nameCapitalizer(contacts?.firstName)}
            </h1>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 rounded-xl">
          <div className="flex gap-2 px-2 items-center">
            <Avatar>
              <AvatarImage
                src={contacts?.photo}
                alt="User avatar"
                className="object-cover"
              />
              <AvatarFallback className="bg-main_primary text-white pt-1">
                {contacts?.firstName[0]}
                {contacts?.lastName ? contacts.lastName[0] : ''}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-normal">
                {nameCapitalizer(contacts?.firstName)}
              </h1>
              <p className="text-sm text-gray-500">{contacts?.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2 text-lg ">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-lg">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DialogTrigger className="flex items-center gap-2 text-lg">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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
