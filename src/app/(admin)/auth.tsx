'use client';

import { toast } from 'sonner';
import { Fragment, Suspense, useEffect } from 'react';
import { useUserCheck } from '@/lib/swr/use-user-check';
import LayoutLoader from '@/components/ui/layout-loader';
import { useRouter, useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthProps) {
  const { user, isLoading, isError } = useUserCheck();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // const fallbackChurchId = searchParams.get('mainChurchId'); // Get churchId from query params
    if (isError) {
      toast.error('An error occurred. Please Log in again');
      signOut();
    }

    if (isLoading) return;

    if (!isLoading && !session?.user) {
      toast.error('You are not authorized to view this page. Please log in');
      signOut();
    }

    if (session?.user && session?.user.userType === 'MEMBER') {
      toast.error('You are not authorized to view this page. Please log in');
      signOut();
    }
  }, [isLoading, isError, session, searchParams, router]);

  if (isLoading) {
    return (
      <Suspense>
        <LayoutLoader text="Checking user authentication..." />
      </Suspense>
    );
  }

  if (user) {
    return <Fragment>{children}</Fragment>;
  }
}
