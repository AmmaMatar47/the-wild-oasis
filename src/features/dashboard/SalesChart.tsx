import Heading from '@/components/Heading';
import { BookingsPricesType } from '../../types/bookingsTypes';
import { getToday } from '@/utils/helper';
import { subDays, isSameDay, eachDayOfInterval, format } from 'date-fns';
import { formatDateToReadable } from '../../utils/helper';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import DashboardBox from '../../components/SectionBox';

const SalesChart = ({
  bookingsPrices,
  numDays,
}: {
  bookingsPrices: BookingsPricesType[];
  numDays: number;
}) => {
  const startDate = formatDateToReadable(String(subDays(getToday(), Number(numDays) - 1)));
  const endDate = formatDateToReadable(getToday());

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), Number(numDays) - 1),
    end: new Date(),
  });

  const data = allDates.map(date => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookingsPrices
        .filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extraSales: bookingsPrices
        .filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });
  return (
    <DashboardBox padding='6' gridColumn='1 / -1'>
      <Heading as='h3' fontSize='xl' marginBottom='8'>
        Sales from {startDate} - {endDate}
      </Heading>

      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data} margin={{ top: 20, left: 32, bottom: 50 }}>
          <CartesianGrid strokeDasharray='4' />
          <XAxis dataKey='label' />
          <YAxis unit='$' />
          <Area
            type='monotone'
            dataKey='totalSales'
            stackId='1'
            stroke='#00a640'
            fill='#80c69bc2'
            strokeWidth={1.5}
            unit='$'
            name='Total sales'
          />
          <Area
            type='monotone'
            dataKey='extraSales'
            stackId='2'
            stroke='#8884d8'
            fill='#8884d8ac'
            strokeWidth={1.5}
            unit='$'
            name='Extra sales'
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default SalesChart;
