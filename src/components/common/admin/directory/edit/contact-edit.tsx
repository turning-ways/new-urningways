'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { contactInfoFields } from '../new/fields';
import { MemberContactCreationschema as schema } from '@/lib/schema';
import { useForm } from 'react-hook-form';
import FormFieldComponent from '@/components/common/form-field';
import { useRouter } from 'next/navigation';
import { LoadingCircle } from '@/components/ui/loading-circle';

export default function ContactEdit({
  setFormData,
  formData,
  currentViewIndex,
  maxViewIndex,
  previousView,
  nextView,
  saveMember,
  isLoading,
}: {
  setFormData: Function;
  formData: any;
  currentViewIndex?: number;
  maxViewIndex?: number;
  previousView?: Function;
  nextView?: Function;
  saveMember?: Function;
  isLoading?: boolean;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: formData.email || undefined,
      address: formData.address || undefined,
      phoneNumber: formData.phone || '',
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setFormData(data);
    const fullData = { ...formData, ...data };
    saveMember?.(fullData);
  }

  const formFields = contactInfoFields(form);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 !font-sans"
      >
        {formFields.map((field, index) => (
          <FormFieldComponent
            key={index}
            {...field}
            isLastItem={
              index === formFields.length - 1 && formFields.length % 2 !== 0
            }
          />
        ))}
        <div className="md:col-span-2 flex justify-end px-2">
          <div className="flex justify-between w-full">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  previousView?.();
                  setFormData(form.getValues());
                }}
                className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  nextView?.();
                  setFormData(form.getValues());
                }}
                className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg"
              >
                Next
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg"
            >
              {isLoading ? <LoadingCircle /> : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
