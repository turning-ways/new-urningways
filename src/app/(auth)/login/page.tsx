import { ClientOnly } from '@/components/ui/client-only';
import LoginForm from './form';
import { Suspense } from 'react';

export default async function Login() {
  return (
    <div className="px-4 md:px-20 py-6 max-w-3xl flex flex-col w-full font-sans">
      <ClientOnly className="relative flex w-full flex-col items-center justify-center">
        <Suspense>
          <LoginForm />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
