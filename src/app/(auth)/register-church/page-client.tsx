'use client';

import { ChurchInfoForm } from '@/app/(auth)/register-church/steps/church-info-form';
import {
  OnboardingProvider,
  useOnboardingContext,
} from '@/app/(auth)/register-church/steps/context';
import AdminCreationForm from '@/app/(auth)/register-church/steps/personal-admin-form';
import { AnimatedSizeContainer } from '@/components/ui/animated-container';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingPageClient() {
  return (
    <OnboardingProvider>
      <OnboardingContainer />
    </OnboardingProvider>
  );
}

function OnboardingContainer() {
  const { step, setStep } = useOnboardingContext();
  const router = useRouter();

  return (
    <>
      <div className="fixed -top-16 -left-4 md:-top-5 md:left-9 w-fit h-16  flex items-center px-4">
        <button
          onClick={
            step === 'personal'
              ? () => {
                  router.push('/app/home');
                }
              : () => {
                  setStep('personal');
                }
          }
          className="flex items-center space-x-2 size-12 rounded-full bg-[#F5F7FD] justify-center"
        >
          <ChevronLeft className="size-6" />
        </button>
      </div>

      <div className="w-full h-full flex justify-center items-center pb-8 px-1">
        <AnimatedSizeContainer>
          <OnboardingFlow />
        </AnimatedSizeContainer>
      </div>
    </>
  );
}

function OnboardingFlow() {
  const { step } = useOnboardingContext();

  if (step === 'personal') return <AdminCreationForm />;
  if (step === 'church') return <ChurchInfoForm />;
}
