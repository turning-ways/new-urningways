import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";

// Create a function to fetch roles
const fetchRoles = async (churchId: string) => {
  const response = await api.get(`/churches/${churchId}/roles`);
  return response.data.data; // Return the roles data
};

// Custom hook to use in the component
export const useRoles = (churchId: string) => {
  return useQuery({
    queryKey: ["churchRoles", churchId], // Unique query key
    queryFn: () => fetchRoles(churchId), // Fetch function
    enabled: !!churchId, // Ensure the query only runs if the churchId is available
    staleTime: 1000 * 60 * 5, // Cache roles for 5 minutes
  });
};
