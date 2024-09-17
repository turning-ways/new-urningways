'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { NextButton } from '@/components/common/Input/buttons';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { resendEmail, verifyEmail } from '@/app/api/auth/regsiter';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { useAuthEmailStore } from '@/lib/stores/authEmail.store';

const schema = z.object({
  otp: z.string().min(6, 'OTP must be 6 characters'),
});

export default function RegisterOTPPage() {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const { email } = useAuthEmailStore();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: '',
    },
  });

  const [timer, setTimer] = useState(60); // Set initial timer value
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (timer > 0 && isTimerActive) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
  }, [timer, isTimerActive]);

  function handleResendOTP() {
    if (!isTimerActive) {
      setTimer(60); // Reset timer to 60 seconds
      setIsTimerActive(true);
      toast('Resending OTP ...');
      // Add OTP resend logic here
      setIsResending(true);
      resendEmail({ email })
        .then((res) => {
          setIsResending(false);
          if (res.status === 200) {
            toast.success('OTP sent successfully');
          }
        })
        .catch((error: any) => {
          setIsResending(false);
          toast.error(error.message);
        });
    }
  }

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      setIsLoading(true);
      const res = await verifyEmail({
        token: data.otp,
      });
      if (res.status === 200) {
        setIsLoading(false);
        // Redirect to the next page
        router.push('/login');
        toast.success('Email verified successfully', {
          description: 'You can now login to your account',
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }

    toast('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] space-y-4 w-full">
      <div className="flex flex-col">
        <div className="space-y-2 mb-10">
          <h1 className="font-sans text-3xl font-bold">Verify your email</h1>
          <p className="text-[#949995]">
            Kindly enter the verification code (OTP) sent to your email address
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex gap-4 flex-col"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="text-2xl size-12 sm:size-16 lg:size-24"
                        />
                        <InputOTPSlot
                          index={1}
                          className="text-2xl size-12 sm:size-16 lg:size-24"
                        />
                        <InputOTPSlot
                          index={2}
                          className="text-2xl size-12 sm:size-16 lg:size-24"
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={3}
                          className="text-2xl size-12 sm:size-16 lg:size-24"
                        />
                        <InputOTPSlot
                          index={4}
                          className="text-2xl size-12 sm:size-16 lg:size-24"
                        />
                        <InputOTPSlot
                          index={5}
                          className="text-2xl size-12 sm:size-16 lg:size-24"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <NextButton isPending={isLoading} />
            <div className="flex items-center justify-start">
              <Label className="text-sm text-[#949995]">
                Didn&apos;t receive the code?
              </Label>
              <Label
                onClick={handleResendOTP}
                className={`text-[#446DE3] font-bold ml-1 bg-transparent cursor-pointer ${
                  isTimerActive ? 'cursor-not-allowed' : ''
                }`}
              >
                <TimerText timer={timer} />
              </Label>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

function TimerText({ timer }: { timer: number }) {
  return (
    <p className="text-[#949995] text-center">
      {timer <= 0 ? 'Resend OTP' : `00:${timer < 10 ? `0${timer}` : timer}`}
    </p>
  );
}
