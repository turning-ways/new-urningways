import { AvatarStack } from '@/components/ui/avatarStack';
import { Header } from './header';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Plus, X } from 'lucide-react';
import { useMembers } from '@/lib/client/useMembers';
import { useContactContext } from '@/context/contact-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NameFormatter, ProfileNameFormatter } from '@/lib/utils/capitalize';
import { Key } from 'react';
import {
  useAssignMemberToContact,
  useGetAssignedToContacts,
  useUnassignMemberFromContact,
} from '@/lib/client/useContact';
import { Skeleton } from '@/components/ui/skeleton';
import { StringOrTemplateHeader } from '@tanstack/react-table';
import { toast } from 'sonner';

interface AssignedToProps {
  isLoading?: boolean;
  initialData?: Array<{
    id: string;
    name: string;
    photo: string;
  }>;
  authContact?: any;
  contactId?: string;
}

export default function AssignedTo({
  isLoading,
  authContact,
  contactId,
}: AssignedToProps) {
  const { data } = useGetAssignedToContacts({
    churchId: authContact?.churchId ?? '',
    contactId: contactId ?? '',
  });
  return (
    <div className="flex flex-col gap-3 mt-2">
      <Header title="Assigned To" size={'sm'} headerColor="primary" />
      {isLoading ? (
        <AvatarStackLoader />
      ) : (
        <div className="flex items-center gap-4">
          {data?.length > 0 ? (
            <>
              <AvatarStack
                avatars={data}
                maxAvatarsAmount={10}
                spacing={'xl'}
                avatarSize="size-14"
              />
              <AssignContactToMember
                churchId={authContact?.churchId}
                contactId={contactId ?? ''}
                assignedToMembers={data}
              />
            </>
          ) : (
            <>
              <div className="text-gray-500 text-lg">No one assigned</div>
              <AssignContactToMember
                churchId={authContact?.churchId}
                contactId={contactId ?? ''}
                assignedToMembers={data}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function AssignContactToMember({
  churchId,
  contactId,
  assignedToMembers,
}: {
  churchId: string;
  contactId: string;
  assignedToMembers: Array<{
    id: string;
    name: string;
    photo: string;
  }>;
}) {
  const { data } = useMembers({ churchId: churchId ?? '' });
  const assignedToMutation = useAssignMemberToContact();
  const unassign = useUnassignMemberFromContact();
  // console.log(data, assignedToMembers);
  // Find members that are not assigned by ensuring their `id` is not in `assignedToMembers`.
  const nonAssignedMembers = data?.filter(
    (member: { id: string }) =>
      !assignedToMembers.find((contact) => contact.id === member.id),
  );

  // Filter assigned contacts correctly by matching the member's `id` with `assignedToMembers`.
  const assignedContacts = data?.filter((member: { id: string }) =>
    assignedToMembers.find((contact) => contact.id === member.id),
  );

  async function handleAssignMemberToContact(
    memberId: string,
    name: string,
    photo: string,
  ) {
    try {
      await assignedToMutation.mutateAsync(
        {
          churchId: churchId,
          contactId: contactId,
          memberId: memberId,
          Idata: {
            name: name,
            photo: photo,
          },
        },
        {
          onSuccess: () => {
            toast.success('Member successfully assigned to contact');
          },
          onError: (error: any) => {
            toast.error('Error assigning member to contact');
            console.error('Error assigning member:', error);
          },
        },
      );
    } catch (error: any) {
      // Additional safety catch block
      toast.error('Error assigning member to contact');
      // console.error('Error assigning member:', error);
    }
  }

  async function handleUnassignMemberToContact(memberId: string) {
    try {
      await unassign.mutateAsync(
        {
          churchId,
          contactId,
          memberId,
        },
        {
          onSuccess: () => {
            toast.success('Member successfully unassigned from contact');
          },
          onError: (error: any) => {
            toast.error('Error unassigning member from contact');
            // console.error('Error unassigning member:', error);
          },
        },
      );
    } catch (error: any) {
      // Additional safety catch block
      toast.error('Error unassigning member from contact');
      // console.error('Error unassigning member:', error);
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <button className="bg-main_DarkBlue hover:bg-main_DarkBlueHover text-white rounded-full size-12 shadow-md max-w-md py-1 px-3">
          <Plus className="text-white" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-2xl w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="action">Assigned To</label>

          {/* Display assigned contacts */}
          {assignedContacts?.length > 0 ? (
            assignedContacts.map(
              (member: {
                id: string | null | undefined;
                photo: string | undefined;
                firstName: string | undefined;
                lastName: string | undefined;
              }) => (
                <div
                  className="flex items-center gap-4 py-1.5 px-2 rounded-md hover:bg-gray-50"
                  key={member.id}
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      src={member.photo}
                      alt={member.firstName}
                      className="object-cover size-8"
                    />
                    <AvatarFallback>
                      {ProfileNameFormatter(member.firstName, member.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex justify-between w-full gap-2  px-2">
                    <span>
                      {NameFormatter(member.firstName, member.lastName)}
                    </span>
                    <button
                      onClick={() =>
                        handleUnassignMemberToContact(member?.id ?? '')
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ),
            )
          ) : (
            <div className="text-gray-500">No members assigned yet</div>
          )}

          <hr className="border-gray-200" />

          {/* Display non-assigned members */}
          <label htmlFor="action">Assign to Contact</label>

          {nonAssignedMembers?.length > 0 ? (
            nonAssignedMembers.map(
              (member: {
                id: string | null | undefined;
                firstName: string | undefined;
                lastName: string | undefined;
                photo: string | undefined;
              }) => (
                <div
                  onClick={() =>
                    handleAssignMemberToContact(
                      member.id ?? '',
                      `${member.firstName} ${member.lastName}`,
                      member.photo ?? '',
                    )
                  }
                  className="flex items-center gap-4 py-1.5 px-2 rounded-md hover:bg-gray-50 cursor-pointer"
                  key={member.id}
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      src={member.photo}
                      alt={member.firstName}
                      className="object-cover size-8"
                    />
                    <AvatarFallback>
                      {ProfileNameFormatter(member.firstName, member.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {NameFormatter(member.firstName, member.lastName)}
                  </span>
                </div>
              ),
            )
          ) : (
            <div className="text-gray-500">No members available to assign</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

const AvatarStackLoader = ({ visibleCount = 5 }) => {
  return (
    <div className="flex -space-x-4">
      {/* Generate skeletons for avatars */}
      {Array.from({ length: visibleCount }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-14 w-14 rounded-full bg-gray-200 border-2 border-white"
        />
      ))}
    </div>
  );
};
