import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import api from '../axios';
import { useParams } from 'next/navigation';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
  photo: string | null;
  mainChurchId: string | null;
  churches: {
    churchId: string;
    createdAt: Date;
    userId: string;
    updatedAt: Date;
  }[];
}

interface AuthCheckData {
  id: string;
  firstame: string;
  lastName: string;
  email: string;
  role: string;
  churchid: string;
  churchName: string;
  churchCreator: boolean;
}

interface NotFoundMes {
  userRole: 'ADMIN' | 'USER';
  message: string;
}

// Fetcher function
export const getFetcher = async (url: string) => {
  try {
    const response = await api.get(url, {
      timeout: 10000, // Set a timeout for the request
    });
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} ${error.response.data.message || ''}`,
      );
    } else if (error.request) {
      throw new Error('Network error, please try again later.');
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

// useUserCheck hook
export const useUserCheck = () => {
  const { churchId } = useParams();
  const { data, error, isLoading } = useSWR(
    `/auth/user?churchId=${churchId}`,
    getFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 18000, // 3 minutes deduping interval
      errorRetryCount: 3, // Retry fetching 3 times on error
      errorRetryInterval: 5000, // 5 seconds delay between retries
      shouldRetryOnError: true, // Retry on network errors
    },
  );

  const result = useMemo(
    () => ({
      user: data as AuthCheckData | NotFoundMes,
      isLoading,
      isError: !!error,
    }),
    [data, isLoading, error],
  );

  return result;
};

// Invalidate the SWR cache manually (trigger re-fetch)
export const invalidateUserCheck = () => {
  mutate('/auth/user'); // This will trigger a re-fetch for the "/auth/user" key
};
