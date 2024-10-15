import { AccountsDataTable } from '@/components/common/system/table/AccountsTable';
import React from 'react';

export default function AccountsPage() {
  return (
    <div className="py-8 px-4 md:px-16 flex flex-col gap-8">
      <AccountsDataTable />
    </div>
  );
}
