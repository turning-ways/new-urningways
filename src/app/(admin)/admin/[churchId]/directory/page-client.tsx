'use client';
import { DataTable } from '@/components/common/admin/dashboard/memberTable/data-table';
import { columns } from '@/components/common/admin/dashboard/memberTable/column';
import { useMembers } from '@/lib/client/useMembers';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContactContext } from '@/context/contact-context';
import { useParams } from 'next/navigation';

export default function PageClient() {
  const { churchId } = useParams();
  const { data, isLoading } = useMembers({
    churchId: churchId as string,
  });

  return (
    <div className="flex flex-col w-full h-full pt-6 pr-4 overflow-auto gap-4 relative">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
