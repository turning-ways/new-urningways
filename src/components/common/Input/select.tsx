"use client";

import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SelectProps {
  label?: string;
  FormControl?: any;
  placeholder: string;
  options: string[];
  shouldVariedOptions?: boolean;
  variedOptions?: {
    value: string;
    label: string;
  }[];
  value?: string;
  disabled?: boolean;
  reason?: string;
  setValue?: (value: string) => void;
}

const SelectComponent = ({
  label,
  FormControl,
  placeholder,
  options,
  shouldVariedOptions,
  variedOptions,
  value,
  setValue,
  disabled,
  reason,
}: SelectProps) => {
  return (
    <div className="mb-4">
      {label && <SelectLabel>{label}</SelectLabel>}
      {disabled && reason ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <Select
                onValueChange={setValue}
                value={value}
                defaultValue={value}
                disabled={disabled}>
                {FormControl ? (
                  <FormControl>
                    <SelectTrigger className="outline-none w-full bg-inherit text-black text-lg h-10 rounded-lg px-4 py-6 focus-visible:ring-1 focus-visible:ring-mainLight bg-[#F7FAFC] border border-[#E2E8F0] focus:ring-0">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                ) : (
                  <SelectTrigger className="outline-none w-full bg-inherit text-black text-lg h-10 rounded-lg px-4 py-6 focus-visible:ring-1 focus-visible:ring-mainLight bg-[#F7FAFC] border border-[#E2E8F0] focus:ring-0">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                )}
                <SelectContent className="text-black font-sans text-lg bg-[#F7FAFC] border border-[#E2E8F0]">
                  {shouldVariedOptions && variedOptions
                    ? variedOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-lg">
                          {option.label}
                        </SelectItem>
                      ))
                    : options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-lg">{reason}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Select
          onValueChange={setValue}
          value={value}
          defaultValue={value}
          disabled={disabled}>
          {FormControl ? (
            <FormControl>
              <SelectTrigger className="outline-none w-full bg-inherit text-black text-lg h-10 rounded-lg px-4 py-6 focus-visible:ring-1 focus-visible:ring-mainLight bg-[#F7FAFC] border border-[#E2E8F0] focus:ring-0">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
          ) : (
            <SelectTrigger className="outline-none w-full bg-inherit text-black text-lg h-10 rounded-lg px-4 py-6 focus-visible:ring-1 focus-visible:ring-mainLight bg-[#F7FAFC] border border-[#E2E8F0] focus:ring-0">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          )}
          <SelectContent className="text-black font-sans text-lg bg-[#F7FAFC] border border-[#E2E8F0]">
            {shouldVariedOptions && variedOptions
              ? variedOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-lg">
                    {option.label}
                  </SelectItem>
                ))
              : options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default SelectComponent;
