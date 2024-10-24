import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  nameCapitalizer,
  NameFormatter,
  ProfileNameFormatter,
} from '@/lib/utils/capitalize';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Home, Lock, LogOutIcon, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const pathname = usePathname();
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
          <div className="hidden md:flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={''}
                alt="User avatar"
                className="object-cover"
              />
              <AvatarFallback className="bg-main_primary text-white pt-1">
                {ProfileNameFormatter(
                  session?.user?.firstName,
                  session?.user?.lastName,
                )}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-md text-white text-ellipsis overflow-hidden truncate w-32 font-normal capitalize">
              {NameFormatter(session?.user?.firstName, session?.user?.lastName)}
            </h1>
            <ChevronDown size={26} className="text-white" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 rounded-xl">
          <div className="flex gap-2 px-2 items-center">
            <Avatar>
              <AvatarImage
                src={''}
                alt="User avatar"
                className="object-cover"
              />
              <AvatarFallback className="bg-main_primary text-white pt-1">
                {ProfileNameFormatter(
                  session?.user?.firstName,
                  session?.user?.lastName,
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-normal capitalize">
                {NameFormatter(
                  session?.user?.firstName,
                  session?.user?.lastName,
                )}
              </h1>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
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
            <DropdownMenuItem className="flex items-center gap-2 text-lg">
              {session?.user.isDev && !pathname.includes("system") && (
                <Link
                  href="/system"
                  className=" rounded-lg gap-4 flex w-full text-center "
                >
                  <div className="flex justify-start items-center gap-2 self-center">
                    <Lock size={18} />
                    <p className="">Admin Center</p>
                  </div>
                </Link>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-lg">
              {!pathname.includes("/app/home") && (
                <Link
                  href="/app/home"
                  className=" rounded-lg gap-4 flex w-full text-center "
                >
                  <div className="flex justify-start items-center gap-2 self-center">
                    <Home size={18} />
                    <p className="">Home</p>
                  </div>
                </Link>
              )}
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
