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
import { NextButton, PhoneButton } from '@/components/common/Input/buttons';
import { GoogleButton } from '@/components/common/Input/google-btn';
import Link from 'next/link';
import { useAuthEmailStore } from '@/lib/stores/authEmail.store';
import Terms from '@/components/common/terms/terms';
import { Checkbox } from '@/components/ui/checkbox';
import Policy from '@/components/common/terms/privacy';
import { register } from '@/app/api/auth/regsiter';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SignUpSchema } from '@/lib/zod/schemas/auth';
import { useRegisterContext } from '@/components/ui/auth/register/context';

const schema = SignUpSchema.refine((data) => data.accessTerms, {
  message: 'Please accept the terms',
  path: ['accessTerms'],
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignUpForm = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    email,
    firstName,
    lastName,
    password,
    passwordConfirm,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    setPasswordConfirm,
    step,
    setStep,
  } = useRegisterContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
      firstName,
      lastName,
      password,
      confirmPassword: passwordConfirm,
      accessTerms: false,
    },
  });

  async function onSubmit(data: SignUpForm) {
    setEmail(data.email);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPassword(data.password);
    setPasswordConfirm(data.confirmPassword);

    try {
      setIsLoading(true);
      const res = await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      if (res.status === 201) {
        setIsLoading(false);
        toast.success('Account created successfully');
        setStep('verify');
      }

      if (res.status === 400) {
        setIsLoading(false);
        toast.error(res.data);
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-textGray mb-4">Sign up</h1>
        <p className="text-textDark text-base lg:text-lg">
          Already have an account?{' '}
          <Link
            href={'/login'}
            className="text-secondary underline underline-offset-2 cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-4 w-full"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="firstName"
                className={`font-sans text-lightText font-normal lg:text-lg ${
                  form.formState.errors.firstName
                    ? 'text-red-500'
                    : 'text-lightText'
                }`}
              >
                First Name
              </FormLabel>
              <FormControl>
                <InputComponent type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="lastName"
                className={`font-sans text-lightText font-normal lg:text-lg ${
                  form.formState.errors.lastName
                    ? 'text-red-500'
                    : 'text-lightText'
                }`}
              >
                Last Name
              </FormLabel>
              <FormControl>
                <InputComponent type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="email"
                className={`font-sans text-lightText font-normal lg:text-lg ${
                  form.formState.errors.email
                    ? 'text-red-500'
                    : 'text-lightText'
                }`}
              >
                Email
              </FormLabel>
              <FormControl>
                <InputComponent type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="password"
                  className={`font-sans text-lightText font-normal lg:text-lg ${
                    form.formState.errors.password
                      ? 'text-red-500'
                      : 'text-lightText'
                  }`}
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="confirmPassword"
                  className={`font-sans text-lightText font-normal lg:text-lg ${
                    form.formState.errors.confirmPassword
                      ? 'text-red-500'
                      : 'text-lightText'
                  }`}
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Re-enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="accessTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className={`${
                    field.value && '!bg-mainLight border-mainLight'
                  }`}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                I agree to the <Terms /> and <Policy />
              </FormLabel>
              <FormMessage className="ml-8" />
            </FormItem>
          )}
        />
        <NextButton text="Next" className="py-5" isPending={isLoading} />
        <div className="flex items-center mt-3 text-[#718096] w-full">
          <div className="w-full h-[1px] bg-[#A0AEC0]" />
          <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
          <div className="w-full h-[1px] bg-[#A0AEC0]" />
        </div>
        <GoogleButton />
        {/* <PhoneButton onClick={() => console.log("Phone button clicked")} /> */}
      </form>
    </Form>
  );
}
