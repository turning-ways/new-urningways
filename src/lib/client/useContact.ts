import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addContact,
  addContactLabel,
  getContact,
  getContactLabels,
  updateContact,
  removeContactLabel,
  addContactAction,
  getContactActions,
  removeContactAction,
  updateContactActionStatus,
  getAssignedToContacts,
  assignMemberToContact,
  unassignMemberFromContact,
  addContactNote,
  getContactNotes,
  updateContactNote,
  updateContactStatus,
  deleteContactNote,
} from "./contactApiFunction";

export const useAddContact = ({ churchId }: { churchId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contact }: { contact: any }) =>
      addContact({ churchId, contact }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["members", churchId],
      });
    },
  });
};

export const useGetContact = ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  return useQuery({
    queryKey: ["contact", { contactId, churchId }],
    queryFn: () => getContact({ churchId, contactId }),
    enabled: !!churchId && !!contactId,
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ churchId, contactId, Idata }: any) =>
      updateContact({ churchId, contactId, contact: Idata }),
    onMutate: async ({ churchId, contactId, Idata }) => {
      await queryClient.cancelQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "contact",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["contact", { churchId, contactId }],
        (old: any) => {
          return { ...old, ...Idata };
        }
      );

      // Return the previous data
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "contact",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["members", churchId],
      });
    },
  });
};

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ churchId, contactId, Idata }: any) =>
      updateContactStatus({ churchId, contactId, status: Idata.contactStatus }),
    onMutate: async ({ churchId, contactId, Idata }) => {
      await queryClient.cancelQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "contact",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["contact", { churchId, contactId }],
        (old: any) => {
          return { ...old, ...Idata };
        }
      );

      // Return the previous data
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "contact",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
    },
  });
};

export const useGetContactLabels = ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  return useQuery({
    queryKey: ["contactLabels", { churchId, contactId }],
    queryFn: () => getContactLabels({ churchId, contactId }),
    enabled: !!churchId && !!contactId,
  });
};

export const useAddContactLabel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      Idata,
      churchId,
      contactId,
    }: {
      Idata: { name: string; color: string };
      churchId: string;
      contactId: string;
    }) => addContactLabel({ churchId, contactId, Idata }),
    onMutate: async ({ Idata, churchId, contactId }) => {
      await queryClient.cancelQueries({
        queryKey: ["contactLabels", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "contactLabels",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["contactLabels", { churchId, contactId }],
        (old: any) => {
          return [
            ...old,
            {
              id: Math.random().toString(),
              name: Idata.name,
              color: Idata.color,
              createdAt: new Date().toISOString(),
            },
          ];
        }
      );

      // Return the previous data
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "contactLabels",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contactLabels", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useRemoveContactLabel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      contactId,
      labelId,
    }: {
      churchId: string;
      contactId: string;
      labelId: string;
    }) => removeContactLabel({ churchId, contactId, labelId }),
    onMutate: async ({ churchId, contactId, labelId }) => {
      await queryClient.cancelQueries({
        queryKey: ["contactLabels", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "contactLabels",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["contactLabels", { churchId, contactId }],
        (old: any) => {
          return old.filter((label: any) => label.id !== labelId);
        }
      );

      // Return the previous data
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "contactLabels",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contactLabels", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useGetContactActions = ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  return useQuery({
    queryKey: ["contactActions", { churchId, contactId }],
    queryFn: () => getContactActions({ churchId, contactId }),
    enabled: !!churchId && !!contactId,
  });
};

export const useAddContactAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      Idata,
      churchId,
      contactId,
    }: {
      Idata: { actionName: string };
      churchId: string;
      contactId: string;
    }) => addContactAction({ churchId, contactId, Idata }),
    onMutate: async ({ Idata, churchId, contactId }) => {
      await queryClient.cancelQueries({
        queryKey: ["contactActions", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "contactActions",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["contactActions", { churchId, contactId }],
        (old: any) => {
          return [
            ...old,
            {
              id: Math.random().toString(),
              actionName: Idata.actionName,
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ];
        }
      );

      // Return the previous data
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "contactActions",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contactActions", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useUpdateContactActionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      Idata,
      churchId,
      contactId,
      actionId,
    }: {
      Idata: { completed: boolean };
      churchId: string;
      contactId: string;
      actionId: string;
    }) => updateContactActionStatus({ churchId, contactId, actionId, Idata }),
    onMutate: async ({ Idata, churchId, contactId, actionId }) => {
      await queryClient.cancelQueries({
        queryKey: ["contactActions", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "contactActions",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["contactActions", { churchId, contactId }],
        (old: any) => {
          return old.map((action: any) => {
            if (action.id === actionId) {
              return { ...action, completed: Idata.completed };
            }
            return action;
          });
        }
      );

      // Return the previous data
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "contactActions",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contactActions", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useRemoveContactAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      contactId,
      actionId,
    }: {
      churchId: string;
      contactId: string;
      actionId: string;
    }) => removeContactAction({ churchId, contactId, actionId }),
    onMutate: async ({ churchId, contactId, actionId }) => {
      await queryClient.cancelQueries({
        queryKey: ["contactActions", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "contactActions",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["contactActions", { churchId, contactId }],
        (old: any) => {
          return old.filter((action: any) => action.id !== actionId);
        }
      );

      // Return the previous data
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "contactActions",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contactActions", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useGetAssignedToContacts = ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  return useQuery({
    queryKey: ["assignedToContacts", { churchId, contactId }],
    queryFn: () => getAssignedToContacts({ churchId, contactId }),
    enabled: !!churchId && !!contactId,
  });
};

export const useAssignMemberToContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      contactId,
      memberId,
      Idata,
    }: {
      churchId: string;
      contactId: string;
      memberId: string;
      Idata: { name: string; photo: string };
    }) => assignMemberToContact({ churchId, contactId, memberId }),
    onMutate: async ({ churchId, contactId, Idata }) => {
      await queryClient.cancelQueries({
        queryKey: ["assignedToContacts", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "assignedToContacts",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["assignedToContacts", { churchId, contactId }],
        (old: any) => {
          return [
            ...old,
            {
              id: Math.random().toString(),
              name: Idata.name,
              photo: Idata.photo,
              createdAt: new Date().toISOString(),
            },
          ];
        }
      );

      // Return the previous data
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "assignedToContacts",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["assignedToContacts", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useUnassignMemberFromContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      contactId,
      memberId,
    }: {
      churchId: string;
      contactId: string;
      memberId: string;
    }) => unassignMemberFromContact({ churchId, contactId, memberId }),
    onMutate: async ({ churchId, contactId, memberId }) => {
      await queryClient.cancelQueries({
        queryKey: ["assignedToContacts", { churchId, contactId }],
      });
      const previousData = queryClient.getQueryData([
        "assignedToContacts",
        { churchId, contactId },
      ]);

      // Update the cache
      queryClient.setQueryData(
        ["assignedToContacts", { churchId, contactId }],
        (old: any) => {
          return old.filter((assigned: any) => assigned.id !== memberId);
        }
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            "assignedToContacts",
            { churchId: variables?.churchId, contactId: variables?.contactId },
          ],
          context.previousData
        );
      }
    },
    onSettled: (_, error, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["assignedToContacts", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useGetComments = ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  return useQuery({
    queryKey: ["comments", { churchId, contactId }],
    queryFn: () => getContactNotes({ churchId, contactId }),
    enabled: !!churchId && !!contactId,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      contactId,
      firstName,
      lastName,
      photo,
      Idata,
    }: {
      churchId: string;
      contactId: string;
      firstName: string;
      lastName: string;
      photo: string;
      Idata: { note: string; recordedById: string };
    }) =>
      addContactNote({
        churchId,
        contactId,
        Idata,
      }),
    onMutate: async ({
      Idata,
      churchId,
      firstName,
      lastName,
      photo,
      contactId,
    }) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", { churchId, contactId }],
      });

      const previousComments = queryClient.getQueryData([
        "comments",
        { churchId, contactId },
      ]);

      // Update the Cache
      queryClient.setQueryData(
        ["comments", { churchId, contactId }],
        (old: any) => [
          ...old,
          {
            id: Math.random().toString(),
            note: Idata.note,
            isEdited: false,
            recordedBy: {
              firstName: firstName,
              lastName: lastName,
              photo: photo,
            },
            updatedAt: new Date().toISOString(),
          },
        ]
      );

      return { previousComments };
    },
    onError: (err, newNote, context) => {
      const memberId = newNote.contactId;
      const churchId = newNote.churchId;
      queryClient.setQueryData(
        ["comments", { memberId, churchId }],
        context?.previousComments
      );
    },
    onSettled: (_, err, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      contactId,
      noteId,
      note,
    }: {
      churchId: string;
      contactId: string;
      noteId: string;
      note: string;
    }) =>
      updateContactNote({
        churchId,
        contactId,
        noteId,
        Idata: {
          note,
        },
      }),
    onMutate: async ({ note, churchId, contactId, noteId }) => {
      await queryClient.cancelQueries({
        queryKey: ["notes", { contactId, churchId }],
      });

      const previousNotes = queryClient.getQueryData([
        "comments",
        { contactId, churchId },
      ]);

      // Update the Cache
      queryClient.setQueryData(
        ["comments", { contactId, churchId }],
        (old: any) =>
          old.map((n: any) => {
            if (n.id === noteId) {
              return { ...n, note, updatedAt: new Date().toISOString() };
            }
            return n;
          })
      );

      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      const contactId = newNote.contactId;
      const churchId = newNote.churchId;

      queryClient.setQueryData(
        ["comments", { contactId, churchId }],
        context?.previousNotes
      );
    },
    onSettled: (_, err, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      contactId,
      noteId,
    }: {
      churchId: string;
      contactId: string;
      noteId: string;
    }) => deleteContactNote({ churchId, contactId, noteId }),
    onMutate: async ({ churchId, contactId, noteId }) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", { churchId, contactId }],
      });

      const previousNotes = queryClient.getQueryData([
        "comments",
        { churchId, contactId },
      ]);

      queryClient.setQueryData(
        ["comments", { churchId, contactId }],
        (old: any) => old.filter((n: any) => n.id !== noteId)
      );

      return { previousNotes };
    },
    onError: (err, variables, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(
          [
            "comments",
            { churchId: variables.churchId, contactId: variables.contactId },
          ],
          context.previousNotes
        );
      }
    },
    onSettled: (_, err, { churchId, contactId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { churchId, contactId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["contact", { churchId, contactId }],
      });
    },
  });
};
