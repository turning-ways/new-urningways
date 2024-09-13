import { useQuery } from "@tanstack/react-query";
import api from "../axios";

const fetchContacts = async ({ churchId }: { churchId: string }) => {
  const { data } = await api.get(`/contacts/${churchId}/contacts`);
  return data.data;
};

export const useContacts = ({
  churchId,
}: {
  churchId: string;
  initialData?: any[];
}) => {
  return useQuery({
    queryKey: ["contacts", churchId],
    queryFn: () => fetchContacts({ churchId }),
    // enabled: !!churchId,
  });
};
