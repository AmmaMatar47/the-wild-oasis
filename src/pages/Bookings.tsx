import Header from '@/components/Header';
import Segment from '@/components/Segment/Segment';
import SelectComp from '@/components/Select';
import Spinner from '@/components/Spinner/Spinner';
import TablePagination from '@/components/TablePagination';
import BookingsTable from '@/features/bookings/BookingsTable';
import { BookingsType, getBookings } from '@/services/api/bookingsApi';
import { getDataRange } from '@/services/api/indexApi';
import { calculatePageRange } from '@/utils/helper';
import { createListCollection, Flex, SelectValueChangeDetails } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

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
    { label: 'Date (recent first)', value: 'startDate.desc' },
    { label: 'Date (earlier first)', value: 'startDate.asc' },
    { label: 'Amount (high first)', value: 'totalPrice.desc' },
    { label: 'Amount (low first)', value: 'totalPrice.asc' },
  ],
});

const BOOKINGS_PAGE_SIZE = 8;

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingsType[]>([]);
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const [isLoading, serIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = Number(searchParams?.get('page')) || 1;
  const sortByValue = searchParams?.get('order') || 'startDate.desc';
  const activeStatus = searchParams?.get('status') || 'not.is.null';

  useEffect(() => {
    const bookingsData = async () => {
      const bookingsDataCount = await getDataRange('bookings', { status: activeStatus });
      setBookingsCount(bookingsDataCount);
      fetchBookings({});
    };
    bookingsData();
  }, []);

  const fetchBookings = async ({
    status = activeStatus,
    sortBy = sortByValue,
    page = activePage,
  }: {
    status?: string;
    sortBy?: string;
    page?: number;
  }) => {
    serIsLoading(true);
    const bookingsDataCount = await getDataRange('bookings', { status: status });
    setBookingsCount(bookingsDataCount);
    const bookingsRes = await getBookings(
      status,
      sortBy,
      calculatePageRange(page, BOOKINGS_PAGE_SIZE)
    );
    setBookings(bookingsRes);
    serIsLoading(false);
  };

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
      <Flex justifyContent='space-between'>
        <Header>All bookings</Header>
        <Flex gapX='1.125rem'>
          <Segment
            items={segmentItems}
            value={activeStatus}
            onValueChange={handleSegmentValueChange}
          />

          <SelectComp
            collection={sortBy}
            onValueChange={value => handleSortingValueChange(value)}
            defaultValue={[sortByValue]}
            disabled={bookingsCount < 2}
          />
        </Flex>
      </Flex>
      {isLoading ? (
        <Spinner />
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
