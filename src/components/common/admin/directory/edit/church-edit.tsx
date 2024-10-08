'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { MemberChurchCreationschema as schema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import FormFieldComponent from '@/components/common/form-field';
import { useRouter } from 'next/navigation';
import SelectComponent from '@/components/common/Input/select';
import { useRoles } from '@/lib/client/useRoles'; // Import the custom hook
import api from '@/lib/axios';
import { LoadingCircle } from '@/components/ui/loading-circle';
import { AContact } from '@/types/member';
import InputComponent from '@/components/common/Input/input';

export default function ChurchEdit({
  setFormData,
  formData,
  currentViewIndex,
  maxViewIndex,
  previousView,
  nextView,
  roles,
  isLastView,
  saveMember,
  isLoading,
}: {
  setFormData: Function;
  formData: any;
  currentViewIndex?: number;
  maxViewIndex?: number;
  previousView?: Function;
  nextView?: Function;
  roles: Array<{ id: string; name: string }>;
  isLastView?: boolean;
  saveMember?: Function;
  isLoading?: boolean;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      workerStatus: formData.workerStatus || undefined,
      workerType: formData.workerType || undefined,
      serviceUnit: formData.serviceUnit || undefined,
      churchRole: formData.churchRole || undefined,
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setFormData(data);
    const fullData = { ...formData, ...data };
    saveMember?.(fullData);
  }

  const formFields = [
    {
      control: form.control,
      name: 'workerStatus',
      label: 'Worker Status',
      isDropdown: true,
      options: ['Active', 'Inactive'],
      component: SelectComponent,
      shouldVariedOptions: true,
      variedOptions: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'INACTIVE', label: 'Inactive' },
      ],
    },
    {
      control: form.control,
      name: 'workerType',
      label: 'Worker Type',
      component: SelectComponent,
      isDropdown: true,
      options: [
        'ADMIN',
        'WORKER',
        'USHER',
        'CHOIR',
        'GREETER',
        'SECURITY',
        'OTHER',
      ],
      shouldVariedOptions: true,
      variedOptions: [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'WORKER', label: 'Worker' },
        { value: 'USHER', label: 'Usher' },
        { value: 'CHOIR', label: 'Choir' },
        { value: 'GREETER', label: 'Greeter' },
        { value: 'SECURITY', label: 'Security' },
        { value: 'OTHER', label: 'Other' },
      ],
    },
    {
      control: form.control,
      name: 'serviceUnit',
      label: 'Service Unit',
      component: InputComponent,
    },
    {
      control: form.control,
      name: 'churchRole',
      label: 'Church Role',
      isCompulsory: true,
      component: SelectComponent,
      isDropdown: true,
      options: roles.map((role: { id: string; name: string }) => role.name), // Use the fetched roles here
      shouldVariedOptions: true,
      variedOptions: roles.map((role: { id: string; name: string }) => ({
        value: role.id,
        label: role.name,
      })),
      isDisabled: true,
      reason: 'This Member Role cannot be changed',
    },
  ];

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
              {!isLastView && (
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg"
                >
                  Next
                </button>
              )}
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
