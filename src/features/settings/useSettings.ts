import { getSettings } from "@/services/api/settingsApi";
import { useQuery } from "@tanstack/react-query";

export const useSettings = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const settings = data?.at(0);

  return {
    isLoading,
    error,
    settings,
    refetch,
  };
};
