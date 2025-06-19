import { createUser } from "@/services/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: (credentials: {
      fullName: string;
      email: string;
      password: string;
    }) => createUser(credentials),

    onSuccess() {
      navigate("/login");
    },
  });

  return { mutate, isPending };
};
