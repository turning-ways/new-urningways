'use client';

import {
  RegisterProvider,
  useRegisterContext,
} from '@/components/ui/auth/register/context';
import RegisterForm from '@/components/ui/auth/register/register-form';
import VerifyForm from '@/components/ui/auth/register/verify-form';

export default function RegisterPageClient() {
  return (
    <div className="px-4 md:px-20 py-6 max-w-3xl flex flex-col w-full font-sans">
      <RegisterProvider>
        <RegisterFlow />
      </RegisterProvider>
    </div>
  );
}

function RegisterFlow() {
  const { step } = useRegisterContext();

  if (step === 'signup') return <RegisterForm />;
  if (step === 'verify') return <VerifyForm />;
}
