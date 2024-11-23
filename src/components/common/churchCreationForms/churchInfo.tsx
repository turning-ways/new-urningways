'use client';

import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import InputComponent from '../Input/input';
import SelectComponent from '../Input/select';
import { NextButton } from '../Input/buttons';
import { PhoneInput } from '../Input/phone';
import { useChurchCreationStore } from '@/lib/stores/churchCreation.store';
import { HeaderInfo } from './form1';
import { motion } from 'framer-motion';
import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';
import { createOnboarding } from '@/app/api/church/create-onboarding';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { invalidateUserCheck, useUserCheck } from '@/lib/swr/use-user-check';
import { useSession } from 'next-auth/react';
import { OrgInfoSchema } from '@/app/(auth)/register/setup/step';
import useCountryState from '@/hooks/useCountryState';

function useHandleSubmit(
  formData: any,
  updateFormData: any,
  router: any,
  update: any,
) {
  const onSubmit = async (data: z.infer<typeof OrgInfoSchema>) => {
    try {
      updateFormData(data);
      const loadingToast = toast.loading('Creating your church profile...');

      const response = await createOnboarding({
        churchEmail: data.churchEmail,
        churchPhone: data.churchPhone,
        churchName: formData.churchName,
        churchAddress: data.churchAddress,
        churchCity: data.churchCity,
        churchState: data.churchState,
        churchCountry: data.churchCountry,
        churchZip: data.churchZip,
        churchWebsite: data.churchWebsite || '',
        denomination: formData?.denomination || 'Branch',
        parentChurchId: formData.parentChurch || undefined,
        parentChurchLevelId: formData.parentChurchLevel || undefined,
        isParent: formData.isParent === 'true',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        hearAboutUs: formData.hearAboutUs,
        dob: formData.dob,
        gender: formData.gender,
      });

      if (response.success) {
        invalidateUserCheck();
        toast.dismiss(loadingToast);
        toast.success('Church profile created successfully');
        update({ churchId: response.data?.churchId });
        setTimeout(() => {
          router.push(
            `/admin/${response.data?.churchId}?mainChurchId=${response.data?.churchId}`,
          );
        }, 1500);
      } else {
        if (response.error.message === 'Church already exists') {
          throw new Error('Church already exists');
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
      }
      toast.error('An error occurred while creating your church profile');
    }
  };

  return onSubmit;
}

export default function ChurchProfileForm({
  prevStep,
}: {
  prevStep: () => void;
}) {
  const { update } = useSession();
  const router = useRouter();
  const [defaultCountry, setDefaultCountry] = useState('NG');
  const { countryArray, stateArray } = useCountryState(defaultCountry);
  const updateFormData = useChurchCreationStore(
    (state) => state.updateFormData,
  );
  const formData = useChurchCreationStore((state) => state.formData);
  const form = useForm<z.infer<typeof OrgInfoSchema>>({
    resolver: zodResolver(OrgInfoSchema),
    defaultValues: {
      parentChurch: formData.parentChurch || '',
      parentChurchLevel: formData.parentChurchLevel || '',
      churchWebsite: formData.churchWebsite || '',
      churchName: formData.churchName || '',
      churchEmail: '',
      churchPhone: formData.churchPhone || '',
      churchAddress: formData.churchAddress || '',
      churchCity: formData.churchCity || '',
      churchState: formData.churchState || '',
      churchCountry: formData.churchCountry || 'Nigeria',
      churchZip: formData.churchZip || '',
      verify: formData.verify || false,
    },
  });

  const selectedCountry = useWatch({
    control: form.control,
    name: 'churchCountry',
  });

  useEffect(() => {
    const countryCode = Country.getAllCountries().find(
      (country) => country.name === selectedCountry,
    )?.isoCode;

    if (countryCode) setDefaultCountry(countryCode);
  }, [selectedCountry]);

  const handleSubmit = useHandleSubmit(
    formData,
    updateFormData,
    router,
    update,
  );

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
            <InputComponent {...field} type={type} placeholder={placeholder} />
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
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-4 w-full"
      >
        {formData.isParent === 'false' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {renderFormField(
              'parentChurch',
              'Parent Church *',
              'Parent Church',
            )}
            {renderFormField(
              'parentChurchLevel',
              'Parent Church Level *',
              'Parent Church Level',
            )}
          </motion.div>
        )}
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
          {renderFormField('churchZip', 'Zip Code *', 'Enter Zip Code')}\
        </div>
        <div className="gap-2">
          <input type="checkbox" id="verify" {...form.register('verify')} />
          <label htmlFor="verify">
            I verify that I am an authorized representative Of this organization
            and have the right to act on its behalf in the creation and
            management of this page. The organization and I agree to the
            additional terms for Pages.
          </label>
        </div>
        {form.formState?.errors?.verify && (
          <p style={{ color: 'red' }}>{form?.formState?.errors.verify.message}</p>
        )}
        <div className="grid grid-cols-2 gap-10">
          <NextButton overrideFn={prevStep} text="Back" />
          <NextButton text="Next" isPending={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
}
