"use client";

import { Eye, EyeOffIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input, InputProps as UIInputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { useState } from "react";

export interface InputProps
  extends UIInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  heading?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ heading, placeholder, className, ...inputProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="mb-4 flex relative">
        {heading && <Label>{heading}</Label>}
        <Input
          ref={ref} // Forwarding the ref to the Input component
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...inputProps}
          className={cn(
            "outline-none w-full bg-inherit text-black text-lg h-10 rounded-lg px-4 py-6 focus-visible:ring-1 focus-visible:ring-mainLight bg-[#F7FAFC] border border-[#E2E8F0]",
            className
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-700 focus-visible:ring-0">
          {showPassword ? (
            <EyeOffIcon strokeWidth={1.5} className="size-5" />
          ) : (
            <Eye strokeWidth={1.5} className="size-5" />
          )}
        </button>
        {/* Error handling placeholders */}
        {/* {formErrors && <p className="text-red-500 text-sm mt-1">{formErrors}</p>}
        {mutationError && (
          <p className="text-red-500 text-sm mt-1">{mutationError}</p>
        )} */}
      </div>
    );
  }
);

// Add display name for better debugging experience
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
