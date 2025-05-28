import { getCurrentUser } from "@/services/api/authApi";
import { http } from "@/services/HttpService";
import { useQuery } from "react-query";

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    onSuccess() {
      http.setIsAuthenticated(true);
    },
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
};
