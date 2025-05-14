import { formatDistanceToNow, formatDate } from 'date-fns';

export const formatToUSCurrency = (number: number) => {
  const USDCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    number
  );
  return USDCurrency;
};

export const formatTimeToNow = (date: string) => {
  const result: string = formatDistanceToNow(date, { addSuffix: true });
  return result;
};

export const formatDateToReadable = (date: string, formatString = 'MMM dd yyyy') => {
  const formattedDate: string = formatDate(date, formatString);
  return formattedDate;
};

export const calculatePageRange = (page: number, pageSize: number) => {
  const start = (page - 1) * pageSize;
  const end = page * pageSize - 1;
  const range = `${start}-${end}`;

  return range;
};
