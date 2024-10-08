import { useQuery } from '@tanstack/react-query';
import api from '../axios';
import { useParams, useSearchParams } from 'next/navigation';

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

const getChurches = async ({ userId }: { userId: string }) => {
  const { data } = await api.get(`/churches?userId=${userId}`);
  return data.data as QuickChurch[];
};

const getChurch = async (churchId: string) => {
  const { data } = await api.get(`/churches/${churchId}`);
  return data.data;
};

export const useGetChurches = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ['churches', userId],
    queryFn: () => getChurches({ userId }),
    enabled: !!userId,
  });
};

const useChurch = async () => {
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
