import { login } from '@/services/api/authApi';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess(res) {
      queryClient.setQueryData(['user'], res.user);
      localStorage.setItem('refresh_token', res.refresh_token);
      localStorage.setItem('access_token', res.access_token);
      navigate('/dashboard');
    },
  });

  return { mutate, isLoading };
};
