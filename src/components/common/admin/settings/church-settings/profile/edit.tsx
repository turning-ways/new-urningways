'use client';
import SelectComponent from '@/components/common/Input/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import useCountryState from '@/hooks/useCountryState';
import { useGetChurch, useUpdateChurch } from '@/lib/client/useChurches';
import { ProfileNameFormatter } from '@/lib/utils/capitalize';
import { zodResolver } from '@hookform/resolvers/zod';
import { Country } from 'country-state-city';
import { CalendarArrowDown, Focus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PhoneInput } from '@/components/common/Input/phone';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  website: z.string().url('Invalid URL').optional(),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6),
  foundedDate: z.string().min(5),
  address: z.string().min(3),
  country: z.string().min(2),
  state: z.string().min(2),
  city: z.string().min(2),
  zip: z.string().min(3),
});

export default function ProfileEdit() {
  const { data } = useGetChurch();
  const { mutate: editChurchProfile, isPending } = useUpdateChurch();
  const { countryArray, stateArray, setSelectedCountry } =
    useCountryState('NG');

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      website: '',
      email: '',
      phone: '',
      foundedDate: '',
      address: '',
      country: 'Nigeria',
      state: '',
      city: '',
      zip: '',
    },
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name || '');
      setValue('website', data.website || '');
      setValue('email', data.email || '');
      setValue('phone', data.phone || '');
      setValue('foundedDate', data.foundedDate || '');
      setValue('address', data.address || '');
      setValue('country', data.country || 'Nigeria');
      setValue('city', data.city || 'Lagos');
      setValue('state', data.state || 'Lagos');
      setValue('zip', data.zip || '');
    }
  }, [data, setValue]);

  const selectedCountry = useWatch({ control, name: 'country' });

  // Update the country in the hook when the form value changes
  useEffect(() => {
    const countryCode = Country.getAllCountries().find(
      (country) => country.name === selectedCountry,
    )?.isoCode;

    if (countryCode) {
      setSelectedCountry(countryCode);
    }
  }, [selectedCountry, setSelectedCountry]);

  const onSubmit = (formData: FieldValues) => {
    editChurchProfile({
      name: formData?.name,
      website: formData?.website,
      address: formData?.address,
      city: formData?.city,
      state: formData?.state,
      zip: formData?.zip,
      country: formData?.country,
      phone: formData?.phone,
      email: formData?.email,
      foundedDate: formData?.foundedDate,
    });
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full w-full flex flex-col gap-12"
    >
      <div className="w-full justify-center flex">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/images/avatar.jpg" alt="User avatar" />
            <AvatarFallback className="bg-yellow-500 w-full text-4xl text-white pt-1">
              {ProfileNameFormatter(data?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="bg-white border-2 absolute -bottom-2 z-10 right-2 p-2 rounded-full border-textDark">
            <Focus className="text-textDark" />
          </div>
        </div>
      </div>
      <div className="w-full h-full grid md:grid-cols-2 gap-4">
        <ul className="w-full flex flex-col gap-4">
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.name
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="church-name">Church Name</label>
            <Input
              {...register('name')}
              className={`text-lg text-textGray px-3 py-4  focus-visible:outline-none ${
                errors.name
                  ? 'focus-visible:ring-red-500'
                  : 'focus-visible:ring-textGray'
              }`}
            />
          </li>
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.website
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="website">Website</label>
            <Input
              {...register('website')}
              className={`text-lg text-textGray px-3 py-4 focus-visible:outline-none ${
                errors.website
                  ? 'focus-visible:ring-red-500'
                  : 'focus-visible:ring-textGray'
              }`}
            />
          </li>
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.email
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="email">Email</label>
            <Input
              {...register('email')}
              className={`text-lg text-textGray px-3 py-4  focus-visible:outline-none ${
                errors.email
                  ? 'focus-visible:ring-red-500'
                  : 'focus-visible:ring-textGray'
              }`}
            />
          </li>
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.phone
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="phone">Phone</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  placeholder=""
                  value={field.value}
                  onChange={field.onChange}
                  defaultCountry="NG"
                  className={`${
                    errors.phone
                      ? 'focus-visible:ring-red-500'
                      : 'focus-visible:ring-textGray'
                  }`}
                />
              )}
            />
          </li>
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.zip
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="zip">Zip/Postal Code</label>
            <Input
              {...register('zip')}
              className={`text-lg text-textGray px-3 py-4 focus-visible:ring-textGray focus-visible:outline-none ${
                errors.zip
                  ? 'focus-visible:ring-red-500'
                  : 'focus-visible:ring-textGray'
              }`}
            />
          </li>
          {/*<li className={`text-base flex flex-col gap-1 text-textDark px-2 ${errors.isHq ? "focus-visible:ring-textGray" : "focus-visible:ring-red-500"}`}>
            <label>Is this a parent church?</label>
            <Controller
              name="isHq"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  placeholder="Select option"
                  options={['Yes', 'No']}
                  value={field.value}
                  setValue={field.onChange}
                />
              )}
            />
          </li> */}
        </ul>
        <ul className="w-full flex flex-col gap-4">
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.foundedDate
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="foundedDate">Founded</label>
            <Controller
              name="foundedDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'text-lg text-textGray px-3 py-4 focus-visible:outline-none',
                        !field.value && 'text-muted-foreground',
                        errors.foundedDate
                          ? 'focus-visible:ring-red-500'
                          : 'focus-visible:ring-textGray',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarArrowDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      fromYear={1960}
                      toYear={2030}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date: Date | undefined) => {
                        if (date) {
                          field.onChange(date.toISOString());
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </li>
          <li className="text-base flex flex-col gap-1 text-textDark px-2">
            <label htmlFor="address">Church Address</label>
            <Input
              {...register('address')}
              className={`text-lg text-textGray px-3 py-4 focus-visible:ring-textGray focus-visible:outline-none ${
                errors.address
                  ? 'focus-visible:ring-red-500'
                  : 'focus-visible:ring-textGray'
              }`}
            />
          </li>
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.country
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="country">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  placeholder="Select Country"
                  options={countryArray}
                  value={field.value}
                  setValue={field.onChange}
                />
              )}
            />
          </li>
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.state
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="state">State</label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  placeholder="Select State"
                  options={stateArray}
                  value={field.value}
                  setValue={field.onChange}
                />
              )}
            />
          </li>
          <li
            className={`text-base flex flex-col gap-1 text-textDark px-2 ${
              errors.city
                ? 'focus-visible:ring-red-500'
                : 'focus-visible:ring-textGray'
            }`}
          >
            <label htmlFor="city">City</label>
            <Input
              {...register('city')}
              className={`text-lg text-textGray px-3 py-4 focus-visible:ring-textGray focus-visible:outline-none`}
            />
          </li>
        </ul>
        <div className="w-full h-full text-2xl flex items-center justify-end">
          <Button role="button" type="submit" disabled={isPending}>
            {isPending ? <LoadingSpinner /> : 'Edit'}
          </Button>
        </div>
        <div className="w-full h-12 text-white flex items-center justify-end">
          <p>hy</p>
        </div>
      </div>
    </form>
  );
}
