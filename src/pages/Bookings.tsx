import SectionHeader from "@/components/SectionHeader";
import Heading from "@/components/Heading";
import Segment from "@/components/Segment";
import Select from "@/components/Select";
import TablePagination from "@/components/TablePagination";
import BookingsTable from "@/features/bookings/BookingsTable";
import {
  createListCollection,
  Flex,
  SelectValueChangeDetails,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router";
import PageError from "@/components/PageError";
import { BOOKINGS_PAGE_SIZE } from "@/utils/constants";
import { useBookings } from "@/features/bookings/useBookings";

export interface FetchBookingsProps {
  status: string;
  sortBy: string;
  page: number;
}

const segmentItems = [
  {
    label: "All",
    value: "not.is.null",
  },
  { label: "Checked out", value: "eq.checked-out" },
  { label: "Checked in", value: "eq.checked-in" },
  { label: "Unconfirmed", value: "eq.unconfirmed" },
];

const sortBy = createListCollection({
  items: [
    { label: "Date (Newest first)", value: "startDate.desc" },
    { label: "Date (Oldest first)", value: "startDate.asc" },
    { label: "Amount (High to Low)", value: "totalPrice.desc" },
    { label: "Amount (Low to High)", value: "totalPrice.asc" },
  ],
});

const Bookings = () => {
  const { bookings, isLoading, error, bookingsCount } = useBookings();

  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const sortByValue = searchParams.get("order") || "startDate.desc";
  const activeStatus = searchParams.get("status") || "not.is.null";

  const handleSortingValueChange = (
    details: SelectValueChangeDetails<{ value: string; label: string }>,
  ) => {
    const value = details.value[0];
    setSearchParams((prevParams) => {
      prevParams.set("order", value);
      prevParams.set("page", "1");
      return prevParams;
    });
  };

  const handleSegmentValueChange = (value: string) => {
    setSearchParams((prevParams) => {
      prevParams.set("status", value);
      prevParams.set("page", "1");
      return prevParams;
    });
  };

  const handlePageChange = ({ page }: { page: number }) => {
    setSearchParams((prevParams) => {
      prevParams.set("page", String(page));
      return prevParams;
    });
  };

  return (
    <>
      <SectionHeader>
        <Heading>All bookings</Heading>
        <Flex gapX="1.125rem">
          <Segment
            items={segmentItems}
            value={activeStatus}
            onValueChange={handleSegmentValueChange}
          />

          <Select
            collection={sortBy}
            value={[sortByValue]}
            onValueChange={(value) => handleSortingValueChange(value)}
            disabled={bookingsCount < 2}
          />
        </Flex>
      </SectionHeader>
      {error ? (
        <PageError
          message={`Failed to load bookings data, Please try again later.`}
        />
      ) : (
        <>
          <BookingsTable bookings={bookings} isLoading={isLoading} />
          {bookingsCount <= BOOKINGS_PAGE_SIZE || !bookingsCount ? null : (
            <TablePagination
              page={activePage}
              pageSize={BOOKINGS_PAGE_SIZE}
              onPageChange={handlePageChange}
              count={bookingsCount}
              disabled={isLoading}
            />
          )}
        </>
      )}
    </>
  );
};

export default Bookings;
