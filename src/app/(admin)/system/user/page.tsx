import { UsersDataTable } from '@/components/common/system/table/UsersTable';

export default function UserManagementPage() {
  return (
    <div className="py-8 px-4 md:px-16 flex flex-col gap-8">
      <UsersDataTable />
    </div>
  );
}
