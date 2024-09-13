import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import React from "react";

type VariedOption = {
  value: string;
  label: string;
};

interface FormFieldComponentProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  isCompulsory?: boolean;
  isDropdown?: boolean;
  isDate?: boolean;
  options?: Array<string>;
  isLastItem?: boolean;
  shouldVariedOptions?: boolean;
  variedOptions?: Array<VariedOption>;
  component: any;
  componentClassName?: string;
  isDisabled?: boolean;
  reason?: string;
}

export default function FormFieldComponent({
  control,
  name,
  label,
  placeholder = "",
  isCompulsory = false,
  isDropdown = false,
  isDate = false,
  isLastItem = false,
  options = [],
  shouldVariedOptions = false,
  variedOptions,
  component: Component,
  componentClassName,
  isDisabled = false,
  reason = "Disabled",
}: FormFieldComponentProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${isLastItem ? "md:col-span-2" : ""}`}>
          <FormLabel className="font-normal text-lg text-gray-500">
            {label} {isCompulsory && <span className="text-green-500">*</span>}
          </FormLabel>

          <FormControl>
            {isDropdown ? (
              <Component
                {...field}
                className={componentClassName}
                placeholder={placeholder}
                options={options}
                shouldVariedOptions={shouldVariedOptions}
                variedOptions={variedOptions}
                value={field.value}
                setValue={field.onChange}
                disabled={isDisabled}
                reason={reason}
              />
            ) : isDate ? (
              <Component value={field.value} onChange={field.onChange} />
            ) : (
              <Component
                {...field}
                className={componentClassName}
                placeholder={placeholder}
                disabled={isDisabled}
              />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
