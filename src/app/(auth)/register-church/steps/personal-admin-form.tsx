'use client';

import { useOnboardingContext } from '@/app/(auth)/register-church/steps/context';
import { useSession } from 'next-auth/react';
import z from '@/lib/zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import InputComponent from '@/components/common/Input/input';
import { AdminCreationSchema } from '@/app/(auth)/register/setup/step';
import SelectComponent from '@/components/common/Input/select';
import { PhoneInput } from '@/components/common/Input/phone';
import { DatePicker } from '@/components/common/Input/datePicker';
import { NextButton } from '@/components/common/Input/buttons';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export default function AdminCreationForm() {
  const { data: session } = useSession();
  const {
    dob,
    email,
    firstName,
    lastName,
    hearAboutUs,
    phoneNumber,
    gender,
    setStep,
    setDob,
    setEmail,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setGender,
    setHearAboutUs,
  } = useOnboardingContext();

  // useEffect to set the default values of the form

  const form = useForm<z.infer<typeof AdminCreationSchema>>({
    resolver: zodResolver(AdminCreationSchema),
    defaultValues: {
      firstName,
      lastName,
      email,
      gender,
      phoneNumber: phoneNumber || '',
      hearAboutUs: hearAboutUs || '',
      dob: dob ? new Date(dob) : new Date(),
    },
  });

  useEffect(() => {
    if (session) {
      console.log(session);

      setFirstName(session.user?.firstName || '');
      setLastName(session.user?.lastName || '');
      setEmail(session.user?.email || '');

      // update the form
      form.setValue('firstName', session.user?.firstName || '');
      form.setValue('lastName', session.user?.lastName || '');
      form.setValue('email', session.user?.email || '');
    }
  }, [form, session, setEmail, setFirstName, setLastName]);

  function onSubmit(data: z.infer<typeof AdminCreationSchema>) {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setGender(data.gender);
    setPhoneNumber(data.phoneNumber);
    setHearAboutUs(data.hearAboutUs);
    setDob(data.dob as unknown as string);
    setStep('church');
  }

  return (
    <Form {...form}>
      <HeaderInfo
        header="Admin Creation"
        currentStep={1}
        totalSteps={2}
        helperText="Please fill in the form below to create an admin account for your church"
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-4 w-full px-1"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  First Name *
                </FormLabel>
                <FormControl>
                  <InputComponent type="text" placeholder="John" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors?.firstName?.message}
                </FormMessage>
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
                  Last Name *
                </FormLabel>
                <FormControl>
                  <InputComponent type="text" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[700fr,300fr]">
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
                  Email *
                </FormLabel>
                <FormControl>
                  <InputComponent
                    type="email"
                    placeholder="enter email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors?.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="gender"
                  className={`font-sans text-lightText font-normal lg:text-lg ${
                    form.formState.errors.email
                      ? 'text-red-500'
                      : 'text-lightText'
                  }`}
                >
                  {' '}
                  Gender *
                </FormLabel>
                <SelectComponent
                  FormControl={FormControl}
                  placeholder="Male or Female"
                  options={['MALE', 'FEMALE']}
                  shouldVariedOptions={true}
                  variedOptions={[
                    {
                      label: 'Male',
                      value: 'MALE',
                    },
                    {
                      label: 'Female',
                      value: 'FEMALE',
                    },
                  ]}
                  value={field.value}
                  setValue={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="phoneNumber"
                className={`font-sans text-lightText font-normal lg:text-lg ${
                  form.formState.errors.phoneNumber
                    ? '!text-red-500'
                    : '!text-lightText'
                }`}
              >
                Phone Number *
              </FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="NG"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.phoneNumber?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="dob"
                className={`font-sans text-lightText font-normal lg:text-lg ${
                  form.formState.errors.dob ? 'text-red-500' : 'text-lightText'
                }`}
              >
                Date Of Birth *
              </FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage>{form.formState.errors?.dob?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hearAboutUs"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="hearAboutUs"
                className={`font-sans text-lightText font-normal lg:text-lg ${
                  form.formState.errors.hearAboutUs
                    ? 'text-red-500'
                    : 'text-lightText'
                }`}
              >
                How did you hear about us?
              </FormLabel>
              <FormControl>
                <SelectComponent
                  FormControl={FormControl}
                  placeholder="Select an option"
                  options={[
                    'Facebook',
                    'Instagram',
                    'Twitter',
                    'LinkedIn',
                    'Friend',
                    'Google',
                    'Event',
                    'Other',
                  ]}
                  value={field.value}
                  setValue={field.onChange}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.hearAboutUs?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <NextButton text="Next" />
      </form>
    </Form>
  );
}

export const HeaderInfo = ({
  header,
  currentStep,
  totalSteps,
  helperText,
  className,
}: {
  header: string;
  currentStep: number;
  totalSteps: number;
  helperText: string;
  className?: string;
}) => {
  return (
    <div className={cn('mb-5 max-w-[550px] mx-auto', className)}>
      <p>
        <span className="text-[#446DE3] text-2xl">{currentStep}</span> of{' '}
        {totalSteps}
      </p>
      <h1 className="text-3xl font-bold my-4">{header}</h1>
      <p className="text-[#949995]">{helperText}</p>
    </div>
  );
};
