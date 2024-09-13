import { useQuery } from "@tanstack/react-query";
import api from "../axios";

export const fetchMembers = async (churchId: string) => {
  const { data } = await api.get(`/churches/${churchId}/members`);
  return data.data;
};

export const useMembers = ({
  churchId,
}: {
  churchId: string;
  initialData?: any[];
}) => {
  return useQuery({
    queryKey: ["members", churchId],
    queryFn: () => fetchMembers(churchId),
    // enabled: !!churchId,
  });
};
