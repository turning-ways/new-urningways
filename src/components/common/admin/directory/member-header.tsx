'use client';
import {
  ChevronLeft,
  VerifiedIcon,
  Phone,
  MessageCircleMoreIcon,
  Mail,
  SquarePen,
  Trash2,
  SendHorizontalIcon,
  PencilIcon,
  PencilOff,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AContact, IMember } from '@/types/member';
import { ProfileNameFormatter, NameFormatter } from '@/lib/utils/capitalize';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from '@/components/ui/modal';
import { AutosizeTextarea } from '@/components/ui/text-area';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDeleteMember } from '@/lib/client/useMember';
import { LoadingCircle } from '@/components/ui/loading-circle';
import { toast } from 'sonner';
import {
  IMemberNotes,
  useAddMemberNote,
  useDeleteMemberNote,
  useGetMemberNotes,
  useUpdateMemberNote,
} from '@/lib/client/useMemberNote';
import { formatTime } from '@/lib/utils/date-formatter';
import { useEffect, useState } from 'react';

export default function MemberHeader({
  member,
  churchId,
  editor,
}: {
  member: IMember | undefined;
  churchId: string;
  editor: any;
}) {
  return (
    <div className="flex justify-center lg:justify-between mt-2 items-center relative flex-col lg:flex-row font-sans">
      <div className="flex gap-8 items-center flex-col lg:flex-row">
        <Link
          className="bg-blue-50 rounded-lg p-2 w-fit cursor-pointer h-fit self-start hover:bg-blue-100 lg:self-auto"
          href={`/admin/${churchId}/directory/`}
        >
          <ChevronLeft className="text-main_DarkBlue size-6" />
        </Link>
        <div className="flex gap-6 items-center justify-center flex-col lg:flex-row">
          <div className="relative">
            <Avatar className="size-36 lg:size-24 relative">
              <AvatarImage
                src={member?.photo?.toString() ?? undefined}
                alt="Profile Picture"
                className="object-cover"
              />
              <AvatarFallback className="bg-red-200 text-red-500 text-3xl pt-1 font-semibold">
                {ProfileNameFormatter(member?.firstName, member?.lastName)}
              </AvatarFallback>
            </Avatar>
            {member?.verificationStatus !== 'UNVERIFIED' && (
              <div className="absolute bottom-1 right-1">
                <VerifiedIcon
                  fill={`${
                    member?.verificationStatus === 'VERIFIED' ? 'green' : 'gray'
                  }`}
                  color="white"
                  className="size-8 lg:size-6"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 mb-2">
            <div className="flex gap-2 items-center justify-center lg:justify-normal">
              <h2 className="font-semibold text-2xl text-slate-800 px-2">
                {NameFormatter(member?.firstName, member?.lastName)}
              </h2>
              <div className="text-base px-2 py-1 rounded-lg bg-main_secondary text-white">
                {member?.role[0]?.name}
              </div>
            </div>
            <div className="flex gap-2 md:gap-3 items-center">
              <div className="flex gap-1 md:gap-2 items-center hover:bg-slate-100 p-1 px-2 rounded-md">
                <Phone
                  className="size-4 md:size-5  text-gray-600"
                  strokeWidth={1}
                />{' '}
                Call
              </div>
              <div className="flex gap-1 md:gap-2 items-center hover:bg-slate-100 p-1 px-2 rounded-md">
                <MessageCircleMoreIcon
                  className="size-4 md:size-5 text-gray-600"
                  strokeWidth={1}
                />{' '}
                Text
              </div>
              <div className="flex gap-1 md:gap-2 items-center hover:bg-slate-100 p-1 px-2 rounded-md">
                <Mail
                  className="size-4 md:size-5 text-gray-600"
                  strokeWidth={1}
                />{' '}
                Email
              </div>
              <Note memberId={member?.id} churchId={churchId} editor={editor} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-center w-3/4 lg:w-fit">
        <Link
          href={`/admin/${churchId}/directory/${member?.id}/edit`}
          className="bg-white text-center w-full text-gray-600 border border-gray-400 px-3 lg:px-6 py-3 rounded-lg font-medium h-fit whitespace-nowrap"
        >
          Edit Profile
        </Link>
        <DeleteMemberDialog memberId={member?.id} churchId={churchId} />
      </div>
    </div>
  );
}

const Comment: React.FC<{
  note: IMemberNotes;
  churchId: string | undefined;
  memberId: string | undefined;
}> = ({ note, churchId, memberId }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [noteValue, setNoteValue] = useState<string>(note?.note || '');
  const updateNote = useUpdateMemberNote();
  const deleteNote = useDeleteMemberNote();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (editMode && e.key === 'Enter') {
      e.preventDefault(); // Prevents the default behavior of adding a new line
      updateNote.mutate({
        churchId: churchId ?? '',
        data: {
          note: noteValue,
        },
        memberId: memberId ?? '',
        noteId: note.id,
      });

      setEditMode(false); // Optionally exit edit mode after Enter
    }
  };

  function handleDelete() {
    deleteNote.mutate({
      churchId: churchId ?? '',
      memberId: memberId ?? '',
      noteId: note?.id,
    });
  }

  useEffect(() => {
    if (deleteNote.isSuccess) {
      toast.success('Note deleted successfully');
    }
    if (deleteNote?.isError) {
      toast.error('An error occured, Try again later');
    }
  }, [deleteNote]);

  return (
    <div className="flex gap-2 items-start">
      <Avatar className="size-10">
        <AvatarFallback className="pt-1 ">
          {ProfileNameFormatter(
            note?.recordedBy?.firstName,
            note?.recordedBy?.lastName,
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-row w-full justify-between gap-1">
          <h2 className="font-semibold text-lg">
            {NameFormatter(
              note?.recordedBy?.firstName,
              note?.recordedBy?.lastName,
            )}
          </h2>
          <p className="text-sm text-gray-600">{formatTime(note?.updatedAt)}</p>
        </div>
        <AutosizeTextarea
          className="w-full no-scrollbar"
          minHeight={32}
          maxHeight={400}
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)} // Updates state on change
          isEdited={note?.isEdited}
          disabled={!editMode}
          onKeyDown={handleKeyDown} // Add the event handler here
        />
        <div className="flex justify-end gap-4">
          <button
            className="w-fit py-1 text-sm"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? (
              <PencilOff className="text-gray-500 size-5 hover:text-main_DarkBlue" />
            ) : (
              <PencilIcon className="text-gray-500 size-5 hover:text-main_DarkBlue" />
            )}
          </button>
          <button className="w-fit py-1 text-sm" onClick={handleDelete}>
            <Trash2 className="text-red-400 size-5 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

function Note({
  churchId,
  memberId,
  editor,
}: {
  memberId: string | undefined;
  churchId: string | undefined;
  editor: AContact;
}) {
  const [value, setValue] = useState('');
  const mutation = useAddMemberNote();
  const { data } = useGetMemberNotes({
    churchId: churchId ?? '',
    memberId: memberId ?? '',
  });

  function handleSubmit() {
    mutation.mutate({
      churchId: churchId ?? '',
      memberId: memberId ?? '',
      firstName: editor?.firstName,
      lastName: editor?.lastName,
      data: {
        note: value,
        recordedBy: editor?.id,
      },
    });
    setValue('');
  }

  const comments = data;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-1 md:gap-2 items-center hover:bg-slate-100 p-1 px-2 rounded-md">
          <SquarePen
            className="size-4 md:size-5 text-gray-600"
            strokeWidth={1}
          />{' '}
          Note
        </div>
      </DialogTrigger>
      <DialogContent
        position="br"
        shouldCloseButton={false}
        className="max-h-[600px] h-full min-h-[400px] "
      >
        <DialogTitle className="absolute">{''}</DialogTitle>
        <div className="flex flex-col gap-4 p-4 w-full h-full  overflow-hidden overscroll-none">
          <div className="flex justify-between w-full">
            <h1 className="font-sans text-2xl font-semibold">Comments</h1>
            <DialogClose asChild>
              <p className="text-lg cursor-pointer">
                <X />
              </p>
            </DialogClose>
          </div>
          <div className="flex flex-col gap-4 py-4 px-2 h-full overflow-auto">
            {comments?.map((comment, index) => (
              <Comment
                key={index}
                note={comment}
                memberId={memberId}
                churchId={churchId}
              />
            ))}
          </div>
          <div className="flex gap-2 items-center w-full mt-3 ">
            <AutosizeTextarea
              placeholder="Add a comment"
              className="w-full"
              minHeight={32}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <SendHorizontalIcon
              onClick={handleSubmit}
              className="size-5 text-main_DarkBlue cursor-pointer"
              strokeWidth={2}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DeleteMemberDialog({
  memberId,
  churchId,
}: {
  memberId?: string | undefined;
  churchId?: string | undefined;
}) {
  const router = useRouter();
  const mutation = useDeleteMember();
  const deleteMember = async () => {
    try {
      const result = await mutation.mutateAsync({
        churchId,
        memberId,
      });
      toast.success('Member deleted successfully');
      router.replace(`/admin/${churchId}/directory/`);
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.code === 403) {
        toast.error('You do not have permission to delete this member');
        return;
      }
      toast.error('Failed to delete member');
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 className="text-red-500 size-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="p-4 max-w-md">
        <DialogHeader className="text-lg font-sans font-semibold">
          Are you sure you want to delete this member?
        </DialogHeader>
        <div className="flex gap-2 items-center">
          <p>
            This action cannot be undone. Deleting this member will remove all
            associated data.
          </p>
        </div>
        <DialogFooter>
          <Button
            disabled={mutation.isPending}
            onClick={deleteMember}
            className="bg-red-600 hover:bg-red-400 mr-3"
          >
            {mutation.isPending ? <LoadingCircle /> : 'Delete'}
          </Button>

          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
