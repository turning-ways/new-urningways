'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useGetChurches } from '@/lib/client/useChurches';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
// Mock data for churches (replace with actual data fetching logic)

export default function ChurchesPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading } = useGetChurches({ userId: session?.user.id });
  console.log(data);

  return (
    <div className="flex flex-col mx-auto items-center py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">My Churches</h1>
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((church) => (
            <Card key={church.church.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 flex flex-row items-center gap-6 border-b border-gray-100">
                <Avatar className="size-12 bg-main_secondaryDark border border-gray-200">
                  <AvatarFallback className="capitalize bg-main_secondaryDark text-white text-xl font-semibold flex justify-center items-center pt-1">
                    {church.church.name[0] ?? '.'}
                  </AvatarFallback>
                </Avatar>

                <CardTitle>{church.church.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {/* <p className="text-gray-600 mb-2">{church.location}</p> */}
                <p className="text-gray-700 font-semibold mb-4">
                  Role:{' '}
                  {church.church?.members[0]?.ContactRole[0]?.role.name ||
                    'Not specified'}
                </p>
                <Button
                  onClick={() => router.push(`/admin/${church.church.id}/`)}
                  disabled={
                    church.church?.members[0]?.ContactRole[0]?.role.name ===
                    'Member'
                  }
                  variant="outline"
                >
                  Go to Church
                </Button>
              </CardContent>
            </Card>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col space-y-[46px] rounded-lg border border-gray-100 bg-white p-6 shadow transition-all hover:shadow-md"
        >
          <div className="">
            <div className="h-12 w-full animate-pulse rounded-sm bg-gray-200" />
          </div>
          <div className="pt-4 space-y-3">
            <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200" />
            <div className="h-8 w-24 animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
