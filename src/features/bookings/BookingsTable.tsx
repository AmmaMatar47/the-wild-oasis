import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiOutlineCalendarDays,
  HiTrash,
} from "react-icons/hi2";

import { Flex, For, Menu, Strong, Table, Text } from "@chakra-ui/react";
import EmptyPage from "@/components/EmptyPage";
import { checkOut, deleteBooking } from "@/services/api/bookingsApi";
import {
  formatDateToReadable,
  formatTimeToNow,
  formatToUSCurrency,
} from "../../utils/helper";
import MenuContainer from "@/components/MenuContainer";
import DeleteDialog from "@/components/DeleteDialog";
import { useState } from "react";
import { Link } from "react-router";
import StatusBadge from "@/components/StatusBadge";
import { BookingsType } from "@/types/bookingsTypes";
import BookingsSkeletonRow from "./BookingsSkeletonRow";
import { FetchBookingsProps } from "@/pages/Bookings";
import { BOOKINGS_PAGE_SIZE } from "@/utils/constants";

const BookingsTable = ({
  bookings,
  isLoading,
  fetchBookings,
}: {
  bookings: BookingsType[];
  isLoading: boolean;
  fetchBookings: ({
    status,
    page,
    sortBy,
  }: Partial<FetchBookingsProps>) => void;
}) => {
  const [deleteDialogInfo, setDeleteDialogInfo] = useState<{
    id: number | null;
    open: boolean;
    guestName: string;
  }>({
    id: null,
    open: false,
    guestName: "",
  });

  const handleToggleDeleteDialog = (id: number | null, guestName: string) => {
    setDeleteDialogInfo((prevInfo) => {
      return { id, guestName, open: !prevInfo.open };
    });
  };

  const handleDeleteBooking = (id: number) => {
    deleteBooking(id).then(() => {
      setDeleteDialogInfo(() => {
        return { id: null, open: false, guestName: "" };
      });
      fetchBookings({});
    });
  };

  const handleCheckOut = (id: number) => {
    checkOut(id);
    fetchBookings({});
  };

  return bookings.length !== 0 || isLoading ? (
    <>
      <Table.Root
        variant="outline"
        size="sm"
        borderTopRadius="md"
        fontSize="0.875rem"
        // boxShadow='0 0 0 1px var(--color-grey-200)'
      >
        {/* Table Header */}
        <Table.Header backgroundColor="var(--color-grey-50)">
          <Table.Row textTransform="uppercase">
            <Table.ColumnHeader className="table-head" padding="0 2rem">
              Cabin
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head">
              Guest
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head">
              Stay duration
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head">
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head">
              Amount
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        {/* Table Body */}
        <Table.Body>
          {isLoading ? (
            <For each={new Array(BOOKINGS_PAGE_SIZE).fill("")}>
              {() => <BookingsSkeletonRow key={crypto.randomUUID()} />}
            </For>
          ) : (
            bookings?.map((booking) => (
              <Table.Row
                key={booking.id}
                backgroundColor="var(--color-grey-0)"
                color="var(--color-grey-600)"
                borderColor="var(--color-grey-100)"
                h="4.5rem"
              >
                <Table.Cell
                  fontFamily="Sono"
                  fontSize="1rem"
                  fontWeight="600"
                  padding="0 2rem"
                >
                  {booking.cabins.name}
                </Table.Cell>

                <Table.Cell>
                  <Text fontWeight="500" fontSize=".9rem">
                    {booking.guests.fullName}
                  </Text>
                  <Text color="var(--color-grey-500)" fontSize="xs">
                    {booking.guests.email}
                  </Text>
                </Table.Cell>

                <Table.Cell>
                  <Flex fontSize=".85rem" fontWeight="500">
                    {formatTimeToNow(booking.startDate)} &rarr;{" "}
                    {booking.numNights} night
                    {booking.numNights === 1 ? "" : "s"} stay
                  </Flex>
                  <Text
                    fontSize="xs"
                    flexDirection="row"
                    color="var(--color-grey-500)"
                  >
                    {formatDateToReadable(booking.startDate)} &mdash;{" "}
                    {formatDateToReadable(booking.endDate)}
                  </Text>
                </Table.Cell>

                <Table.Cell>
                  <StatusBadge status={booking.status}>
                    {booking.status}
                  </StatusBadge>
                </Table.Cell>

                <Table.Cell fontFamily="Sono" fontWeight="500">
                  {formatToUSCurrency(booking.totalPrice)}
                </Table.Cell>

                {/* Menu */}
                <Table.Cell textAlign="end">
                  <MenuContainer>
                    <Menu.Item
                      color="var(--color-grey-600)"
                      value="see-details"
                      className="menu-link"
                      asChild
                      _highlighted={{ bgColor: "var(--color-grey-100)" }}
                    >
                      <Link to={`${booking.id}`}>
                        <HiEye />
                        View details
                      </Link>
                    </Menu.Item>

                    {booking.status === "unconfirmed" && (
                      <Menu.Item
                        value="check-in"
                        color="var(--color-grey-600)"
                        _highlighted={{ bgColor: "var(--color-grey-100)" }}
                        asChild
                      >
                        <Link to={`/checkin/${booking.id}`}>
                          <HiArrowDownOnSquare />
                          Check in
                        </Link>
                      </Menu.Item>
                    )}
                    {booking.status === "checked-in" && (
                      <Menu.Item
                        value="check-out"
                        color="var(--color-grey-600)"
                        onClick={() => handleCheckOut(booking.id)}
                        _highlighted={{ bgColor: "var(--color-grey-100)" }}
                      >
                        <HiArrowUpOnSquare />
                        Check out
                      </Menu.Item>
                    )}
                    <Menu.Item
                      value="delete-cabin"
                      color="fg.error"
                      _highlighted={{ bg: "bg.error", color: "fg.error" }}
                      onClick={() =>
                        handleToggleDeleteDialog(
                          booking.id,
                          booking.guests.fullName,
                        )
                      }
                    >
                      <HiTrash />
                      Delete booking
                    </Menu.Item>
                  </MenuContainer>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>

      <DeleteDialog
        title="Delete booking"
        onDelete={() => handleDeleteBooking(deleteDialogInfo.id as number)}
        open={deleteDialogInfo.open}
        onOpenChange={() => handleToggleDeleteDialog(null, "")}
      >
        Are you sure you want to delete{" "}
        <Strong color="var(--color-grey-700)" fontWeight="500">
          {deleteDialogInfo.guestName}'s
        </Strong>{" "}
        booking? It will be permanently deleted, and this action cannot be
        undone.
      </DeleteDialog>
    </>
  ) : (
    <EmptyPage
      title="No Bookings Yet"
      description="No reservations are currently scheduled"
      Icon={HiOutlineCalendarDays}
    />
  );
};

export default BookingsTable;
