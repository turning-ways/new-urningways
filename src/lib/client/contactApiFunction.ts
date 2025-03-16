import api from '../axios';

const addContact = async ({
  churchId,
  contact,
}: {
  churchId: string;
  contact: any;
}) => {
  const { data } = await api.post(`/contacts/${churchId}/contact`, {
    ...contact,
  });
  return data.data;
};

const getContact = async ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  const { data } = await api.get(`/contacts/${churchId}/contact/${contactId}`);
  return data.data as Contact;
};

const updateContact = async ({
  churchId,
  contactId,
  contact,
}: {
  churchId: string;
  contactId: string;
  contact: any;
}) => {
  const { data } = await api.patch(
    `/contacts/${churchId}/contact/${contactId}`,
    {
      ...contact,
    },
  );
  return data.data;
};

const updateContactStatus = async ({
  churchId,
  contactId,
  status,
}: {
  churchId: string;
  contactId: string;
  status: 'NEW' | 'CONTACTED' | 'WON' | 'LOST';
}) => {
  const { data } = await api.patch(
    `/contacts/${churchId}/contact/${contactId}/status`,
    {
      contactStatus: status,
    },
  );
  return data.data;
};

const addContactLabel = async ({
  churchId,
  contactId,
  Idata,
}: {
  churchId: string;
  contactId: string;
  Idata: { name: string; color: string };
}) => {
  const { data } = await api.post(
    `/contacts/${churchId}/contact/${contactId}/label/`,
    {
      ...Idata,
    },
  );
  return data.data;
};

const getContactLabels = async ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  const { data } = await api.get(
    `/contacts/${churchId}/contact/${contactId}/labels`,
  );
  return data.data;
};

const removeContactLabel = async ({
  churchId,
  contactId,
  labelId,
}: {
  churchId: string;
  contactId: string;
  labelId: string;
}) => {
  const { data } = await api.delete(
    `/contacts/${churchId}/contact/${contactId}/label/${labelId}`,
  );
  return data.data;
};

const getContactActions = async ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  const { data } = await api.get(
    `/contacts/${churchId}/contact/${contactId}/actions`,
  );
  return data.data;
};

const addContactAction = async ({
  churchId,
  contactId,
  Idata,
}: {
  churchId: string;
  contactId: string;
  Idata: { actionName: string };
}) => {
  const { data } = await api.post(
    `/contacts/${churchId}/contact/${contactId}/action/`,
    {
      ...Idata,
    },
  );
  return data.data;
};

const updateContactActionStatus = async ({
  churchId,
  contactId,
  actionId,
  Idata,
}: {
  churchId: string;
  contactId: string;
  actionId: string;
  Idata: { completed: boolean };
}) => {
  const { data } = await api.patch(
    `/contacts/${churchId}/contact/${contactId}/action/${actionId}`,
    {
      ...Idata,
    },
  );
  return data.data;
};

const removeContactAction = async ({
  churchId,
  contactId,
  actionId,
}: {
  churchId: string;
  contactId: string;
  actionId: string;
}) => {
  const { data } = await api.delete(
    `/contacts/${churchId}/contact/${contactId}/action/${actionId}`,
  );
  return data.data;
};

const getAssignedToContacts = async ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  const { data } = await api.get(
    `/contacts/${churchId}/contact/${contactId}/assigned-to`,
  );
  return data.data;
};

const assignMemberToContact = async ({
  churchId,
  contactId,
  memberId,
}: {
  churchId: string;
  contactId: string;
  memberId: string;
}) => {
  const { data } = await api.post(
    `/contacts/${churchId}/contact/${contactId}/assigned-to/${memberId}`,
    { memberId },
  );
  return data.data;
};

const unassignMemberFromContact = async ({
  churchId,
  contactId,
  memberId,
}: {
  churchId: string;
  contactId: string;
  memberId: string;
}) => {
  const { data } = await api.delete(
    `/contacts/${churchId}/contact/${contactId}/assigned-to/${memberId}`,
  );
  return data.data;
};

const getContactNotes = async ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  const { data } = await api.get(
    `/contacts/${churchId}/contact/${contactId}/notes`,
  );
  return data.data as Array<ContactNotes>;
};

const addContactNote = async ({
  churchId,
  contactId,
  Idata,
}: {
  churchId: string;
  contactId: string;
  Idata: { note: string; recordedById: string };
}) => {
  const { data } = await api.post(
    `/contacts/${churchId}/contact/${contactId}/note`,
    {
      note: Idata.note,
      recordedBy: Idata.recordedById,
    },
  );
  return data.data;
};

const updateContactNote = async ({
  churchId,
  contactId,
  noteId,
  Idata,
}: {
  churchId: string;
  contactId: string;
  noteId: string;
  Idata: { note: string };
}) => {
  const { data } = await api.patch(
    `/contacts/${churchId}/contact/${contactId}/note/${noteId}`,
    {
      ...Idata,
    },
  );
  return data.data;
};

const deleteContactNote = async ({
  churchId,
  contactId,
  noteId,
}: {
  churchId: string;
  contactId: string;
  noteId: string;
}) => {
  const { data } = await api.delete(
    `/contacts/${churchId}/contact/${contactId}/note/${noteId}`,
  );
  return data.data;
};

export {
  addContact,
  getContact,
  updateContact,
  addContactLabel,
  getContactLabels,
  removeContactLabel,
  getContactActions,
  addContactAction,
  updateContactActionStatus,
  removeContactAction,
  getAssignedToContacts,
  assignMemberToContact,
  unassignMemberFromContact,
  getContactNotes,
  addContactNote,
  updateContactNote,
  deleteContactNote,
  updateContactStatus,
};
export type { ContactNotes, Contact };

interface ContactNotes {
  id: string;
  note: string;
  recordedBy: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  isEdited: boolean;
  updatedAt: string;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  dateOfBirth: Date | undefined;
  address: string;
  age: number | null;
  contactStatus: 'NEW' | 'CONTACTED' | 'WON' | 'LOST'; // Adjust as needed based on your possible statuses
  contactType:
    | 'VISITOR'
    | 'REGULAR'
    | 'PARTICIPANT'
    | 'INPROGRESS'
    | 'MEMBER'
    | undefined;
  memberStatus: string; // Adjust as needed based on your possible statuses
  maturityLevel: 'INFANT' | 'CHILD' | 'TEEN' | 'ADULT' | 'ELDER' | undefined;
  createdAt: Date | string;
  updatedAt: Date | string;
  role: string;
  roleId: string;
}
