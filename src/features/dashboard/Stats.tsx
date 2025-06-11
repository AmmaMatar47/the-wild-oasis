import StatBox from '@/components/StatBox';
import { BookingsPricesType, ConfirmedBookingsType } from '@/services/api/bookingsApi';
import { Circle, FormatNumber } from '@chakra-ui/react';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { CabinType } from '@/services/api/cabinsApi';

const Stats = ({
  bookingsPrices,
  confirmedStays,
  numDays,
  cabins,
}: {
  bookingsPrices: BookingsPricesType[] | undefined;
  confirmedStays: ConfirmedBookingsType[] | undefined;
  numDays: number;
  cabins: CabinType[] | undefined;
}) => {
  const bookingsNum = bookingsPrices ? String(bookingsPrices.length) : 0;

  const sales = bookingsPrices ? bookingsPrices.reduce((acc, cur) => acc + cur.totalPrice, 0) : 0;

  const checkIns = confirmedStays ? confirmedStays.length : 0;

  const occupation =
    confirmedStays && cabins
      ? confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabins.length)
      : 0;

  return (
    <>
      <StatBox
        label='bookings'
        value={String(bookingsNum)}
        icon={
          <Circle bgColor='var(--color-blue-100)' padding='4'>
            <HiOutlineBriefcase size={32} stroke='var(--color-blue-700)' />
          </Circle>
        }
      />
      <StatBox
        label='sales'
        value={<FormatNumber currency='USD' style='currency' value={sales} />}
        icon={
          <Circle bgColor='var(--color-green-100)' padding='4'>
            <HiOutlineBanknotes size={32} stroke='var(--color-green-700)' />
          </Circle>
        }
      />

      <StatBox
        label='check ins'
        value={String(checkIns)}
        icon={
          <Circle bgColor='var(--color-indigo-100)' padding='4'>
            <HiOutlineCalendarDays size={32} stroke='var(--color-indigo-700)' />
          </Circle>
        }
      />
      <StatBox
        label='occupancy rate'
        value={<FormatNumber value={occupation} style='percent' />}
        icon={
          <Circle bgColor='var(--color-yellow-100)' padding='4'>
            <HiOutlineChartBar size={32} stroke='var(--color-yellow-700)' />
          </Circle>
        }
      />
    </>
  );
};

export default Stats;
