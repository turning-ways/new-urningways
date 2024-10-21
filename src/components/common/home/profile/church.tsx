'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetChurches } from '@/lib/client/useChurches';
import { ProfileNameFormatter } from '@/lib/utils/capitalize';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Church() {
  const { data: session } = useSession();
  const { data, isLoading } = useGetChurches({ userId: session?.user.id });
  console.log(data);
  const router = useRouter();
  return (
    <div className="bg-white flex flex-col gap-6 items-start w-full rounded-lg  py-6 px-4">
      <h4 className="font-medium">My Churches</h4>
      {!isLoading ? (
        <div className="w-full ">
          {data &&
            data?.map((church) => (
              <div
                key={church?.church?.id}
                className="w-full flex gap-2 cursor-pointer hover:bg-slate-200 p-2 rounded-lg"
                onClick={() => router.push(`/admin/${church?.church?.id}`)}
              >
                <Avatar>
                  <AvatarImage
                    src={''}
                    alt="User avatar"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-main_primary text-white pt-1">
                    {church?.church?.name
                      .split(' ')
                      .filter((n) => n)
                      .map((part, index, arr) =>
                        index === 0 || index === arr.length - 1
                          ? part[0].toUpperCase()
                          : null,
                      )
                      .filter(Boolean)
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h5 className="text-base font-medium">
                    {church?.church?.name}
                  </h5>
                  <p className="text-sm text-textDark">Saved By Grace</p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <ChurchListSkeleton />
      )}
    </div>
  );
}

function ChurchListSkeleton() {
  return (
    <div className="w-full">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="w-full flex gap-2 cursor-pointer hover:bg-slate-200 p-2 rounded-lg"
        >
          <Avatar className="animate-pulse">
            <AvatarImage
              src={''}
              alt="User avatar"
              className="object-cover animate-pulse"
            />
            <AvatarFallback className=" animate-pulse rounded-md bg-gray-200"></AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded-md bg-gray-200" />
            <div className="h-3 w-24 animate-pulse rounded-md bg-gray-200" />{' '}
          </div>
        </div>
      ))}
    </div>
  );
}
