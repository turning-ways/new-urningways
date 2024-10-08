"use client";

import { columns } from "@/components/common/admin/contacts/table/contacts-column";
import { DataTable } from "@/components/common/admin/dashboard/memberTable/data-table";
import { useContactContext } from "@/context/contact-context";
import { useContacts } from "@/lib/client/useContacts";

export default function Contacts() {
  const { contacts } = useContactContext();
  const { data, isLoading } = useContacts({
    churchId: contacts?.churchId ?? "",
  });

  return (
    <div className="flex flex-col w-full h-full pt-1 pr-4 overflow-auto gap-4 relative">
      <DataTable
        columns={columns}
        data={data}
        entity="contacts"
        isLoading={isLoading}
      />
    </div>
  );
}
