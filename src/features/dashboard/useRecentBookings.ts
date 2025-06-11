import { useSearchParams } from "react-router";
import { useQuery } from "react-query";
import { getBookingsWithinDuration } from "@/services/api/bookingsApi";
import { subDays } from "date-fns";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const days = searchParams.get("last") || 7;
  const numDays = Number(days);
  const fromDate = subDays(new Date(), numDays).toISOString();

  const { data, isLoading } = useQuery({
    queryFn: () => getBookingsWithinDuration(fromDate),
    queryKey: ["earlier-bookings", `${numDays}-last`],
  });

  return { data, isLoading, numDays };
};
