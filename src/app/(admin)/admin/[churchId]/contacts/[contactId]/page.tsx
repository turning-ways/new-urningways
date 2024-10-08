'use client';

import Actions from '@/components/common/admin/contacts/actions';
import AssignedTo from '@/components/common/admin/contacts/assignedTo';
import Comments from '@/components/common/admin/contacts/comments';
import ContactStatus from '@/components/common/admin/contacts/contactStatus';
import EditContactsModal from '@/components/common/admin/contacts/editContactModal';
import { Header } from '@/components/common/admin/contacts/header';
import Labels from '@/components/common/admin/contacts/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useContactContext } from '@/context/contact-context';
import { useGetContact } from '@/lib/client/useContact';
import { NameFormatter, textCapitalizer } from '@/lib/utils/capitalize';
import { formatDate, formatDateToCustom } from '@/lib/utils/date-formatter';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Page({
  params,
}: {
  params: { churchId: string; contactId: string };
}) {
  const { contactId, churchId } = params;
  const { contacts: authContact } = useContactContext();
  const { data, isLoading } = useGetContact({
    churchId: authContact?.churchId ?? '',
    contactId,
  });

  const generateFields = (gdata: any) => {
    return [
      {
        label: 'Contact Type',
        value: gdata?.contactType ? textCapitalizer(gdata.contactType) : 'N/A',
      },
      {
        label: 'Maturity',
        value: gdata?.maturityLevel
          ? textCapitalizer(gdata.maturityLevel)
          : 'N/A',
      },
      {
        label: 'Phone Number',
        value: gdata?.phone || 'N/A',
      },
      {
        label: 'Email',
        value: gdata?.email || 'N/A',
      },
      {
        label: 'Date of Birth',
        value: gdata?.dateOfBirth ? formatDate(gdata.dateOfBirth) : 'N/A',
      },
      {
        label: 'Gender',
        value: gdata?.gender ? textCapitalizer(gdata.gender) : 'N/A',
      },
      {
        label: 'Address',
        value: gdata?.address || 'N/A',
      },
    ];
  };

  // Example usage
  const fields = generateFields(data);

  return (
    <div className="flex flex-col w-full h-full py-4  overflow-auto px-2">
      <div id="header" className="flex flex-col gap-4">
        <Link
          className="bg-blue-50 rounded-lg p-2 w-fit cursor-pointer h-fit self-start hover:bg-blue-100 lg:self-auto"
          href={`/admin/${churchId}/contacts`}
        >
          <ChevronLeft className="text-main_DarkBlue size-6" />
        </Link>
        <div className="flex justify-between items-center">
          <Header
            title="Contact Information"
            size={'sm'}
            headerColor="primary"
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          {!isLoading ? (
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold text-main_DarkBlue">
                {NameFormatter(data?.firstName, data?.lastName)}
              </div>
              <p className="text-sm text-textDark">
                Created: {formatDateToCustom(data?.createdAt ?? '')} | Last
                Modified: {formatDateToCustom(data?.updatedAt ?? '')}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full lg:w-1/2">
              <Skeleton className="h-6 w-1/3 bg-gray-200 rounded-md" />
              <Skeleton className="h-4 w-2/3 bg-gray-200 rounded-md" />
            </div>
          )}
          <div className="flex lg:justify-between items-center gap-4">
            {/* <button
              className={` text-white flex items-center py-2 px-6 rounded-lg space-x-1 min-w-20 bg-red-400`}>
              <span className="flex gap-2 items-center">
                <span>{data?.contactStatus}</span>
                <ChevronDown className="text-[10px]" />
              </span>
            </button> */}
            {isLoading ? (
              <Skeleton className="h-10 w-24 bg-gray-200 rounded-md" />
            ) : (
              <ContactStatus contact={data} authContact={authContact} />
            )}
            {!isLoading ? (
              <EditContactsModal contact={data} />
            ) : (
              <button className="text-main_DarkBlue border border-main_DarkBlue hover:bg-gray-100  rounded-lg py-2 px-6">
                Edit Contact
              </button>
            )}
          </div>
        </div>
        {isLoading ? (
          <GridSkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {fields.map((field, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 ${
                  fields.length - 1 === index ? 'md:col-span-2' : ''
                }`}
              >
                <h4 className=" text-textDark">{field.label}</h4>
                <div className="text-lg border border-gray-200 rounded-lg p-2">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4  pt-3">
          <Labels authContact={authContact} contactId={contactId} />
          <Actions
            className="max-w-full"
            authContact={authContact}
            contactId={contactId}
          />
        </div>
        <AssignedTo
          authContact={authContact}
          contactId={contactId}
          isLoading={isLoading}
        />
        <Comments
          authContact={authContact}
          contactId={contactId}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

const GridSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={`flex flex-col gap-2 ${
            index === 5 ? 'md:col-span-2' : ''
          }`}
        >
          <Skeleton className="h-4 w-1/2 bg-gray-200 rounded-md" />
          <div className="text-lg border border-gray-200 rounded-lg p-2">
            <Skeleton className="h-10 bg-gray-200 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
