import { BookingDetailsType } from "@/types/bookingsTypes";
import {
  formatDateToReadable,
  formatTimeToNow,
  formatToUSCurrency,
} from "@/utils/helper";
import { Box, Circle, Container, Flex, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

const BookingsDetailsBox = ({ booking }: { booking: BookingDetailsType }) => {
  return (
    <Stack marginBottom="8" gap="0" boxShadow="var(--shadow-sm)">
      <Flex
        bgColor="var(--color-brand-500)"
        width="100%"
        paddingY="5"
        borderTopRadius="md"
        alignItems="center"
        color="#fff"
      >
        <Container
          display="flex"
          fontSize="lg"
          fontWeight="500"
          gap="3"
          alignItems="center"
        >
          <HiOutlineHomeModern size="32" />
          {booking.numNights} night(s) in Cabin {booking.cabins.name}
        </Container>

        {
          <Text fontWeight="500" fontSize="lg" width="100%">
            {formatDateToReadable(booking.startDate, "EEE, MMM dd yyyy")} (
            {formatTimeToNow(booking.startDate)}) &mdash;{" "}
            {formatDateToReadable(booking.endDate, "EEE, MMM dd yyyy")}
          </Text>
        }
      </Flex>
      <Box
        color="var(--color-grey-700)"
        bgColor="var(--color-grey-0)"
        paddingTop="8"
        paddingBottom="5"
        paddingX="10"
        borderBottomRadius="md"
      >
        <Flex
          padding="0"
          gap="3"
          alignItems="center"
          marginBottom="6"
          fontFamily='"Twemoji Country Flags", "Poppins", sans-serif'
        >
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

        <Flex alignItems="center" gap="2" marginBottom="3">
          <HiOutlineChatBubbleBottomCenterText
            stroke="var(--color-brand-500)"
            size={20}
          />
          <Text fontWeight="500" letterSpacing=".2px">
            Observation
          </Text>
          <Text>{booking.observations ?? "No Notes"}</Text>
        </Flex>

        <Flex alignItems="center" gap="2" marginBottom="10">
          <HiOutlineCheckCircle stroke="var(--color-brand-500)" size={20} />
          <Text fontWeight="500" letterSpacing=".2px">
            Breakfast included?
          </Text>{" "}
          <span>{booking.hasBreakfast ? "Yes" : "No"}</span>
        </Flex>

        <Box
          display="flex"
          bgColor={
            booking.isPaid
              ? `var(--color-green-100)`
              : `var(--color-yellow-100)`
          }
          color={
            booking.isPaid
              ? `var(--color-green-700)`
              : `var(--color-yellow-700)`
          }
          padding="6"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="6"
          borderRadius="md"
          fontWeight="500"
        >
          <Flex alignItems="center" gap="2">
            <HiOutlineCurrencyDollar size="24" />
            <Text>Total price {formatToUSCurrency(booking.totalPrice)}</Text>
          </Flex>
          <Text fontSize="sm">
            {booking.isPaid ? "PAID" : "WILL PAY AT PROPERTY"}
          </Text>
        </Box>

        <Text textAlign="end" fontSize="xs" color="var(--color-grey-500)">
          Booked {formatDateToReadable(booking.startDate, "EEE, MMM dd yyyy")}{" "}
          {format(booking.startDate, "h:mm a")}
        </Text>
      </Box>
    </Stack>
  );
};

export default BookingsDetailsBox;
