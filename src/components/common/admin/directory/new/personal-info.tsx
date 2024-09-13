"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { personalInfoFields } from "./fields";
import { MemberPersonalCreationschema as schema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import FormFieldComponent from "@/components/common/form-field";
import { ADMIN_DIRECTORY } from "@/constants/route-constants";
import { useRouter } from "next/navigation";
import { useMemberCreationStore } from "@/lib/stores/newMember.store";

export default function Personal() {
  const router = useRouter();
  const { setFormData, formData } = useMemberCreationStore();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: formData.firstName || "",
      middleName: formData.middleName || "",
      lastName: formData.lastName || "",
      prefix: formData.prefix || undefined,
      suffix: formData.suffix || undefined,
      gender: formData.gender || undefined,
      educationLevel: formData.educationLevel || undefined,
      maritalStatus: formData.maritalStatus || undefined,
      employmentStatus: formData.employmentStatus || undefined,
      healthStatus: formData.healthStatus || undefined,
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setFormData(data);
    router.replace(`${ADMIN_DIRECTORY}/new?view=contact`);
  }

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
          <button
            type="submit"
            className="px-4 py-2 text-white bg-main_DarkBlue rounded-lg">
            Next
          </button>
        </div>
      </form>
    </Form>
  );
}
