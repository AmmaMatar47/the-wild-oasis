import { getCurrentUser } from "@/services/api/authApi";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return {
    user,
    isLoading,
    isFetched,
    isAuthenticated: user?.role === "authenticated",
  };
};
