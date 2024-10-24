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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  MoveRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useGetRecentAccounts } from '@/lib/client/useSystemAdmin';
import Link from 'next/link';

export type Users = {
  id: string;
  account: string;
  adminName: string;
  adminNumber: string;
  adminEmail: string;
  createdOn: string;
  profile: string;
};

export const columns: ColumnDef<Users>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'profile',
    header: 'Profile',
    cell: ({ row }) => {
      const profile: string = row.getValue('profile');
      const name: string = row.getValue('account');

      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={profile}
              alt="User avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-main_primary uppercase text-white pt-1">
              {name
                .split(' ')
                .filter((n) => n)
                .map((part, index, arr) =>
                  index === 0 || index === arr.length - 1
                    ? part[0].toUpperCase()
                    : null,
                )
                .filter(Boolean)
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: 'account',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='text-left px-0 mx-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Account
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-left px-0 mx-0">{row.getValue('account')}</div>
    ),
  },
  {
    accessorKey: 'adminName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='text-left px-0 mx-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Admin Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-left px-0 mx-0">{row.getValue('adminName')}</div>
    ),
  },
  {
    accessorKey: 'adminNumber',
    header: 'Admin Phone Number',
    cell: ({ row }) => (
      <div className="capitalize text-left px-0 mx-0">{row.getValue('adminNumber')}</div>
    ),
  },
  {
    accessorKey: 'adminEmail',
    header: 'Admin Email',
    cell: ({ row }) => (
      <div className="lowercase text-left px-0 mx-0">{row.getValue('adminEmail')}</div>
    ),
  },
  {
    accessorKey: 'createdOn',
    header: () => <div className="text-left">Account Created Date</div>,
    cell: ({ row }) => {
      const createdOn = new Date(row.getValue('createdOn'));

      // Format the date as '12, August 2020'
      const formatted = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(createdOn);

      return <div className="text-left px-0 mx-0 font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Link
          href={'/system/accounts'}
          className="text-main_secondaryDark cursor-pointer flex items-center gap-2"
        >
          View More <MoveRight />
        </Link>
      );
    },
  },
];

export function RecentUserDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data: recentAccounts, isLoading } = useGetRecentAccounts();

  const data: Users[] = React.useMemo(() => {
    return recentAccounts
      ? recentAccounts
          .map((church) => {
            if (church) {
              const { id, name, createdAt, creator } = church;
              const adminName = `${creator?.firstName || ''} ${
                creator?.lastName || ''
              }`;
              const adminNumber = creator?.phone || 'None';
              const adminEmail = creator?.email || 'None';

              return {
                id,
                account: name,
                adminName: adminName,
                adminNumber: adminNumber,
                adminEmail,
                createdOn: new Date(createdAt).toISOString().split('T')[0],
                profile: `${adminName}`,
              };
            }
            return undefined;
          })
          .filter((church): church is Users => church !== undefined)
      : [];
  }, [recentAccounts]);

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
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter accounts..."
          value={(table.getColumn('account')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('account')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length == 0
          ? 'No'
          : table.getFilteredSelectedRowModel().rows.length}{' '}
        users selected
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className='text-left px-2' key={header.id}>
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2 capitalize">
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
