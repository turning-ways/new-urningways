"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GContact } from "./contacts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { NameFormatter, ProfileNameFormatter } from "@/lib/utils/capitalize";
import { formatDate } from "@/lib/utils/date-formatter";
import { AvatarStack } from "@/components/ui/avatarStack";
import { LabelStack } from "@/components/ui/labels";

export const columns: ColumnDef<GContact>[] = [
  {
    header: "",
    accessorKey: "photo",
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage
              src={(row.original as { photo: string }).photo}
              className="object-cover w-8 h-8 rounded-full"
            />
            <AvatarFallback>
              {row.original.firstName &&
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
        <div className="flex items-center capitalize gap-x-2">
          <p>{NameFormatter(row.original.firstName, row.original.lastName)}</p>
        </div>
      );
    },
  },
  {
    header: "Age",
    accessorKey: "age",
    filterFn: "inNumberRange",
    sortingFn: "alphanumeric",
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize gap-x-2">
          <p>{row.original.age}</p>
        </div>
      );
    },
  },
  {
    header: "Phone",
    accessorKey: "phone",
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center lowercase gap-x-2">
          <p>{row.getValue("phone")}</p>
        </div>
      );
    },
  },
  {
    header: "labels",
    accessorKey: "labels",
    filterFn: (row, columnId, filterValue) => {
      // Get the array of labels from the row
      const labels = row.original.labels as { name: string; color: string }[];
      console.log(labels);
      console.log(filterValue);

      // Return true if any label's name includes the filterValue
      return labels.some((label) => {
        console.log(label);
        return filterValue.includes(label.name);
      });
    },
    size: 400,
    sortingFn: "alphanumericCaseSensitive",
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize gap-x-2">
          <LabelStack
            labels={row.original.labels}
            maxLabelsAmount={2}
            labelSize="sm"
          />
        </div>
      );
    },
  },

  {
    header: "Assigned To",
    accessorKey: "assignedTo",
    filterFn: "includesStringSensitive",
    sortingFn: "alphanumericCaseSensitive",
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize gap-x-2">
          {row.original?.assignedTo && row.original.assignedTo.length > 0 ? (
            <AvatarStack
              avatars={row.original.assignedTo}
              spacing={"sm"}
              maxAvatarsAmount={3}
            />
          ) : (
            <p>No Agent</p>
          )}
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "contactStatus",
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize gap-x-2">
          <p>{row.original.contactStatus}</p>
        </div>
      );
    },
  },
  {
    header: "Modified",
    accessorKey: "updatedAt",
    sortingFn: "datetime",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <p>
            {row?.original?.updatedAt ? formatDate(row.original.updatedAt) : ""}
          </p>
        </div>
      );
    },
  },
];
