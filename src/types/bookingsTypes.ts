import { CabinResponseType } from "./cabinsTypes";

export type StatusType = "unconfirmed" | "checked-out" | "checked-in";

interface Guests {
  countryFlag: string;
  fullName: string;
  nationality: string;
  created_at: string;
  email: string;
  id: number;
  nationalID: string;
}

export interface BookingsType {
  id: number;
  created_at: string;
  cabins: { name: string };
  startDate: string;
  endDate: string;
  guests: { email: string; fullName: string };
  numGuests: number;
  numNights: number;
  status: StatusType;
  totalPrice: number;
}

export interface BookingDetailsType extends BookingsType {
  cabinId: number;
  cabinPrice: number;
  cabins: CabinResponseType;
  extraPrice: number;
  guestId: number;
  guests: Guests;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  startDate: string;
}

export interface BookingsPricesType {
  created_at: string;
  totalPrice: number;
  extraPrice: number;
}

export interface ConfirmedBookingsType {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  extraPrice: number;
  guestId: number;
  guests: { fullName: string };
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: string;
  status: string;
  totalPrice: number;
}

export interface TodaysBookingsType {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  extraPrice: number;
  guestId: number;
  guests: {
    fullName: string;
    countryFlag: string;
    nationality: string;
  };
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string | null;
  startDate: string; // or Date
  status: "checked-in" | "checked-out" | "unconfirmed"; // add other possible statuses
  totalPrice: number;
}
