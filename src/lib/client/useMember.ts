import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import api from "../axios";
import { IMember } from "@/types/member";

// Fetching a member
const fetchMember = async ({
  churchId,
  memberId,
}: {
  churchId: string;
  memberId: string;
}): Promise<IMember> => {
  const { data } = await api.get(`/members/${churchId}/member/${memberId}`);
  return data.data as IMember;
};

// Adding a member
const addMember = async ({
  churchId,
  data,
}: {
  churchId: string;
  data: Partial<IMember>; // Use Partial or a dedicated input type for flexibility
}): Promise<IMember> => {
  const response = await api.post(`/members/${churchId}/member`, { data });
  return response.data.data as IMember;
};

// Deleting a member
const deleteMember = async ({
  churchId,
  memberId,
}: {
  churchId: string;
  memberId: string;
}): Promise<IMember> => {
  const response = await api.delete(`/members/${churchId}/member/${memberId}`);
  return response.data.data as IMember;
};

// Updating a member
const updateMember = async ({
  churchId,
  memberId,
  data,
}: {
  churchId: string;
  memberId: string;
  data: Partial<IMember>; // Ensure to use Partial if you are not updating every field
}): Promise<IMember> => {
  const response = await api.patch(`/members/${churchId}/member/${memberId}`, {
    data,
  });
  return response.data.data as IMember;
};

// Custom hook for fetching a member
export const useMember = ({
  churchId,
  memberId,
}: {
  churchId: string;
  memberId: string;
}) => {
  return useQuery({
    queryKey: ["member", { churchId, memberId }],
    queryFn: () => fetchMember({ churchId, memberId }),
    enabled: !!churchId && !!memberId, // Both churchId and memberId are required
  });
};

// Hook for adding a member
export const useAddMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      churchId,
      data,
    }: {
      churchId: string;
      data: Partial<IMember>;
    }) => addMember({ churchId, data }),
    onSuccess: (_, { churchId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["members", churchId],
      });
    },
    retry: 1,
    onError: (error) => {
      console.error("Error adding member", error);
    },
  });
};

// Hook for deleting a member
export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      churchId,
      memberId,
    }: {
      churchId: string | undefined;
      memberId: string | undefined;
    }) => deleteMember({ churchId: churchId ?? "", memberId: memberId ?? "" }),
    onSuccess: (_, { churchId, memberId }) => {
      // Invalidate specific member query
      queryClient.invalidateQueries({
        queryKey: ["member", churchId, memberId], // Correct structure here
      });
      // Invalidate all Members
      queryClient.invalidateQueries({
        queryKey: ["members", churchId],
      });
    },
    retry: 1,
    onError: (error) => {
      console.error("Error deleting member", error);
    },
  });
};

// Hook for updating a member
export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      churchId,
      memberId,
      data,
    }: {
      churchId: string;
      memberId: string;
      data: Partial<IMember>;
    }) => updateMember({ churchId, memberId, data }),
    onSuccess: (_, { churchId, memberId }) => {
      // Invalidate specific member query
      queryClient.invalidateQueries({
        queryKey: ["member", { churchId, memberId }], // Correct structure here
      });
      queryClient.invalidateQueries({
        queryKey: ["members", churchId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", churchId],
      });
    },
    retry: 1,
    onError: (error) => {
      console.error("Error updating member", error);
    },
  });
};
