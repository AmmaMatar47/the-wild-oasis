import { getBookings } from "@/services/api/bookingsApi";
import { getDataRange } from "@/services/api/indexApi";
import { BOOKINGS_PAGE_SIZE } from "@/utils/constants";
import { calculatePageRange } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const activePage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const sortByValue = searchParams.get("order") || "startDate.desc";
  const activeStatus = searchParams.get("status") || "not.is.null";

  const [bookingsCount, setBookingsCount] = useState(0);

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", activePage, sortByValue, activeStatus],
    queryFn: () =>
      getBookings(
        activeStatus,
        sortByValue,
        calculatePageRange(activePage, BOOKINGS_PAGE_SIZE),
      ),
  });

  useEffect(() => {
    const getBookingsCount = async () => {
      const bookingsDataCount = await getDataRange("bookings", {
        status: activeStatus,
      });
      setBookingsCount(bookingsDataCount);
    };
    getBookingsCount();
  }, [activeStatus, bookings]);

  return { bookings, isLoading, error, bookingsCount };
};
