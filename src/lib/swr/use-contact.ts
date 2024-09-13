import useSWR from "swr";
import { getFetcher } from "./use-user-check";
import { useMemo } from "react";
import { AContact } from "@/types/member";

export function useContact({
  userId,
  churchId,
}: {
  userId: string;
  churchId: string;
}) {
  const { data, error } = useSWR(
    userId && churchId
      ? `/contacts/authorized-contact?user=${userId}&churchId=${churchId}`
      : null, // Avoid making the request if userId or churchId is missing
    getFetcher,
    {
      dedupingInterval: 120000, // Increased to 2 minutes for fewer requests
      shouldRetryOnError: true, // Enable retry on error to handle transient issues
      errorRetryCount: 2, // Reduce retry count for faster failure response
      errorRetryInterval: 3000, // Set 3 seconds delay between retries
    }
  );

  const result = useMemo(
    () => ({
      contacts: data as AContact,
      isLoading: !error && !data,
      isError: error,
    }),
    [data, error]
  );

  return result;
}
