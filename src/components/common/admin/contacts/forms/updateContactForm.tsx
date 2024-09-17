'use client';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import InputComponent from '@/components/common/Input/input';
import SelectComponent from '@/components/common/Input/select';
import { PhoneInput } from '@/components/common/Input/phone';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { DatePicker } from '@/components/common/Input/datePicker';
import { useUpdateContact } from '@/lib/client/useContact';
import { useContactContext } from '@/context/contact-context';
import { toast } from 'sonner';
import { LoadingCircle } from '@/components/ui/loading-circle';
import { Contact } from '@/lib/client/contactApiFunction';
import { matchQuery } from '@tanstack/react-query';

const schema = z.object({
  firstName: z.string({ message: 'First name is required' }),
  lastName: z.string().optional(),
  phone: z
    .string({ message: 'Phone number is required' })
    .refine((value) => isValidPhoneNumber(value), {
      message: 'Invalid phone number',
    }),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  maturity: z.enum(['INFANT', 'CHILD', 'TEEN', 'ADULT', 'ELDER']).optional(),
  contactType: z.enum([
    'VISITOR',
    'REGULAR',
    'PARTICIPANT',
    'INPROGRESS',
    'MEMBER',
  ]),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  address: z.string().optional(),
});

export default function ContactUpdateForm({
  initialData,
  setIsOpen,
}: {
  initialData: Contact;
  setIsOpen: (open: boolean) => void;
}) {
  const { contacts } = useContactContext();
  const updateContact = useUpdateContact();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: initialData?.firstName ? initialData?.firstName : '',
      lastName: initialData?.lastName ? initialData?.lastName : '',
      phone: initialData?.phone ? initialData?.phone : '',
      email: initialData?.email ? initialData?.email : undefined,
      maturity: initialData?.maturityLevel
        ? initialData?.maturityLevel
        : undefined,
      contactType: initialData?.contactType
        ? initialData?.contactType
        : undefined,
      dateOfBirth: initialData?.dateOfBirth
        ? new Date(initialData?.dateOfBirth)
        : undefined,
      gender: initialData?.gender ? initialData?.gender : undefined,
      address: initialData?.address ? initialData?.address : '',
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);
    try {
      await updateContact.mutateAsync(
        {
          churchId: contacts?.churchId,
          contactId: initialData.id,
          Idata: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            gender: data.gender,
            maturity: data.maturity,
            contactType: data.contactType,
            dateOfBirth: data.dateOfBirth,
            address: data.address,
          },
        },
        {
          onSuccess: () => {
            toast.success('Contact updated successfully');
            setIsOpen(false);
          },
        },
      );
    } catch (error: any) {
      // Additional safety catch block
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.error('Error updating contact:', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1 mb-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal text-gray-500">
                First Name <span className="text-green-500">*</span>
              </FormLabel>
              <FormControl>
                <InputComponent {...field} placeholder="" />
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
              <FormLabel className="text-lg font-normal text-gray-500">
                Last Name
              </FormLabel>
              <FormControl>
                <InputComponent {...field} placeholder="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal text-gray-500">
                Phone <span className="text-green-500">*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  placeholder=""
                  value={field.value}
                  onChange={field.onChange}
                  defaultCountry="NG"
                />
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
              <FormLabel className="text-lg font-normal text-gray-500">
                Email
              </FormLabel>
              <FormControl>
                <InputComponent {...field} placeholder="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal text-gray-500">
                Gender <span className="text-green-500">*</span>
              </FormLabel>
              <FormControl>
                <SelectComponent
                  {...field}
                  placeholder=""
                  shouldVariedOptions={true}
                  options={['MALE', 'FEMALE']}
                  variedOptions={[
                    { label: 'Male', value: 'MALE' },
                    { label: 'Female', value: 'FEMALE' },
                  ]}
                  value={field.value}
                  setValue={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maturity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal text-gray-500">
                Maturity
              </FormLabel>
              <FormControl>
                <SelectComponent
                  {...field}
                  placeholder=""
                  shouldVariedOptions={true}
                  options={['INFANT', 'CHILD', 'TEEN', 'ADULT', 'ELDER']}
                  variedOptions={[
                    { label: 'Infant', value: 'INFANT' },
                    { label: 'Child', value: 'CHILD' },
                    { label: 'Teen', value: 'TEEN' },
                    { label: 'Adult', value: 'ADULT' },
                    { label: 'Elder', value: 'ELDER' },
                  ]}
                  value={field.value}
                  setValue={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal text-gray-500">
                Contact Type <span className="text-green-500">*</span>
              </FormLabel>
              <FormControl>
                <SelectComponent
                  {...field}
                  placeholder=""
                  shouldVariedOptions={true}
                  options={[
                    'VISITOR',
                    'REGULAR',
                    'PARTICIPANT',
                    'INPROGRESS',
                    'MEMBER',
                  ]}
                  variedOptions={[
                    { label: 'Vistor', value: 'VISITOR' },
                    { label: 'Regular', value: 'REGULAR' },
                    { label: 'Participant', value: 'PARTICIPANT' },
                    { label: 'Inprogress', value: 'INPROGRESS' },
                    { label: 'Member', value: 'MEMBER' },
                  ]}
                  value={field.value}
                  setValue={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal text-gray-500">
                Date of Birth
              </FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value || undefined}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal text-gray-500">
                Address
              </FormLabel>
              <FormControl>
                <InputComponent {...field} placeholder="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            disabled={updateContact.isPending}
            className="btn px-8 py-2 bg-white hover:bg-gray-100 rounded-md text-main_DarkBlue border border-main_DarkBlue"
          >
            {updateContact.isPending ? <LoadingCircle /> : 'Update Contact'}
          </button>
        </div>
      </form>
    </Form>
  );
}
