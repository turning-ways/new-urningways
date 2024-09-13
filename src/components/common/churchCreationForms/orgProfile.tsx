"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import InputComponent from "../Input/input";
import { OrgLevelSchema } from "@/app/(auth)/register/setup/step";
import SelectComponent from "../Input/select";
import { useChurchCreationStore } from "@/lib/stores/churchCreation.store";
import { HeaderInfo } from "./form1";
import { NextButton } from "../Input/buttons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

export default function OrgProfileForm({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) {
  const updateFormData = useChurchCreationStore(
    (state) => state.updateFormData
  );
  const formData = useChurchCreationStore((state) => state.formData);
  const form = useForm<z.infer<typeof OrgLevelSchema>>({
    resolver: zodResolver(OrgLevelSchema),
    defaultValues: {
      churchName: formData.churchName || "",
      isParent:
        formData.isParent === undefined
          ? undefined
          : (formData.isParent as "false" | "true"),
    },
  });

  function onSubmit(data: z.infer<typeof OrgLevelSchema>) {
    updateFormData(data);
    console.log(formData);
    nextStep();
  }

  return (
    <Form {...form}>
      <HeaderInfo
        header="Organization Profile"
        currentStep={2}
        totalSteps={3}
        helperText="Please fill in the form below to create a profile for your church"
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-4 w-full">
        <FormField
          control={form.control}
          name="churchName"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="churchName"
                className={`font-sans text-lightText font-normal lg:text-lg ${
                  form.formState.errors.churchName
                    ? "text-red-500"
                    : "text-lightText"
                }`}>
                Church Name
              </FormLabel>
              <FormControl>
                <InputComponent
                  placeholder="Enter church name"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isParent"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="isParent"
                className={`font-sans text-lightText font-normal lg:text-lg w-full flex justify-between ${
                  form.formState.errors.isParent
                    ? "text-red-500"
                    : "text-lightText"
                }`}>
                Is this a parent church?
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="bg-black text-white rounded-full">
                        <CircleHelp className="size-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-48">
                        A parent church is the main headquarters where
                        affiliated churches, like Winners Chapel, are based and
                        operate under its authority.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <SelectComponent
                  FormControl={FormControl}
                  placeholder="Select an option"
                  shouldVariedOptions
                  options={["Yes", "No"]}
                  variedOptions={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                  value={field.value}
                  setValue={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-10">
          <NextButton overrideFn={prevStep} text="Back" />
          <NextButton text="Next" />
        </div>
      </form>
    </Form>
  );
}
