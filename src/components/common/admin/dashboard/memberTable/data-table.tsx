'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  GlobalFiltering,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import QuickAction from './table-actions';
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  GripIcon,
  List,
  PlusCircle,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { NameFormatter } from '@/lib/utils/capitalize';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ADMIN_CONTACTS, ADMIN_DIRECTORY } from '@/constants/route-constants';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils/date-formatter';
import { LabelStack } from '@/components/ui/labels';
import { AvatarStack } from '@/components/ui/avatarStack';
import AddContactsModal from '../../contacts/addContactsModal';
import { useRouter } from 'next/navigation';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  entity?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  entity = 'members',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<string[]>([
    'photo',
    'fullName',
    'email',
    'phone',
    'gender',
    'dateOfBirth',
  ]);
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      columnOrder,
    },
    defaultColumn: {
      size: 200,
      minSize: 100,
      maxSize: 400,
    },
  });
  const [view, setView] = useState<'list' | 'grid'>('list');

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full gap-4 pt-6 pr-4 overflow-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-16" />
        ))}
      </div>
    );
  }

  return (
    <>
      <QuickAction table={table} entity={entity} />
      {entity !== 'members' && <ViewsComponent setView={setView} view={view} />}
      {view === 'list' && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hidden border rounded-md lg:flex">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="font-sans font-semibold text-gray-600"
                        >
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
                      className="font-sans text-base"
                      onClick={() => {
                        if (entity !== 'members') {
                          router.push(
                            `${ADMIN_CONTACTS}/${
                              (row.original as { id: string }).id
                            }`,
                          );
                          return;
                        }
                      }}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
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
          {table.getPageCount() > 1 && (
            <div className="lg:flex items-center justify-center space-x-2 py-4  !border-t-0 hidden ">
              <button
                className="flex items-center"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="size-5 mb-0.5" /> Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: table.getPageCount() }).map(
                  (_, index) => (
                    <button
                      // variant="outline"
                      // size="sm"
                      className={`${
                        table.getState().pagination.pageIndex === index
                          ? 'bg-primary text-mainLight'
                          : 'text-primary'
                      } w-6 h-6 rounded-full flex items-center justify-center pt-1`}
                      key={index}
                      onClick={() => table.setPageIndex(index)}
                      disabled={table.getState().pagination.pageIndex === index}
                    >
                      {index + 1}
                    </button>
                  ),
                )}
              </div>
              <button
                // variant="outline"
                // size="sm"
                onClick={() => table.nextPage()}
                className="flex items-center"
                disabled={!table.getCanNextPage()}
              >
                Next <ChevronRight className="size-5 mb-0.5" />
              </button>
            </div>
          )}

          <div className="flex flex-col divide-y divide-gray-300 rounded-md lg:hidden">
            {table.getRowModel().rows.map((row) => (
              <Link
                href={
                  entity === 'members'
                    ? `${ADMIN_DIRECTORY}/${
                        (row.original as { id: string }).id
                      }`
                    : `${ADMIN_CONTACTS}/${(row.original as { id: string }).id}`
                }
                key={row.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
              >
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10 rounded-full">
                    <AvatarImage
                      src={(row.original as { photo: string }).photo}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                    <AvatarFallback>CB</AvatarFallback>
                  </Avatar>
                  {/* Name, email, phone */}
                  <div key={row.id} className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 text-base font-semibold capitalize">
                      {NameFormatter(
                        (row.original as { firstName: string }).firstName,
                        (row.original as { lastName: string }).lastName,
                      )}
                    </div>
                    <div className="flex gap-4">
                      {(row.original as { phone: string }).phone}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {table.getPageCount() > 1 && (
            <div className="lg:hidden items-center justify-center space-x-2 py-4  !border-t-0 flex ">
              <button
                className="flex items-center text-base cursor-pointer"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="size-5 mb-0.5" /> Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: table.getPageCount() }).map(
                  (_, index) => (
                    <button
                      // variant="outline"
                      // size="sm"
                      className={`${
                        table.getState().pagination.pageIndex === index
                          ? 'bg-primary text-mainLight'
                          : 'text-primary'
                      } w-6 h-6 rounded-full flex items-center justify-center pt-1`}
                      key={index}
                      onClick={() => table.setPageIndex(index)}
                      disabled={table.getState().pagination.pageIndex === index}
                    >
                      {index + 1}
                    </button>
                  ),
                )}
              </div>
              <button
                // variant="outline"
                // size="sm"
                onClick={() => table.nextPage()}
                className="flex items-center text-base cursor-pointer"
                disabled={!table.getCanNextPage()}
              >
                Next <ChevronRight className="size-5 mb-0.5" />
              </button>
            </div>
          )}
        </motion.div>
      )}
      {view === 'grid' && (
        // A grid view of the data with animation that fades in
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6"
        >
          {table.getRowModel().rows.map((row) => (
            <Card
              key={row.id}
              onClick={() =>
                router.push(
                  `${ADMIN_CONTACTS}/${(row.original as { id: string }).id}`,
                )
              }
              className="py-2 border-slate-800 hover:bg-gray-50"
            >
              <CardHeader className="py-2">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-lg font-semibold text-gray-800 ">
                    {NameFormatter(
                      (row.original as { firstName: string }).firstName,
                      (row.original as { lastName: string }).lastName,
                    )}
                  </h1>
                  <button className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100">
                    <EllipsisVertical size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p>{(row.original as { phone: string }).phone}</p>
                  <p>
                    {(row.original as { contactStatus: string }).contactStatus}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                {/* For the labels */}
                {(
                  row.original as { labels: { label: string; color: string }[] }
                )?.labels?.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <LabelStack
                      labels={
                        (
                          row.original as {
                            labels: { name: string; color: string }[];
                          }
                        ).labels
                      }
                      maxLabelsAmount={5}
                    />
                  </div>
                ) : (
                  <p className="py-2 text-gray-500">
                    No Labels have been added
                  </p>
                )}
                {/* For the description */}
              </CardContent>
              <CardFooter className="flex items-center py-0 align-middle border-t">
                {/* For the last Modified Date */}
                <div className="flex items-center justify-between w-full h-full gap-2 py-3">
                  <p className="text-gray-500 ">
                    Last Modified:{' '}
                    {(row.original as { updatedAt: string })?.updatedAt
                      ? formatDate(
                          (row.original as { updatedAt: string }).updatedAt,
                        )
                      : 'N/A'}
                  </p>
                  {/* Assigned to */}
                  <div className="flex items-center capitalize gap-x-2">
                    {(row.original as { assignedTo: string }).assignedTo &&
                    (row.original as { assignedTo: string }).assignedTo.length >
                      0 ? (
                      <AvatarStack
                        avatars={
                          (
                            row.original as {
                              assignedTo: { name: string; photo: string }[];
                            }
                          ).assignedTo
                        }
                        spacing={'sm'}
                        maxAvatarsAmount={3}
                      />
                    ) : (
                      <p>No Assigned Member</p>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </motion.div>
      )}
    </>
  );
}

// A ViewsComponent to toggle between list/table view to Card-grid view
function ViewsComponent({
  setView,
  view,
}: {
  setView: Function;
  view: 'list' | 'grid';
}) {
  return (
    <div className="justify-between mb-10 md:flex">
      <AddContactsModal />
      <motion.div className="flex w-full space-x-4 md:w-fit">
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className={`flex space-x-2 items-center justify-center text-sm md:text-base shadow-main_DarkBlueHover/10 rounded-md shadow-md py-2 px-5 w-1/2 md:w-fit ${
            view === 'list'
              ? 'bg-[#17275B] text-white'
              : 'bg-white text-[#17275B] border border-[#17275B]'
          }`}
          onClick={() => setView('list')}
        >
          <List size={16} />
          <p className="hidden md:flex pt-1">List View</p>
          <p className="flex md:hidden pt-1">List</p>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className={`flex space-x-2 items-center justify-center text-sm md:text-base shadow-main_DarkBlueHover/10 rounded-md shadow-md py-2 px-5 w-1/2 md:w-fit ${
            view === 'grid'
              ? 'bg-[#17275B] text-white'
              : 'bg-white text-[#17275B] border border-[#17275B]'
          }`}
          onClick={() => setView('grid')}
        >
          <GripIcon size={16} />
          <p className="hidden md:flex pt-1">Gallery View</p>
          <p className="flex md:hidden pt-1">Gallery</p>
        </motion.button>
      </motion.div>
    </div>
  );
}
