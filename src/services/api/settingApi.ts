import { http } from "../HttpService";

export interface SettingsType {
  breakfastPrice: number;
  created_at: string;
  id: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
}

export const getSettings = async () => {
  const res = await http.request<SettingsType[]>("get", "/settings");
  return res.data;
};
