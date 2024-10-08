// components/AuthForm.tsx
'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import InputComponent from '@/components/common/Input/input';
import PasswordInput from '@/components/common/Input/passwordInput';
import {
  NextButton,
  TurningWaysButton,
} from '@/components/common/Input/buttons';
import { GoogleButton } from '@/components/common/Input/google-btn';
import { LoginSchema as schema } from '@/lib/schema';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AuthForm() {
  const router = useRouter();
  const { churchId } = useParams();
  const [isloading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      inputKey: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setIsLoading(true);
    signIn('credentials', {
      email: data.inputKey,
      password: data.password,
      redirect: false,
    }).then((res) => {
      console.log(res);
      if (res?.error?.length ?? 0 > 3) {
        setIsLoading(false);
        if (res?.error === 'Email not verified') {
          toast.warning('Email not verified', {
            description: 'Please verify your email to continue',
          });
          return router.push('/register/otp');
        }
        return toast.error(res?.error);
      }
      if (res?.ok) {
        setIsLoading(false);
        toast.success('Login Succesfull');
        // if there is a callback url, redirect to it
        return router.push(`/app/home`);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-10">
        <FormField
          control={form.control}
          name="inputKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="inputKey"
                className="font-sans text-lightText font-normal lg:text-lg"
              >
                Email or Phone Number
              </FormLabel>
              <FormControl>
                <InputComponent
                  placeholder="Enter your email or phone number"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="password"
                className="font-sans text-lightText font-normal lg:text-lg"
              >
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 accent-secondary size-4"
              id="rememberMe"
              name="rememberMe"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link href="/forgot-password" className="text-secondary">
            Forgot Password?
          </Link>
        </div>
        <NextButton text="Sign In" className="py-5" isPending={isloading} />
        <div className="flex items-center mt-3 text-[#718096] w-full">
          <div className="w-full h-[1px] bg-[#A0AEC0]" />
          <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
          <div className="w-full h-[1px] bg-[#A0AEC0]" />
        </div>
        <GoogleButton />
        <TurningWaysButton />
      </form>
    </Form>
  );
}
