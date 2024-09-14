'use client';

import { toast } from 'sonner';
import { Suspense, useEffect } from 'react';
import { useUserCheck } from '@/lib/swr/use-user-check';
import LayoutLoader from '@/components/ui/layout-loader';
import { useRouter, useSearchParams } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthProps) {
  const { user, isLoading, isError } = useUserCheck();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fallbackChurchId = searchParams.get('mainChurchId'); // Get churchId from query params

    if (isLoading) return;

    if (isError) {
      signOut();
    }

    if (!user) {
      toast.error('You are not authorized to view this page');
      signOut();
      router.replace('/');
      return;
    }

    const { role, mainChurchId } = user;

    // if the role is a User, redirect to the home page
    if (role === 'USER') {
      toast.error('You are not authorized to view this page');
      router.replace('/');
      return;
    }

    // Check if the user is an admin and either has a churchId or fallbackChurchId
    if (role === 'ADMIN') {
      const effectiveChurchId = mainChurchId || fallbackChurchId;

      if (!effectiveChurchId) {
        toast.error(
          'You have not completed your church setup. Please do so in the next step.',
          { duration: 5000 },
        );
        router.replace('/register/setup');
      } else {
        // If the fallback is used, store it in localStorage for future use
        localStorage.setItem(
          'user',
          JSON.stringify({ id: user.id, mainChurchId: effectiveChurchId }),
        );
      }
    }
  }, [user, isLoading, router, isError, searchParams]);

  if (isLoading) {
    return (
      <Suspense>
        <LayoutLoader text="Checking user access..." />
      </Suspense>
    );
  }

  if (
    user?.role === 'ADMIN' &&
    (user?.mainChurchId || searchParams.get('mainChurchId'))
  ) {
    const churchId = user?.mainChurchId || searchParams.get('mainChurchId');
    localStorage.setItem(
      'user',
      JSON.stringify({ id: user.id, mainChurchId: churchId }),
    );
    return (
      <Suspense>
        <>{children}</>
      </Suspense>
    );
  }

  return null;
}
