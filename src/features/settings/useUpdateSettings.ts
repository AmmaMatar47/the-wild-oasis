import { updateSettings } from '@/services/api/settingsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  return { mutate, data, error, isPending };
};
