import { updateSettings } from "@/services/api/settingsApi";
import { useMutation } from "react-query";

export const useUpdateSettings = () => {
  const { mutate, data, error, isLoading } = useMutation({
    mutationFn: updateSettings,
  });

  return { mutate, data, error, isLoading };
};
