import { getSettings } from "@/services/api/settingsApi";
import { useQuery } from "react-query";

export const useSettings = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const settings = data?.at(0);

  return {
    isLoading,
    error,
    settings,
  };
};
