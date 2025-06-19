import { logout } from "@/services/api/authApi";
import { http } from "@/services/HttpService";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: logout,
    onSuccess: () => {
      http.clearAuthTokens();
      http.setIsAuthenticated(false);
      navigate("/login");
    },
  });

  return { mutate };
};
