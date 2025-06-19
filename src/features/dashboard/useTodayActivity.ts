import { getStaysTodayActivity } from "@/services/api/bookingsApi";
import { useQuery } from "@tanstack/react-query";

export const useTodayActivity = () => {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isLoading, activities };
};
