import RegisterPageClient from '@/app/(auth)/register/page-client';
import { ClientOnly } from '@/components/ui/client-only';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <ClientOnly className="w-full flex justify-center items-center">
      <Suspense>
        <RegisterPageClient />
      </Suspense>
    </ClientOnly>
  );
}
