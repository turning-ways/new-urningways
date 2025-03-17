'use client';

import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import InputComponent from '@/components/common/Input/input';
import SelectComponent from '@/components/common/Input/select';
import { NextButton } from '@/components/common/Input/buttons';
import { PhoneInput } from '@/components/common/Input/phone';
import { useChurchCreationStore } from '@/lib/stores/churchCreation.store';
import { HeaderInfo } from '@/app/(auth)/register-church/steps/personal-admin-form';
import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';
import { createOnboarding } from '@/app/api/church/create-onboarding';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { invalidateUserCheck, useUserCheck } from '@/lib/swr/use-user-check';
import { useSession } from 'next-auth/react';
import {
  AdminCreationSchema,
  OrgInfoSchema,
} from '@/app/(auth)/register/setup/step';
import useCountryState from '@/hooks/useCountryState';
import { useGetChurchHqs } from '@/lib/client/useChurches';
import { useOnboardingContext } from '@/app/(auth)/register-church/steps/context';

export function ChurchInfoForm() {
  const { update } = useSession();
  const [defaultCountry, setDefaultCountry] = useState('NG');
  const { countryArray, stateArray } = useCountryState(defaultCountry);
  const router = useRouter();

  // TODO: MAke this dynamic after hierarchy system has been developed
  // const isParent = "false";

  const {
    dob,
    email,
    firstName,
    gender,
    hearAboutUs,
    lastName,
    phoneNumber,
    step,
    churchName,
    churchAddress,
    churchEmail,
    churchPhone,
    churchWebsite,
    churchCity,
    churchState,
    churchCountry,
    churchZip,
    isParent,
    setChurchAddress,
    setChurchCity,
    setChurchCountry,
    setChurchEmail,
    setChurchName,
    setChurchPhone,
    setChurchState,
    setChurchWebsite,
    setChurchZip,
    setIsParent,
    setStep,
  } = useOnboardingContext();

  const form = useForm<z.infer<typeof OrgInfoSchema>>({
    resolver: zodResolver(OrgInfoSchema),
    defaultValues: {
      churchName,
      churchAddress,
      churchEmail,
      churchPhone,
      churchWebsite,
      churchCity,
      churchState,
      churchCountry,
      churchZip,
      verify: false,
    },
  });

  const selectedCountry = useWatch({
    control: form.control,
    name: 'churchCountry',
  });

  async function onSubmit(data: z.infer<typeof OrgInfoSchema>) {
    setChurchName(data.churchName);
    setChurchAddress(data.churchAddress);
    setChurchEmail(data.churchEmail);
    setChurchPhone(data.churchPhone);
    setChurchWebsite(data.churchWebsite);
    setChurchCity(data.churchCity);
    setChurchState(data.churchState);
    setChurchCountry(data.churchCountry);
    setChurchZip(data.churchZip);
    setIsParent(data.parentChurch === '');
    setStep('church');

    try {
      const loadingToast = toast.loading('Creating your church profile...');

      const response = await createOnboarding({
        churchEmail: churchEmail !== '' ? churchEmail : data.churchEmail,
        churchName: churchName !== '' ? churchName : data.churchName,
        denomination: '',
        churchAddress:
          churchAddress !== '' ? churchAddress : data.churchAddress,
        churchCity: churchCity !== '' ? churchCity : data.churchCity,
        churchCountry:
          churchCountry !== '' ? churchCountry : data.churchCountry,
        churchPhone: churchPhone !== '' ? churchPhone : data.churchPhone,
        churchState: churchState !== '' ? churchState : data.churchState,
        churchWebsite:
          churchWebsite !== undefined
            ? churchWebsite !== ''
              ? churchWebsite
              : data.churchWebsite
            : undefined,
        churchZip: churchZip !== '' ? churchZip : data.churchZip,
        parentChurchId: data.parentChurch || undefined,
        parentChurchLevelId: data.parentChurchLevel || undefined,
        isParent: false,
        firstName,
        lastName,
        email,
        phoneNumber,
        hearAboutUs,
        dob: dob as unknown as Date,
        gender,
      });
      console.log(response);
      if (response.success) {
        invalidateUserCheck();
        toast.dismiss(loadingToast);
        toast.success('Church profile created successfully');
        update({ churchId: response.data?.churchId });
        setTimeout(() => {
          router.push(
            `/admin/${response.data?.id}?mainChurchId=${response.data?.id}`,
          );
        }, 1500);
      } else {
        if (response.error.message === 'Church already exists') {
          throw new Error('Church already exists');
        } else if (response.error.message === 'User already has a HQ church') {
          throw new Error('User already has a HQ church');
        }
        throw new Error('Failed to create church profile');
      }
    } catch (error: any) {
      toast.dismiss();
      if (error.message === 'Church already exists') {
        toast.error('Church already exists', {
          description:
            'The church information you provided matches an existing record. Please double-check your details or contact support if you need assistance.',
        });
        return;
      } else if (error.message === 'User already has a HQ church') {
        toast.error('User already has a HQ church', {
          description:
            'You have already created a church profile. Please contact support if you need assistance.',
        });
        return;
      }
      toast.error('An error occurred while creating your church profile');
    }
  }

  useEffect(() => {
    const countryCode = Country.getAllCountries().find(
      (country) => country.name === selectedCountry,
    )?.isoCode;

    if (countryCode) setDefaultCountry(countryCode);
  }, [selectedCountry]);

  const renderFormField = (
    name: keyof z.infer<typeof OrgInfoSchema>,
    label: string,
    placeholder: string,
    type: string = 'text',
  ) => (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={
              form.formState.errors[name] ? 'text-red-500' : 'text-lightText'
            }
          >
            {label}
          </FormLabel>
          <FormControl>
            <InputComponent
              {...field}
              type={type}
              placeholder={placeholder}
              value={
                field.value as string | number | readonly string[] | undefined
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <HeaderInfo
        header="Church Information"
        currentStep={2}
        totalSteps={2}
        helperText="Please fill in the form below to create a profile for your church"
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-4 max-w-xl px-1"
      >
        {/* {isParent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="parentChurch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={
                      form.formState.errors.churchCountry
                        ? 'text-red-500'
                        : 'text-lightText'
                    }
                  >
                    HQ Church *
                  </FormLabel>
                  <SelectComponent
                    FormControl={FormControl}
                    placeholder="Select Hq Church"
                    shouldVariedOptions
                    options={[]}
                    variedOptions={data}
                    value={field.value}
                    setValue={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {renderFormField(
              'parentChurchLevel',
              'Parent Church Level *',
              'Parent Church Level',
            )}
          </motion.div>
        )} */}
        {renderFormField('churchName', 'Church Name', 'Church Name')}
        {renderFormField('churchWebsite', 'Church Website', 'Church Website')}
        {renderFormField(
          'churchEmail',
          'Church Email *',
          'Church Email',
          'email',
        )}
        <FormField
          name="churchPhone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={
                  form.formState.errors.churchPhone
                    ? 'text-red-500'
                    : 'text-lightText'
                }
              >
                Church Phone *
              </FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="NG"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {renderFormField(
          'churchAddress',
          'Church Street Address *',
          'Enter street address',
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="churchCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.churchCountry
                      ? 'text-red-500'
                      : 'text-lightText'
                  }
                >
                  Country *
                </FormLabel>
                <SelectComponent
                  FormControl={FormControl}
                  placeholder="Select country"
                  options={countryArray}
                  value={field.value}
                  setValue={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="churchState"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.churchState
                      ? 'text-red-500'
                      : 'text-lightText'
                  }
                >
                  State *
                </FormLabel>
                <FormControl>
                  <SelectComponent
                    FormControl={FormControl}
                    placeholder="Select state"
                    options={stateArray}
                    value={field.value}
                    setValue={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {renderFormField('churchCity', 'City *', 'Enter City')}
          {renderFormField('churchZip', 'Zip Code *', 'Enter Zip Code')}
        </div>
        <div className="gap-2 flex items-start">
          <input type="checkbox" id="verify" {...form.register('verify')} />
          <label htmlFor="verify" className="text-sm text-gray-400">
            I confirm that I am authorized to create and manage this page on
            behalf of the organization and agree to the additional terms for
            Pages.
          </label>
        </div>
        {form.formState?.errors?.verify && (
          <p style={{ color: 'red' }}>
            {form?.formState?.errors.verify.message}
          </p>
        )}
        <div className="grid grid-cols-2 gap-10">
          <NextButton
            overrideFn={() => {
              setStep('personal');
            }}
            text="Back"
          />
          <NextButton text="Next" isPending={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
}
