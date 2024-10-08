'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { contactInfoFields } from './fields';
import { MemberContactCreationschema as schema } from '@/lib/schema';
import { useForm } from 'react-hook-form';
import FormFieldComponent from '@/components/common/form-field';
import { useParams, useRouter } from 'next/navigation';
import { useMemberCreationStore } from '@/lib/stores/newMember.store';

export default function Contact() {
  const { churchId } = useParams();
  const router = useRouter();
  const { setFormData, formData } = useMemberCreationStore();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: formData.email || undefined,
      address: formData.address || undefined,
      phoneNumber: formData.phoneNumber || '',
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setFormData(data);
    router.replace(`/admin/${churchId}/directory/new?view=church`);
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
        <div className="md:col-span-2 flex justify-between px-2">
          <button
            onClick={() =>
              router.replace(`/admin/${churchId}/directory/new?view=personal`)
            }
            className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg self-start"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg"
          >
            Next
          </button>
        </div>
      </form>
    </Form>
  );
}
