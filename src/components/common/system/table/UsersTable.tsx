'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EditDialog } from '../modals/EditUserRoles';
import { AssignRoleDialog } from '../modals/AssignRole';
import { DeleteUserDialog } from '../modals/DeleteUser';
import { useGetUsers } from '@/lib/client/useSystemAdmin';

const data: Users[] = [
  {
    id: 'm5gr84i9',
    name: 'Ken Adams',
    role: 'admin',
    phone: '555-1234',
    email: 'ken99@yahoo.com',
    profile: 'https://example.com/images/ken.png', // Image URL
  },
  {
    id: '3u1reuv4',
    name: 'Abe Jones',
    role: 'editor',
    phone: '555-5678',
    email: 'abe45@gmail.com',
    profile: 'Abe Jones', // Name, fallback to initials
  },
  {
    id: 'derv1ws0',
    name: 'Monserrat Perez',
    role: 'viewer',
    phone: '555-8765',
    email: 'monserrat44@gmail.com',
    profile: 'Monserrat Perez', // Name, fallback to initials
  },
  {
    id: '5kma53ae',
    name: 'Silas Green',
    role: 'admin',
    phone: '555-4321',
    email: 'silas22@gmail.com',
    profile: 'https://example.com/images/silas.png', // Image URL
  },
  {
    id: 'bhqecj4p',
    name: 'Carmella White',
    role: 'editor',
    phone: '555-9876',
    email: 'carmella@hotmail.com',
    profile: 'Carmella White', // Name, fallback to initials
  },
];

export type Users = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  profile: string;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const profile: string = row.getValue('profile');
      const name: string = row.getValue('name');

      return (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={profile}
              alt="User avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-textDark uppercase text-white pt-1">
              {name
                .split(' ')
                .map((name) => name[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="capitalize">{row.getValue('name')}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('role')?.toString().toLowerCase() ?? ''}
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone Number',
    cell: ({ row }) => <div className="lowercase">{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'email',
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue('email')}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const roleValue = row.getValue('role');
      const existingRole =
        typeof roleValue === 'string'
          ? roleValue.toLowerCase().charAt(0).toUpperCase() +
            roleValue.toLowerCase().slice(1)
          : '';

      return (
        <div className="flex items-center gap-3">
          <EditDialog existingEmail={row.getValue('email')?.toString() || ''} existingRole={existingRole} />
          {row.getValue('role')?.toString().toLowerCase() !== 'admin' && (
            <DeleteUserDialog email={row.getValue('email')?.toString() || ''} />
          )}
        </div>
      );
    },
  },
];

export function UsersDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data: adminUsers, isLoading } = useGetUsers();

  const data: Users[] = React.useMemo(() => {
    return adminUsers
      ? adminUsers
          .map((user) => {
            if (user) {
              const { id, firstName, lastName, email, phone, devRole } = user;
              const phoneNumber = phone || 'None';

              return {
                id,
                profile: firstName + ' ' + lastName,
                name: firstName + ' ' + lastName,
                email,
                phone: phoneNumber,
                role: devRole,
              };
            }
            return undefined;
          })
          .filter((church): church is Users => church !== undefined)
      : [];
  }, [adminUsers]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full overflow-auto py-2 space-y-2">
      <div className="max-w-lg flex justify-center w-full">
        <div className="border-textDark md:hidden border-2 rounded-md w-full p-1 flex items-center">
          <Search className="text-textDark" />
          <Input
            placeholder="Filter accounts..."
            value={
              (table.getColumn('account')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('account')?.setFilterValue(event.target.value)
            }
            className="max-w-sm focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
          />
        </div>
      </div>
      <div className="w-full flex items-center px-2 justify-end md:justify-between">
        <div className="border-textDark hidden border-2 rounded-md p-1 md:flex items-center">
          <Search className="text-textDark" />
          <Input
            placeholder="Filter accounts..."
            value={
              (table.getColumn('account')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('account')?.setFilterValue(event.target.value)
            }
            className="max-w-sm focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
          />
        </div>
        <AssignRoleDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#E8EDFF]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
