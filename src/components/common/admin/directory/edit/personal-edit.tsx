"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { personalInfoFields } from "../new/fields";
import { MemberPersonalCreationschema as schema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import FormFieldComponent from "@/components/common/form-field";
import { IMember } from "@/types/member";
import { LoadingCircle } from "@/components/ui/loading-circle";

export default function PersonalEdit({
  setFormData,
  formData,
  currentViewIndex,
  maxViewIndex,
  initialData,
  previousView,
  nextView,
  saveMember,
  isLoading,
}: {
  setFormData: Function;
  formData: any;
  initialData?: IMember;
  currentViewIndex?: number;
  maxViewIndex?: number;
  previousView?: Function;
  nextView?: Function;
  saveMember?: Function;
  isLoading?: boolean;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: initialData?.firstName || formData.firstName || "",
      middleName: initialData?.middleName || formData.middleName || "",
      lastName: initialData?.lastName || formData.lastName || "",
      dateOfBirth:
        new Date(initialData?.dateOfBirth ?? new Date()) ||
        new Date(formData.dateOfBirth) ||
        "",
      prefix: initialData?.prefix || formData.prefix || undefined,
      suffix: initialData?.suffix || formData.suffix || undefined,
      gender: initialData?.gender || formData.gender || undefined,
      educationLevel:
        initialData?.educationLevel || formData.educationLevel || undefined,
      maritalStatus:
        initialData?.maritalStatus || formData.maritalStatus || undefined,
      employmentStatus:
        initialData?.employmentStatus || formData.employmentStatus || undefined,
      healthStatus:
        initialData?.healthStatus || formData.healthStatus || undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setFormData(data);
    const fullData = { ...formData, ...data };
    saveMember?.(fullData);
  };

  const formFields = personalInfoFields(form);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 !font-sans">
        {formFields.map((field, index) => (
          <FormFieldComponent key={index} {...field} />
        ))}
        <div className="md:col-span-2 flex justify-end px-2">
          <div className="flex justify-between w-full">
            <div className="flex gap-4">
              {currentViewIndex !== 0 && (
                <button
                  type="button"
                  onClick={() => previousView?.()}
                  className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg">
                  Previous
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  nextView?.();
                  setFormData(form.getValues());
                }}
                className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg">
                Next
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg">
              {isLoading ? <LoadingCircle /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
