import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dobFormatter } from '@/lib/utils/date-formatter';
import { DashMember } from '@/types/dashboard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MemberTable({
  data,
  churchId,
}: {
  data: DashMember[];
  churchId: string;
}) {
  return (
    <>
      <div className="w-full h-full lg:flex justify-center items-center hidden font-sans">
        <Table className="border border-gray-200 w-full !rounded-md">
          <TableCaption>A Quick Look at Members</TableCaption>
          <TableHeader className="bg-gray-100 rounded-md">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Marital Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{`${member.firstName} ${
                  member?.lastName || ''
                }`}</TableCell>
                <TableCell>{member.age}</TableCell>
                <TableCell>{member.gender}</TableCell>
                <TableCell>
                  {dobFormatter(parseInt(member.dateOfBirth))}
                </TableCell>
                <TableCell>{member.phone || 'N/A'}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.maritalStatus || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Mobile Version of the Table */}
      <div className="w-full py-4 lg:hidden flex flex-col divide-y font-sans">
        <h1 className="text-start py-2 text-lg font-bold">Members</h1>
        {data.map((member, index) => (
          <Link
            href={`/admin/${churchId}/directory/${member.id}`}
            key={index}
            className="flex justify-between items-center w-full py-4 hover:bg-gray-100 px-3"
          >
            <div className="w-full">
              <div className="w-full text-slate-500">{`${member.firstName} ${
                member?.lastName || ''
              }`}</div>
              <div className="w-1/6">{member.phone}</div>
            </div>
            <ChevronRight size={24} />
          </Link>
        ))}
      </div>
    </>
  );
}
