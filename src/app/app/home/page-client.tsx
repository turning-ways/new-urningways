'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useGetChurches } from '@/lib/client/useChurches';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

import Profile from '@/components/common/home/profile';
import Main from '@/components/common/home/main';
import Extras from '@/components/common/home/extras';
// Mock data for churches (replace with actual data fetching logic)

export default function PageClient() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#f5f5f5] h-full lg:py-8 md:px-12 gap-6 grid grid-cols-1 lg:grid-cols-[25%_1fr_25%]">
      <Profile/>
      <Main/>
      <Extras/>
    </div>
  );
}
