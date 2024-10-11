'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface QuickChurch {
  church: {
    id: string;
    name: string;
    members: [
      {
        ContactRole: [
          {
            role: {
              name: string;
            };
          },
        ];
      },
    ];
  };
}

type Church = {
  id: string;
  name: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string | null;
  phone: string;
  email: string;
  foundedDate: string | null;
  level: {
    id: string;
    name: string;
    order: number;
    parentid: string | null;
  };
  isHq: boolean;
};

export interface UpdateChurchRequest {
  name: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
  foundedDate: Date; 
}



const getChurches = async ({ userId }: { userId: string }) => {
  const { data } = await api.get(`/churches?userId=${userId}`);
  return data.data as QuickChurch[];
};

const getChurch = async (churchId: string) => {
  const { data } = await api.get(`/churches/${churchId}`);
  return data.data as Church;
};

const updateChurch = async (churchId: string, payload: UpdateChurchRequest) => {
  const { data } = await api.patch(`/churches/${churchId}`, payload);
  return data.data as Church;
};

export const useGetChurches = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ['churches', userId],
    queryFn: () => getChurches({ userId }),
    enabled: !!userId,
  });
};

export const useGetChurch = () => {
  let { churchId } = useParams() as { churchId: string | null };
  const searchParams = useSearchParams();
  if (!churchId) {
    churchId = searchParams.get('id');
  }

  return useQuery({
    queryKey: ['church', churchId],
    queryFn: () => getChurch(churchId as string),
    enabled: !!churchId,
    retry: 1,
  });
};


export const useUpdateChurch = () => {
  let {churchId} = useParams() as {churchId : string | null};
  const searchParams = useSearchParams();
  const router = useRouter()
  const queryClient = useQueryClient();
  if (!churchId) {
    churchId = searchParams.get('id');
  }


  return useMutation({
    mutationFn: (data: UpdateChurchRequest) => updateChurch(churchId as string, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["church", churchId]})
      toast.success('Church Profile Updated');
      router.back();
    },
    onError: (error: AxiosError) => {
      toast.error("Couldn't update church profile. Try again later")
    },
  })
}
