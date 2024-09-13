"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Dashboard } from "@/types/dashboard";

const fetchQuery = ({
  churchId,
  startDate,
  endDate,
  fields = [
    "totalMembers",
    "totalContacts",
    "verifiedMembers",
    "unverifiedMembers",
    "members",
  ],
}: {
  churchId: string;
  startDate?: string;
  endDate?: string;
  fields?: string[];
}) => {
  const selectedFields = fields;
  return `
    query {
      dashboard {
        ${selectedFields[0]}(
          churchId: "${churchId}"
          startDate: "${startDate}"
          endDate: "${endDate}"
        )
        ${selectedFields[1]}(
          churchId: "${churchId}"
          startDate: "${startDate}"
          endDate: "${endDate}"
        )
        ${selectedFields[2]}(
          churchId: "${churchId}"
          startDate: "${startDate}"
          endDate: "${endDate}"
        )
        ${selectedFields[3]}(
          churchId: "${churchId}"
          startDate: "${startDate}"
          endDate: "${endDate}"
        )
        ${selectedFields[4]}(
          churchId: "${churchId}"
          startDate: "${startDate}"
          endDate: "${endDate}"
        ) {
          id
          age
          firstName
          lastName
          dateOfBirth
          phone
          email
          gender
          maritalStatus
          createdAt
        }
      }
    }
  `;
};

export function useDash({
  churchId,
  startDate,
  endDate,
}: {
  churchId: string;
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: ["dash", { churchId, startDate }],
    queryFn: async () => {
      const response = await api.post(
        "/dash",
        {
          query: fetchQuery({ churchId, startDate, endDate }),
        },
        { timeout: 5000 } // Set a 5-second timeout for the request
      );
      return response.data.data.dashboard as Dashboard;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes, reduces the frequency of refetching
    refetchOnWindowFocus: true, // Enables refetching on focus to keep data fresh but can be adjusted
    refetchIntervalInBackground: true, // Enables refetching in the background to keep data fresh
    retry: 2, // Reduce retry count to minimize delay on errors
    refetchOnMount: false,
    enabled: !!churchId,
  });
}
