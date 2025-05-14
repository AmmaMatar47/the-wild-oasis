import { toaster } from "@/components/ui/toaster";
import { http } from "../HttpService";
import { AxiosResponse } from "axios";
import { CabinResponseType } from "./cabinsApi";

export type StatusType = "unconfirmed" | "checked-out" | "checked-in";

interface Guests {
  countryFlag: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
}

export interface BookingsType {
  cabins: { name: string };
  created_at: string;
  endDate: string;
  guests: { email: string; fullName: string };
  id: number;
  numGuests: number;
  numNights: number;
  startDate: string;
  status: StatusType;
  totalPrice: number;
}

export interface BookingDetails extends BookingsType {
  cabinId: number;
  cabinPrice: number;
  cabins: CabinResponseType;
  extrasPrice: number;
  guestId: number;
  guests: Guests;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  startDate: string;
}

export const getBookings = async (
  status: string,
  sortBy: string,
  dataRange: string,
) => {
  const res = await http.request<BookingsType[]>("get", "/bookings", {
    params: {
      order: sortBy,
      status: status,
      select:
        "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
    },
    headers: {
      range: dataRange,
    },
  });

  return res.data;
};

export const getBookingById = async (id: number) => {
  const res = await http.request<BookingDetails[]>("get", "bookings", {
    params: { id: `eq.${id}`, select: `*, cabins(*), guests(*)` },
  });
  return res.data;
};

export const deleteBooking = (id: number) => {
  const res = http.request<AxiosResponse<"">>("delete", "bookings", {
    params: {
      id: `eq.${id}`,
    },
  });

  toaster.promise(res, {
    success: { description: "Booking deleted successfully" },
    loading: { description: "Deleting" },
    error: {
      description: `Couldn't delete booking`,
    },
  });
  return res;
};

export const checkOut = (id: number) => {
  const res = http.request("patch", "bookings", {
    params: { id: `eq.${id}` },
    data: {
      status: "checked-out",
    },
  });

  return res;
};
