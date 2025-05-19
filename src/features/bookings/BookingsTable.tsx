import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiOutlineCalendarDays,
  HiTrash,
} from "react-icons/hi2";

import { Flex, Menu, Table, Text } from "@chakra-ui/react";
import EmptyPage from "@/components/EmptyPage";
import {
  BookingsType,
  checkOut,
  deleteBooking,
} from "@/services/api/bookingsApi";
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

const BookingsTable = ({ bookings }: { bookings: BookingsType[] }) => {
  const [deleteDialogInfo, setDeleteDialogInfo] = useState<{
    id: number | null;
    open: boolean;
  }>({
    id: null,
    open: false,
  });

  const handleToggleDeleteDialog = (id: number | null) => {
    setDeleteDialogInfo((prevInfo) => {
      return { id: id, open: !prevInfo.open };
    });
  };

  const handleDeleteBooking = (id: number) => {
    deleteBooking(id).then(() => {
      setDeleteDialogInfo(() => {
        return { id: null, open: false };
      });
    });
  };

  const handleCheckOut = (id: number) => {
    checkOut(id);
  };

  return bookings.length !== 0 ? (
    <>
      <Table.Root
        variant="outline"
        size="sm"
        borderTopRadius="md"
        fontSize="0.875rem"
      >
        {/* Table Header */}
        <Table.Header backgroundColor="var(--color-grey-50)">
          <Table.Row>
            <Table.ColumnHeader className="table-head" padding="0 2rem">
              CABIN
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head">
              GUEST
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head">
              DATES
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head">
              STATUS
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head">
              AMOUNT
            </Table.ColumnHeader>
            <Table.ColumnHeader className="table-head"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        {/* Table Body */}
        <Table.Body>
          {bookings?.map((booking) => (
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
                  {booking.numNights} nights stay
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
                  >
                    <Link to={`${booking.id}`}>
                      <HiEye />
                      See details
                    </Link>
                  </Menu.Item>
                  {booking.status === "unconfirmed" && (
                    <Menu.Item
                      value="check-in"
                      color="var(--color-grey-600)"
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
                    >
                      <HiArrowUpOnSquare />
                      Check out
                    </Menu.Item>
                  )}
                  <Menu.Item
                    value="delete-cabin"
                    color="fg.error"
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                    onClick={() => handleToggleDeleteDialog(booking.id)}
                  >
                    <HiTrash />
                    Delete bookings
                  </Menu.Item>
                </MenuContainer>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <DeleteDialog
        title="Delete booking"
        onDelete={() => handleDeleteBooking(deleteDialogInfo.id as number)}
        open={deleteDialogInfo.open}
        onOpenChange={() => handleToggleDeleteDialog(null)}
      >
        Are you sure you want to delete this booking permanently? This action
        cannot be undone.
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
