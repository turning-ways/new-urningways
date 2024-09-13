import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../axios";

export interface IMemberNotes {
  id: string;
  note: string;
  isEdited: boolean;
  recordedBy?: {
    firstName: string;
    lastName: string;
  };
  updatedAt: string;
}

const fetchNotes = async ({
  churchId,
  memberId,
}: {
  churchId: string;
  memberId: string;
}): Promise<IMemberNotes[]> => {
  const { data } = await api.get(
    `/members/${churchId}/member/${memberId}/notes`
  );
  return data.data as IMemberNotes[];
};

const addNote = async ({
  churchId,
  memberId,
  Idata,
}: {
  churchId: string;
  memberId: string;
  Idata: { note: string; recordedBy: string };
}) => {
  const { data } = await api.post(
    `/members/${churchId}/member/${memberId}/notes`,
    {
      ...Idata,
    }
  );

  return data.data;
};

const updateNote = async ({
  churchId,
  memberId,
  noteId,
  Idata,
}: {
  churchId: string;
  memberId: string;
  noteId: string;
  Idata: { note: string };
}) => {
  const { data } = await api.patch(
    `/members/${churchId}/member/${memberId}/notes/${noteId}`,
    {
      ...Idata,
    }
  );

  return data.data;
};

const deleteNote = async ({
  churchId,
  memberId,
  noteId,
}: {
  churchId: string;
  memberId: string;
  noteId: string;
}) => {
  const { data } = await api.delete(
    `/members/${churchId}/member/${memberId}/notes/${noteId}`
  );
  return data.data;
};

export const useGetMemberNotes = ({
  churchId,
  memberId,
}: {
  churchId: string;
  memberId: string;
}) => {
  return useQuery({
    queryKey: ["notes", { memberId, churchId }],
    queryFn: () => fetchNotes({ churchId, memberId }),
    enabled: !!churchId && !!memberId,
  });
};

export const useAddMemberNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      memberId,
      firstName,
      lastName,
      data,
    }: {
      churchId: string;
      memberId: string;
      firstName: string;
      lastName: string;
      data: { note: string; recordedBy: string };
    }) =>
      addNote({
        churchId: churchId ?? "",
        memberId: memberId ?? "",
        Idata: data,
      }),
    onMutate: async ({ data, churchId, memberId, firstName, lastName }) => {
      await queryClient.cancelQueries({
        queryKey: ["notes", { memberId, churchId }],
      });

      // Snapshot of the previous value
      const previousNotes = queryClient.getQueryData([
        "notes",
        { memberId, churchId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["notes", { memberId, churchId }],
        (old: any) => [
          ...old,
          {
            id: Math.random().toString(),
            note: data.note,
            isEdited: false,
            recordedBy: {
              firstName,
              lastName,
            },
            updatedAt: new Date().toISOString(),
          },
        ]
      );

      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      const memberId = newNote.memberId;
      const churchId = newNote.churchId;
      queryClient.setQueryData(
        ["notes", { memberId, churchId }],
        context?.previousNotes
      );
    },
    onSettled: (_, err, { churchId, memberId }) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { memberId, churchId }],
      });
    },
  });
};

export const useUpdateMemberNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      memberId,
      noteId,
      data,
    }: {
      churchId: string;
      memberId: string;
      noteId: string;
      data: { note: string };
    }) =>
      updateNote({
        churchId: churchId ?? "",
        memberId: memberId ?? "",
        noteId: noteId ?? "",
        Idata: data,
      }),
    onMutate: async ({ data, churchId, memberId, noteId }) => {
      await queryClient.cancelQueries({
        queryKey: ["notes", { memberId, churchId }],
      });

      // Snapshot of the previous value
      const previousNotes = queryClient.getQueryData([
        "notes",
        { memberId, churchId },
      ]);

      // Update the cache
      queryClient.setQueryData(["notes", { memberId, churchId }], (old: any) =>
        old.map((note: IMemberNotes) =>
          note.id === noteId
            ? {
                ...note,
                note: data.note,
                isEdited: true,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );

      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      const memberId = newNote.memberId;
      const churchId = newNote.churchId;
      queryClient.setQueryData(
        ["notes", { memberId, churchId }],
        context?.previousNotes
      );
    },
    onSettled: (_, err, { churchId, memberId }) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { memberId, churchId }],
      });
    },
  });
};

export const useDeleteMemberNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      memberId,
      noteId,
    }: {
      churchId: string;
      memberId: string;
      noteId: string;
    }) =>
      deleteNote({
        churchId: churchId ?? "",
        memberId: memberId ?? "",
        noteId: noteId ?? "",
      }),
    onMutate: async ({ churchId, memberId, noteId }) => {
      await queryClient.cancelQueries({
        queryKey: ["notes", { memberId, churchId }],
      });

      // Snapshot of the previous value
      const previousNotes = queryClient.getQueryData([
        "notes",
        { memberId, churchId },
      ]);

      // Update the cache
      queryClient.setQueryData(["notes", { memberId, churchId }], (old: any) =>
        old.filter((note: IMemberNotes) => note.id !== noteId)
      );

      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      const memberId = newNote.memberId;
      const churchId = newNote.churchId;
      queryClient.setQueryData(
        ["notes", { memberId, churchId }],
        context?.previousNotes
      );
    },
    onSettled: (_, err, { churchId, memberId }) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { memberId, churchId }],
      });
    },
  });
};
