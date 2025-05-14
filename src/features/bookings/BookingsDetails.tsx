import DeleteDialog from "@/components/DeleteDialog";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner/Spinner";
import StatusBadge from "@/components/StatusBadge";
import {
  BookingDetails,
  deleteBooking,
  getBookingById,
} from "@/services/api/bookingsApi";
import {
  formatDateToReadable,
  formatTimeToNow,
  formatToUSCurrency,
} from "@/utils/helper";
import {
  Box,
  Button,
  Circle,
  Container,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { useParams, useNavigate, Link } from "react-router";

const BookingsDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookingsId = Number(params.bookingsId);
  const [booking, setBooking] = useState<BookingDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);
      const bookingRes = await getBookingById(bookingsId);
      setBooking(bookingRes[0]);
      setIsLoading(false);
    };
    fetchBooking();
  }, []);

  const handleGoBack = () => navigate(-1);

  const handleToggleDeleteDialog = () => setIsDeleteOpen((open) => !open);

  const handleDeleteBooking = () => {
    deleteBooking(bookingsId).then(() => {
      setIsDeleteOpen((open) => !open);
      handleGoBack();
    });
  };

  return isLoading || booking === undefined ? (
    <Spinner />
  ) : (
    <>
      <Flex justifyContent="space-between" marginBottom="10">
        <Flex alignItems="center" gap="4">
          <Header>Check in booking #{bookingsId} </Header>
          <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
        </Flex>
        <Button
          bgColor="var(--color-brand-600)"
          _hover={{ bgColor: "var(--color-brand-700)" }}
          fontSize="md"
          onClick={handleGoBack}
        >
          &larr; Back
        </Button>
      </Flex>
      <Stack gap="0" marginBottom="8" boxShadow="var(--shadow-sm)">
        <Flex
          bgColor="var(--color-brand-500)"
          width="100%"
          paddingY="5"
          color="var(--color-grey-200)"
          borderTopRadius="md"
          alignItems="center"
        >
          <Container
            display="flex"
            fontSize="lg"
            fontWeight="500"
            gap="3"
            alignItems="center"
          >
            <HiOutlineHomeModern size="32" />
            {booking.numNights} nights in Cabin {booking.cabins.name}
          </Container>

          <Text fontWeight="500" fontSize="lg" width="100%">
            {formatDateToReadable(booking.startDate, "EEE, MMM dd yyyy")} (
            {formatTimeToNow(booking.startDate)}) &mdash;{" "}
            {formatDateToReadable(booking.endDate, "EEE, MMM dd yyyy")}
          </Text>
        </Flex>

        <Box
          color="var(--color-grey-700)"
          bgColor="var(--color-grey-0)"
          paddingY="8"
          paddingX="10"
          borderBottomRadius="md"
        >
          <Flex padding="0" gap="3" alignItems="center" marginBottom="6">
            {booking.guests.countryFlag}{" "}
            <Text fontWeight="500">
              {booking.guests.fullName} + {booking.numGuests} guests
            </Text>
            <Circle size="1" bgColor="var(--color-grey-500)" />
            <Text color="var(--color-grey-500)">{booking.guests.email}</Text>
            <Circle size="1" bgColor="var(--color-grey-500)" />
            <Text color="var(--color-grey-500)">
              National ID {booking.guests.nationalID}
            </Text>
          </Flex>

          <Flex alignItems="center" gap="3" marginBottom="3">
            <HiOutlineChatBubbleBottomCenterText stroke="var(--color-brand-500)" />
            <Text fontWeight="500" letterSpacing=".2px">
              Observation <span>{booking.observations}</span>
            </Text>
          </Flex>

          <Flex alignItems="center" gap="3" marginBottom="10">
            <HiOutlineCheckCircle stroke="var(--color-brand-500)" />
            <Text fontWeight="500" letterSpacing=".2px">
              Breakfast included?{" "}
            </Text>{" "}
            <span>{booking.hasBreakfast ? "Yes" : "No"}</span>
          </Flex>

          <Box
            display="flex"
            bgColor="var(--color-yellow-100)"
            color="var(--color-yellow-700)"
            padding="6"
            justifyContent="space-between"
            marginBottom="6"
            borderRadius="sm"
            fontWeight="500"
          >
            <Flex alignItems="center" gap="2">
              <HiOutlineCurrencyDollar />
              <Text>Total price {formatToUSCurrency(booking.totalPrice)}</Text>
            </Flex>
            <Text>WILL PAY AT PROPERTY</Text>
          </Box>

          <Text textAlign="end" fontSize="xs" color="var(--color-grey-500)">
            Booked {formatDateToReadable(booking.startDate, "EEE, MMM dd yyyy")}{" "}
            {format(booking.startDate, "h:mm a")}
          </Text>
        </Box>
      </Stack>
      <Flex justifyContent="end" gap="4">
        <Button
          bgColor="var(--color-brand-600)"
          _hover={{ bgColor: "var(--color-brand-700)" }}
        >
          <Link to={`/checkin/${booking.cabinId}`}>Check in</Link>
        </Button>
        <Button
          bgColor="var(--color-red-700)"
          _hover={{ bgColor: "var(--color-red-800)" }}
          onClick={handleToggleDeleteDialog}
        >
          Delete Booking
        </Button>
      </Flex>
      <DeleteDialog
        title="Delete booking"
        onDelete={handleDeleteBooking}
        open={isDeleteOpen}
        onOpenChange={handleToggleDeleteDialog}
      >
        Are you sure you want to delete this booking permanently? This action
        cannot be undone.
      </DeleteDialog>
    </>
  );
};

export default BookingsDetails;
