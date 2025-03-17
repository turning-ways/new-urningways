import OnboardingPageClient from '@/app/(auth)/register-church/page-client';
import { ClientOnly } from '@/components/ui/client-only';
import { Suspense } from 'react';

export default function onboardingPage() {
  return (
    <div className="flex flex-col min-h-screen !relative">
      <div className="flex px-8 lg:px-0 items-center pt-10 md:pt-0 justify-center w-full mt-16">
        <div className="w-full h-full flex justify-center items-center ">
          <ClientOnly className="relative w-full h-full">
            <Suspense>
              <OnboardingPageClient />
            </Suspense>
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
