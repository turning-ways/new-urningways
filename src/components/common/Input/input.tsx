import React from "react";
import { Label } from "@/components/ui/label";
import { Input, InputProps as UIInputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Extend React's standard input props and add ref forwarding
export interface InputProps
  extends UIInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  heading?: string;
}

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ heading, placeholder, type, value, className, ...inputProps }, ref) => {
    return (
      <div className="mb-4">
        {heading && <Label className="mb-2 text-lg">{heading}</Label>}
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          {...inputProps}
          ref={ref} // Forward the ref to the Input component
          className={cn(
            "outline-none w-full text-black text-lg h-10 rounded-lg px-4 py-6 focus-visible:ring-1 focus-visible:ring-mainLight bg-[#F7FAFC] border border-[#E2E8F0]",
            className
          )}
        />
      </div>
    );
  }
);

InputComponent.displayName = "InputComponent";

export default InputComponent;
