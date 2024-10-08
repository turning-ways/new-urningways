'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { MemberChurchCreationschema as schema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import FormFieldComponent from '@/components/common/form-field';
import { useRouter } from 'next/navigation';
import { useMemberCreationStore } from '@/lib/stores/newMember.store';
import { toast } from 'sonner';
import { useAddMember } from '@/lib/client/useMember';
import InputComponent from '@/components/common/Input/input';
import SelectComponent from '@/components/common/Input/select';
import { useRoles } from '@/lib/client/useRoles'; // Import the custom hook
import { uploadImage } from '@/lib/utils/image';
import api from '@/lib/axios';
import { LoadingCircle } from '@/components/ui/loading-circle';
import { AContact } from '@/types/member';

export default function Church({
  image,
  contact,
}: {
  image: File | null;
  contact: AContact | null;
}) {
  const router = useRouter();
  const { setFormData, formData, resetFormData } = useMemberCreationStore();
  const mutation = useAddMember();
  const [isloading, setIsLoading] = useState(false);

  // Get the churchId from localStorage (or wherever it's stored)
  const churchId = contact?.churchId ?? '';

  // Use the custom useRoles hook to fetch roles
  const { data: roles = [], isLoading } = useRoles(churchId); // Fetch roles and set default to empty array

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      workerStatus: formData.workerStatus || undefined,
      workerType: formData.workerType || undefined,
      serviceUnit: formData.serviceUnit || undefined,
      churchRole: formData.churchRole || undefined,
    },
  });

  // Submit handler
  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      setIsLoading(true);
      setFormData(data);

      // Validate required fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.phoneNumber ||
        !formData.gender ||
        !formData.dateOfBirth ||
        !data.churchRole
      ) {
        setIsLoading(false);
        toast.error('Please fill in all required fields');
        return;
      }

      // 1. Call the mutation to create a new member
      const result = await mutation.mutateAsync({
        churchId,
        data: {
          ...formData,
          ...data,
          createdBy: contact?.id,
          dateOfBirth: formData.dateOfBirth?.toString(), // Convert dateOfBirth to string
        },
      });

      let imageUrl = '';
      if (image) {
        try {
          // 2. Attempt to upload the image to Cloudinary
          imageUrl = await uploadImage(image, `${result.id}`);
        } catch (uploadError: any) {
          setIsLoading(false);
          // Handle image upload error so the member is still created and the user can try again later
          toast.error('An error occurred while uploading the image');
        }
      }

      if (imageUrl) {
        try {
          // 3. Update the member with the image URL
          await api.put(`/members/member/${result.id}`, { photo: imageUrl });
          toast.success('Member created successfully and image uploaded');
          setIsLoading(false);
          resetFormData();
          router.replace(`/admin/${churchId}/directory/`);
        } catch (updateError: any) {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        toast.success('Member created successfully');
        resetFormData();
        router.replace(`/admin/${churchId}/directory/`);
      }

      console.log(result);
    } catch (e: any) {
      setIsLoading(false);
      toast.error(e?.response?.data?.message ?? 'An Unexpected Error Occurred');
      console.log(e?.response?.data?.message || e.message);
    }
  }

  // Define form fields, using fetched roles
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
      variedOptions: roles
        .filter(
          (role: { id: string; name: string }) => role.name !== 'SuperAdmin',
        )
        .map((role: { id: string; name: string }) => ({
          value: role.id,
          label: role.name,
        })),
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 !font-sans"
      >
        {formFields.map((field, index) => (
          <FormFieldComponent key={index} {...field} />
        ))}
        <div className="md:col-span-2 flex justify-between px-2">
          <button
            onClick={() =>
              router.replace(`/admin/${churchId}/directory/new?view=contact`)
            }
            className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg self-start"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isloading}
            className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg disabled:bg-main_DarkBlueHover disabled:cursor-not-allowed"
          >
            {isloading ? <LoadingCircle /> : 'Submit'}
          </button>
        </div>
      </form>
    </Form>
  );
}
