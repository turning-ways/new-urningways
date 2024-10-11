import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface Creator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ChurchAccount {
  id: string;
  name: string;
  createdAt: string | Date;
  creator: Creator;
}

export type AdminUsers = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  devRole: string;
};

const getRecentAccounts = async () => {
  const { data } = await api.get('/system/recent-church-accounts');
  return data.data as ChurchAccount[];
};

const getAccounts = async () => {
  const { data } = await api.get('/system/church-accounts');
  return data.data as ChurchAccount[];
};
const getUsers = async () => {
  const { data } = await api.get('/system/admin-users');
  return data.data as AdminUsers[];
};

const AssignUserRoles = async (payload: { email: string; devRole: string }) => {
  const { data } = await api.post(`/system/assign-role`, payload);
  return data.data as AdminUsers;
};


const DeleteUserRoles = async (payload: { email: string}) => {
  const { data } = await api.post(`/system/remove-role`, payload);
  return data.data as AdminUsers;
};

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ['system-accounts'],
    queryFn: getAccounts,
    staleTime: 60,
  });
};
export const useGetRecentAccounts = () => {
  return useQuery({
    queryKey: ['recent-system-accounts'],
    queryFn: getRecentAccounts,
    staleTime: 60,
  });
};
export const useGetUsers = () => {
  return useQuery({
    queryKey: ['system-users'],
    queryFn: getUsers,
    staleTime: 60,
  });
};

export const useAssignRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; devRole: string }) =>
      AssignUserRoles(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['system-users'] });
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        'Something went wrong';
      if (errorMessage === 'Failed to assign role: User not found') {
        toast.error('User not found');
      } else if (error.response?.status == 500) {
        toast.error('There was an error assigning that role. Try again later!');
      }
    },
  });
};
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string}) =>
      DeleteUserRoles(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['system-users'] });
      toast.success('Role Deleted');
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        'Something went wrong';
      if (errorMessage === 'Failed to delete role') {
        toast.error('User not found');
      } else if (error.response?.status == 500) {
        toast.error('There was an error deletining that role. Try again later!');
      }
    },
  });
};
