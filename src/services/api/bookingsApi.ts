import { toaster } from "@/components/ui/toaster";
import { http } from "../HttpService";
import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "@/utils/constants";
import { getToday } from "@/utils/helper";
import {
  BookingDetailsType,
  BookingsPricesType,
  BookingsType,
  ConfirmedBookingsType,
  TodaysBookingsType,
} from "@/types/bookingsTypes";

export const getBookingsWithinDuration = async (date: string) => {
  const res = await http.request<BookingsPricesType[]>(
    "get",
    API_ENDPOINTS.bookings,
    {
      params: {
        select: "created_at,totalPrice,extraPrice",
        created_at: [`gte.${date}`, `lte.${getToday({ end: true })}`],
        order: "created_at.asc",
      },
    },
  );

  return res.data;
};

// Returns all stays that were created after the given date
export const getStaysWithinDuration = async (date: string) => {
  const res = await http.request<ConfirmedBookingsType[]>(
    "get",
    API_ENDPOINTS.bookings,
    {
      params: {
        select: "*,guests(fullName)",
        startDate: [`gte.${date}`, `lte.${getToday()}`],
      },
    },
  );

  return res.data;
};

// Returns the checked-in and unconfirmed bookings for today
export async function getStaysTodayActivity() {
  const res = await http.request<TodaysBookingsType[]>(
    "get",
    API_ENDPOINTS.bookings,
    {
      params: {
        select: "*,guests(fullName,nationality,countryFlag)",
        or: `(and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()}))`,
        order: "created_at.asc",
      },
    },
  );

  return res.data;
}

export const getBookings = async (
  status: string,
  sortBy: string,
  dataRange: string,
) => {
  const res = await http.request<BookingsType[]>(
    "get",
    API_ENDPOINTS.bookings,
    {
      params: {
        order: sortBy,
        status: status,
        select:
          "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      },
      headers: {
        range: dataRange,
      },
    },
  );

  return res.data;
};

export const getBookingById = async (id: number) => {
  const res = await http.request<BookingDetailsType[]>(
    "get",
    API_ENDPOINTS.bookings,
    {
      params: { id: `eq.${id}`, select: `*, cabins(*), guests(*)` },
    },
  );
  return res.data;
};

export const deleteBooking = (id: number) => {
  const res = http.request<AxiosResponse<"">>(
    "delete",
    API_ENDPOINTS.bookings,
    {
      params: {
        id: `eq.${id}`,
      },
    },
  );

  toaster.promise(res, {
    success: { description: "Booking deleted successfully" },
    loading: { description: "Deleting" },
    error: {
      description: `Failed to delete booking`,
    },
  });
  return res;
};

export const checkout = (id: number) => {
  const res = http.request("patch", API_ENDPOINTS.bookings, {
    params: { id: `eq.${id}` },
    data: {
      status: "checked-out",
    },
  });

  toaster.promise(res, {
    success: { description: "Booking checked out successfully" },
    loading: { description: "Checking out" },
    error: {
      description: `Failed to check out`,
    },
  });

  return res;
};

export const checkIn = (
  id: number,
  hasBreakfast: boolean,
  totalPrice: number,
) => {
  const res = http.request("patch", API_ENDPOINTS.bookings, {
    params: { id: `eq.${id}` },
    data: {
      status: "checked-in",
      isPaid: true,
      hasBreakfast: hasBreakfast,
      totalPrice: totalPrice,
    },
  });

  toaster.promise(res, {
    success: { description: "Booking checked in successfully" },
    loading: { description: "Checking in" },
    error: {
      description: `Failed to check in`,
    },
  });

  return res;
};
