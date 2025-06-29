import { Grid } from '@chakra-ui/react';
import Stats from './Stats';
import TodayGuestsActivity from './TodayGuestsActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import StatsBoxSkeleton from './StatsBoxSkeleton';
import DurationSkeleton from './DurationSkeleton';
import SalesChartSkeleton from './SalesChartSkeleton';
import SectionError from '@/components/SectionError';
import { useCabinsNames } from './useCabinsNames';

const DashboardLayout = () => {
  const { data: bookingsPrices, isLoading: isLoadingBookingsPrices, numDays } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingConfirmedStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabinsNames();

  const isLoadingStatsData = isLoadingBookingsPrices || isLoadingConfirmedStays || isLoadingCabins;
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
      ) : confirmedStays ? (
        <DurationChart confirmedStays={confirmedStays} />
      ) : (
        <SectionError
          description="We're having trouble loading the stays duration information. Please try again later."
          gridColumn='3 / -1'
        />
      )}

      {isLoadingBookingsPrices ? (
        <SalesChartSkeleton />
      ) : bookingsPrices ? (
        <SalesChart bookingsPrices={bookingsPrices} numDays={numDays} />
      ) : (
        <SectionError
          description="We're having trouble loading the sales information. Please try again later."
          gridColumn='1 / -1'
          paddingTop='6rem'
        />
      )}
    </Grid>
  );
};

export default DashboardLayout;
