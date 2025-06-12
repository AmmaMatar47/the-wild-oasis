import { formatDistanceToNow, formatDate } from "date-fns";

export const formatToUSCurrency = (number: number) => {
  const USDCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
  return USDCurrency;
};

export const formatTimeToNow = (date: string) => {
  const result: string = formatDistanceToNow(date, { addSuffix: true });
  return result;
};

export const formatDateToReadable = (
  date: string,
  formatString = "MMM dd yyyy",
) => {
  const formattedDate: string = formatDate(date, formatString);
  return formattedDate;
};

export const calculatePageRange = (page: number, pageSize: number) => {
  const start = (page - 1) * pageSize;
  const end = page * pageSize - 1;
  const range = `${start}-${end}`;

  return range;
};

export const getToday = (options: { end?: boolean } = {}) => {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it's not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};
