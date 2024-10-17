'use client';

import { useQuery } from '@tanstack/react-query';
import api from '../axios';

const fetchQuery = ({
  fields = [
    'churches',
    'totalChurches',
    'activeAccounts',
    'inactiveAccounts',
    'verifiedAccounts',
  ],
}: {
  fields?: string[];
}) => {
  return `
  query {
    adminDashboard {
      ${fields[0]}{
        month
        count
      }
      ${fields[1]}
      ${fields[2]}
      ${fields[3]}
      ${fields[4]}
    }
  }
`;
};

export const useAdminDash = (fields?: string[]) => {
  return useQuery({
    queryKey: ['adminDashboard', fields],
    queryFn: async () => {
      const { data } = await api.post('/admin', {
        query: fetchQuery({ fields }),
      });
      return data.data.adminDashboard;
    },
    staleTime: 1000 * 60 * 5, // 10 minutes, reduces the frequency of refetching
    refetchOnWindowFocus: true, // Enables refetching on focus to keep data fresh but can be adjusted
    refetchIntervalInBackground: true, // Enables refetching in the background to keep data fresh
    retry: 2, // Reduce retry count to minimize delay on errors
    refetchOnMount: false,
  });
};
