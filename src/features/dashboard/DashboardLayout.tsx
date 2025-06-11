import { Grid } from '@chakra-ui/react';
import Stats from './Stats';
import TodayGuestsActivity from './TodayGuestsActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';
import StatsBoxSkeleton from './StatsBoxSkeleton';
import DurationSkeleton from './DurationSkeleton';
import SalesChartSkeleton from './SalesChartSkeleton';

const DashboardLayout = () => {
  const { data: bookingsPrices, isLoading: isLoadingBookings, numDays } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingConfirmedStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  const isLoadingStatsData = isLoadingBookings || isLoadingConfirmedStays || isLoadingCabins;
  return (
    <Grid grid='auto 22rem 28rem / 1fr 1fr 1fr 1fr' gap='5'>
      {isLoadingStatsData ? (
        <StatsBoxSkeleton />
      ) : (
        <Stats
          bookingsPrices={bookingsPrices}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabins={cabins}
        />
      )}

      <TodayGuestsActivity gridColumn='1 / 3' />

      {isLoadingConfirmedStays ? (
        <DurationSkeleton />
      ) : (
        <DurationChart confirmedStays={confirmedStays} />
      )}

      {isLoadingBookings ? (
        <SalesChartSkeleton />
      ) : (
        <SalesChart bookingsPrices={bookingsPrices} numDays={numDays} />
      )}
    </Grid>
  );
};

export default DashboardLayout;
