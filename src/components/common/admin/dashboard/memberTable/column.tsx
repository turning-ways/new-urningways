"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Member } from "./member";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { NameFormatter, ProfileNameFormatter } from "@/lib/utils/capitalize";
import { dobFormatter } from "@/lib/utils/date-formatter";
import ViewMore from "./viewMore";

export const columns: ColumnDef<Member>[] = [
  {
    header: "",
    accessorKey: "photo",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage
              src={(row.original as { photo: string }).photo}
              className="w-8 h-8 rounded-full object-cover"
            />
            <AvatarFallback>
              {row.original.firstName &&
                row.original.lastName &&
                ProfileNameFormatter(
                  row.original.firstName,
                  row.original.lastName
                )}
              {!row.original.firstName && !row.original.lastName && (
                <User size={18} />
              )}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "fullName",
    filterFn: "includesStringSensitive",
    sortingFn: "alphanumericCaseSensitive",
    cell: ({ row }) => {
      return (
        <div className="capitalize flex items-center gap-x-2">
          <p>{NameFormatter(row.original.firstName, row.original.lastName)}</p>
        </div>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    sortingFn: "alphanumericCaseSensitive",
    cell: ({ row }) => {
      return (
        <div className="lowercase flex items-center gap-x-2">
          <p>{row.getValue("email")}</p>
        </div>
      );
    },
  },
  {
    header: "Phone",
    accessorKey: "phone",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="lowercase flex items-center gap-x-2">
          <p>{row.getValue("phone")}</p>
        </div>
      );
    },
  },
  {
    header: "Date of Birth",
    accessorKey: "dateOfBirth",
    sortingFn: "datetime",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <p>{dobFormatter(row.getValue("dateOfBirth"))}</p>
        </div>
      );
    },
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: ({ row }) => {
      return (
        <div className="capitalize flex items-center gap-x-2">
          <p>{row.getValue("gender")}</p>
        </div>
      );
    },
  },
  {
    header: "",
    accessorKey: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return <ViewMore id={row.original.id} />;
    },
  },
];
