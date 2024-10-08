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
      <div className="fixed bottom-4 right-4">
        <Link
          href={`/admin/${churchId}/directory/new`}
          className="flex items-center gap-2 bg-main_DarkBlue text-white text-lg px-4 py-3 rounded-lg"
        >
          <div className="bg-white size-6 rounded-full flex justify-center items-center">
            <Plus className="size-5 text-main_DarkBlue" />
          </div>
          Add Member
        </Link>
      </div>
    </div>
  );
}
