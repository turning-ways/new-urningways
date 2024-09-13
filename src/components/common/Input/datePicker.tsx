"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (value: Date) => void;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal outline-none w-full bg-inherit text-black text-lg h-10 rounded-lg px-4 py-6 focus-visible:ring-1 focus-visible:ring-mainLight bg-[#F7FAFC] border border-[#E2E8F0]",
            !value && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4 text-slate-600" />
          {value ? (
            format(value, "PPP")
          ) : (
            <span className="text-slate-600">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        {/* <div className="flex justify-between items-center p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-lg">
                {format(value, "MMMM")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <Calendar
                mode="month"
                selected={value}
                onSelect={(date: Date) => onChange(date)}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={1960}
          toYear={2030}
          selected={value}
          onSelect={(date: Date | undefined) => date && onChange(date)}
          initialFocus
          className="w-full"
        />
      </PopoverContent>
    </Popover>
  );
}
