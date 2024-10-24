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
    mutationFn: (data: { email: string; devRole: string }) => AssignUserRoles(data),
    // Optimistically update the cache before the request
    onMutate: async (newRole) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['system-users'] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<AdminUsers[]>(['system-users']);

      // Optimistically update the cache
      if (previousUsers) {
        queryClient.setQueryData<AdminUsers[]>(['system-users'], (old) =>
          old?.map(user =>
            user.email === newRole.email ? { ...user, devRole: newRole.devRole } : user
          )
        );
      }

      // Return the snapshot so it can be rolled back in case of an error
      return { previousUsers };
    },
    // If the mutation succeeds, refetch the data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-users'] });
    },
    // If the mutation fails, use the snapshot to roll back the cache
    onError: (error: AxiosError, newRole, context) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message || 'Something went wrong';
      if (errorMessage === 'Failed to assign role: User not found') {
        toast.error('User not found');
      } else if (error.response?.status == 500) {
        toast.error('There was an error assigning that role. Try again later!');
      }

      // Rollback cache to the previous state
      queryClient.setQueryData(['system-users'], context?.previousUsers);
    },
    // Refetch regardless of success or error to make sure the cache is up-to-date
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['system-users'] });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string }) => DeleteUserRoles(data),
    // Optimistically update the cache before the request
    onMutate: async (deletedRole) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['system-users'] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<AdminUsers[]>(['system-users']);

      // Optimistically update the cache
      if (previousUsers) {
        queryClient.setQueryData<AdminUsers[]>(['system-users'], (old) =>
          old?.map(user =>
            user.email === deletedRole.email ? { ...user, devRole: '' } : user
          )
        );
      }

      // Return the snapshot so it can be rolled back in case of an error
      return { previousUsers };
    },
    // If the mutation succeeds, refetch the data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-users'] });
      toast.success('Role Deleted');
    },
    // If the mutation fails, rollback the cache to the previous state
    onError: (error: AxiosError, deletedRole, context) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message || 'Something went wrong';
      if (errorMessage === 'Failed to delete role') {
        toast.error('User not found');
      } else if (error.response?.status == 500) {
        toast.error('There was an error deleting that role. Try again later!');
      }

      // Rollback cache to the previous state
      queryClient.setQueryData(['system-users'], context?.previousUsers);
    },
    // Refetch regardless of success or error to make sure the cache is up-to-date
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['system-users'] });
    },
  });
};
