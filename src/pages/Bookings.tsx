import SectionHeader from '@/components/SectionHeader';
import Heading from '@/components/Heading';
import Segment from '@/components/Segment/Segment';
import SelectComp from '@/components/Select';
import Spinner from '@/components/Spinner/Spinner';
import TablePagination from '@/components/TablePagination';
import BookingsTable from '@/features/bookings/BookingsTable';
import { BookingsType, getBookings } from '@/services/api/bookingsApi';
import { getDataRange } from '@/services/api/indexApi';
import { calculatePageRange } from '@/utils/helper';
import { createListCollection, Flex, SelectValueChangeDetails } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import PageError from '@/components/PageError';
import { BOOKINGS_PAGE_SIZE } from '@/utils/constants';

const segmentItems = [
  {
    label: 'All',
    value: 'not.is.null',
  },
  { label: 'Checked out', value: 'eq.checked-out' },
  { label: 'Checked in', value: 'eq.checked-in' },
  { label: 'Unconfirmed', value: 'eq.unconfirmed' },
];

const sortBy = createListCollection({
  items: [
    { label: 'Date (Newest first)', value: 'startDate.desc' },
    { label: 'Date (Oldest first)', value: 'startDate.asc' },
    { label: 'Amount (High to Low)', value: 'totalPrice.desc' },
    { label: 'Amount (Low to High)', value: 'totalPrice.asc' },
  ],
});

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingsType[]>([]);
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const sortByValue = searchParams.get('order') || 'startDate.desc';
  const activeStatus = searchParams.get('status') || 'not.is.null';

  const fetchBookings = useCallback(
    async ({
      status = activeStatus,
      sortBy = sortByValue,
      page = activePage,
    }: {
      status?: string;
      sortBy?: string;
      page?: number;
    }) => {
      try {
        setIsLoading(true);
        const bookingsDataCount = await getDataRange('bookings', {
          status: status,
        });
        setBookingsCount(bookingsDataCount);

        const bookingsRes = await getBookings(
          status,
          sortBy,
          calculatePageRange(page, BOOKINGS_PAGE_SIZE)
        );
        setBookings(bookingsRes);
        setIsLoading(false);
      } catch {
        setError('Failed to load bookings');
      } finally {
        setIsLoading(false);
      }
    },
    [activePage, activeStatus, sortByValue]
  );

  useEffect(() => {
    fetchBookings({});
  }, [fetchBookings]);

  const handleSortingValueChange = (
    details: SelectValueChangeDetails<{ value: string; label: string }>
  ) => {
    const value = details.value[0];
    setSearchParams(prevParams => {
      prevParams.set('order', value);
      prevParams.set('page', '1');
      return prevParams;
    });
    fetchBookings({ sortBy: value });
  };

  const handleSegmentValueChange = (value: string) => {
    setSearchParams(prevParams => {
      prevParams.set('status', value);
      prevParams.set('page', '1');
      return prevParams;
    });
    fetchBookings({ status: value });
  };

  const handlePageChange = ({ page }: { page: number }) => {
    setSearchParams(prevParams => {
      prevParams.set('page', String(page));
      return prevParams;
    });
    fetchBookings({ page: page });
  };

  return (
    <>
      <SectionHeader>
        <Heading>All bookings</Heading>
        <Flex gapX='1.125rem'>
          <Segment
            items={segmentItems}
            value={activeStatus}
            onValueChange={handleSegmentValueChange}
          />

          <SelectComp
            collection={sortBy}
            value={[sortByValue]}
            onValueChange={value => handleSortingValueChange(value)}
            disabled={bookingsCount < 2}
          />
        </Flex>
      </SectionHeader>{' '}
      {isLoading ? (
        <Spinner />
      ) : error !== undefined ? (
        <PageError message={error} />
      ) : (
        <>
          <BookingsTable bookings={bookings} />
          {bookingsCount <= BOOKINGS_PAGE_SIZE || !bookingsCount ? null : (
            <TablePagination
              page={activePage}
              pageSize={BOOKINGS_PAGE_SIZE}
              onPageChange={handlePageChange}
              count={bookingsCount}
            />
          )}
        </>
      )}
    </>
  );
};

export default Bookings;
