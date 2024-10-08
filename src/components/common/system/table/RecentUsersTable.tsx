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

const data: Users[] = [
  {
    id: 'm5gr84i9',
    account: 'Living Faith Church',
    adminName: 'Ken Adams',
    adminNumber: '+1 (555) 123-4567',
    createdOn: '2024-01-15',
    profile: 'https://example.com/profiles/ken-adams.jpg', // Image URL
  },
  {
    id: '3u1reuv4',
    account: 'Daystar',
    adminName: 'Abe Turner',
    adminNumber: '+1 (555) 987-6543',
    createdOn: '2024-02-10',
    profile: 'Abe Turner', // Name as profile
  },
  {
    id: 'derv1ws0',
    account: 'Salvation ministries',
    adminName: 'Monserrat Lopez',
    adminNumber: '+1 (555) 246-8109',
    createdOn: '2024-03-05',
    profile: 'https://example.com/profiles/monserrat-lopez.png', // Image URL
  },
  {
    id: '5kma53ae',
    account: 'RCCG',
    adminName: 'Silas Smith',
    adminNumber: '+1 (555) 333-2222',
    createdOn: '2024-04-20',
    profile: 'Silas Smith', // Name as profile
  },
  {
    id: 'bhqecj4p',
    account: "The Lord's chosen",
    adminName: 'Carmella Ray',
    adminNumber: '+1 (555) 789-0123',
    createdOn: '2024-05-30',
    profile: 'https://example.com/profiles/carmella-ray.jpg', // Image URL
  },
];

export type Users = {
  id: string;
  account: string;
  adminName: string;
  adminNumber: string;
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

      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={profile}
              alt="User avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-main_primary uppercase text-white pt-1">
              {profile
                .split(' ')
                .map((name) => name[0])
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
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Account
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('account')}</div>
    ),
  },
  {
    accessorKey: 'adminName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Admin Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('adminName')}</div>
    ),
  },
  {
    accessorKey: 'adminNumber',
    header: 'Admin Phone Number',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('adminNumber')}</div>
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

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <p className="text-main_secondaryDark cursor-pointer flex items-center gap-2">
          View More <MoveRight />
        </p>
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