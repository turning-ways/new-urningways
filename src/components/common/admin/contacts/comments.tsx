import { Header } from './header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NameFormatter, ProfileNameFormatter } from '@/lib/utils/capitalize';
import { AutosizeTextarea } from '@/components/ui/text-area';
import {
  PencilIcon,
  PencilOff,
  SendHorizontalIcon,
  Trash2,
} from 'lucide-react';
import { formatTime } from '@/lib/utils/date-formatter';
import { useState } from 'react';
import {
  useAddComment,
  useDeleteComment,
  useGetComments,
  useUpdateComment,
} from '@/lib/client/useContact';
import { type ContactNotes } from '@/lib/client/contactApiFunction';
import { toast } from 'sonner';
import { LoadingCircle } from '@/components/ui/loading-circle';

interface CommentProps {
  isLoading?: boolean;
  authContact?: any;
  contactId?: string;
}

export default function Comments({ authContact, contactId }: CommentProps) {
  const { data } = useGetComments({
    churchId: authContact?.churchId ?? '',
    contactId: contactId ?? '',
  });
  const addComment = useAddComment();
  const [value, setValue] = useState('');

  async function submit() {
    try {
      await addComment.mutateAsync(
        {
          churchId: authContact?.churchId,
          contactId: contactId ?? '',
          firstName: authContact?.firstName,
          lastName: authContact?.lastName,
          photo: authContact?.photo ?? '',
          Idata: {
            note: value,
            recordedById: authContact?.id,
          },
        },
        {
          onSuccess: () => {
            toast.success('Comment successfully added');
            setValue(''); // Reset the value on success
          },
          onError: (error: any) => {
            toast.error('An Error Occurred when adding your Comment');
            console.error('Error:', error);
          },
        },
      );
    } catch (e: any) {
      toast.error('An Error Occured when add your Comment');
      console.log('Error');
    }
  }

  return (
    <div className="flex flex-col gap-3 mt-2">
      <Header title="Comments" size={'sm'} headerColor="primary" />
      <div className="flex mb-2">
        <AutosizeTextarea
          minHeight={30}
          value={value}
          placeholder="Type your comment.."
          maxHeight={200}
          onChange={(e) => setValue(e?.target?.value)}
          className="!rounded-s-md focus-visible:!ring-0 *:outline-none"
        />
        <div
          onClick={submit}
          className="flex px-3 py-2 bg-main_DarkBlue text-white"
        >
          {addComment.isPending ? (
            <LoadingCircle />
          ) : (
            <SendHorizontalIcon size={18} />
          )}
        </div>
      </div>
      {data && data?.length > 0 ? (
        <>
          {data.map((note, index) => (
            <Comment
              key={index}
              note={note as ContactNotes}
              contactId={contactId ?? ''}
              churchId={authContact?.churchId ?? ''}
            />
          ))}
        </>
      ) : (
        <div className="flex w-full justify-center text-lg text-textDark">
          <p>No Comments so far</p>
        </div>
      )}
    </div>
  );
}

// Comment Component
function Comment({
  churchId,
  note,
  contactId,
}: {
  churchId: string;
  note: ContactNotes;
  contactId: string;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [noteValue, setNoteValue] = useState<string>(note.note || '');
  const updateMutation = useUpdateComment();
  const deleteMutation = useDeleteComment();

  async function update() {
    try {
      await updateMutation.mutateAsync(
        {
          churchId: churchId,
          contactId: contactId,
          noteId: note.id,
          note: noteValue,
        },
        {
          onSuccess: () => {
            toast.success('Comment successfully updated');
            setEditMode(false); // Reset edit mode on success
          },
          onError: (error: any) => {
            toast.error('An Error Occurred when updating your Comment');
            console.error('Error:', error);
          },
        },
      );
    } catch (e: any) {
      // This catch block can be kept for additional safety, but should generally not be necessary
      toast.error('An Error Occurred when updating your Comment');
      console.error('Error:', e);
    }
  }

  async function deleteNote() {
    try {
      await deleteMutation.mutateAsync(
        {
          churchId: churchId,
          contactId: contactId,
          noteId: note.id,
        },
        {
          onSuccess: () => {
            toast.success('Comment successfully deleted');
          },
          onError: (error: any) => {
            toast.error('An Error Occurred when deleting your Comment');
            console.error('Error:', error);
          },
        },
      );
    } catch (e: any) {
      // This catch block can be kept for additional safety, but should generally not be necessary
      toast.error('An Error Occurred when deleting your Comment');
      console.error('Error:', e);
    }
  }

  return (
    <div className="flex w-full gap-3">
      <Avatar>
        <AvatarImage src={note?.recordedBy?.photo} className="object-cover" />
        <AvatarFallback>
          {ProfileNameFormatter(
            note?.recordedBy?.firstName,
            note?.recordedBy?.lastName,
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-1 justify-between">
          <span className="font-semibold">
            {NameFormatter(
              note?.recordedBy?.firstName,
              note?.recordedBy?.lastName,
            )}
          </span>
          <span className="text-gray-500 text-xs pr-2">
            {formatTime(note?.updatedAt)}
          </span>
        </div>
        <div className="flex h-fit items-center gap-3">
          <AutosizeTextarea
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            isEdited={note?.isEdited}
            disabled={!editMode}
          />
          {editMode && <SendHorizontalIcon size={18} onClick={update} />}
        </div>
        <div className="flex justify-end">
          <div className="flex justify-end gap-4">
            <button
              className="w-fit py-1 text-sm"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? (
                <PencilOff className="text-gray-500 size-4 hover:text-main_DarkBlue" />
              ) : (
                <PencilIcon className="text-gray-500 size-4 hover:text-main_DarkBlue" />
              )}
            </button>
            <button onClick={deleteNote} className="w-fit py-1 text-sm">
              <Trash2 className="text-red-400 size-4 hover:text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
