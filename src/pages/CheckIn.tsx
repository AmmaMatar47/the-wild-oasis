import { useNavigate, useParams } from "react-router";
import BookingsDetailsBox from "../features/bookings/BookingsDetailsBox";
import { useEffect, useState } from "react";
import { checkIn, getBookingById } from "@/services/api/bookingsApi";
import SectionHeader from "@/components/SectionHeader";
import Heading from "../components/Heading";
import BackButton from "@/components/BackButton";
import { Box, Flex, Text } from "@chakra-ui/react";
import { getSettings, SettingsType } from "@/services/api/settingsApi";
import { formatToUSCurrency } from "@/utils/helper";
import Checkbox from "@/components/Checkbox";
import { Tooltip } from "@/components/ui/tooltip";
import PageError from "@/components/PageError";
import { BookingDetailsType } from "@/types/bookingsTypes";
import Button from "@/components/Button";
import BookingsDetailsBoxSkeleton from "@/features/bookings/BookingsDetailsBoxSkeleton";
import CheckboxSkeleton from "@/components/CheckboxSkeleton";

const CheckIn = () => {
  const params = useParams();
  const navigate = useNavigate();
  const bookingId = Number(params.bookingsId);
  const [booking, setBooking] = useState<BookingDetailsType>();
  const [settings, setSettings] = useState<SettingsType>();
  const [isLoading, setIsLoading] = useState(true);
  const [addBreakfastChecked, setAddBreakfastChecked] = useState(false);
  const [paidChecked, setPaidChecked] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const bookingData = await getBookingById(bookingId);
        if (bookingData[0].isPaid) setPaidChecked(true);
        setBooking(bookingData[0]);

        const settingsData = await getSettings();
        setSettings(settingsData[0]);
        setIsLoading(false);
      } catch {
        throw new Error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleCheckIn = () => {
    if (booking === undefined || settings === undefined) return;

    let price = booking.totalPrice;
    if (addBreakfastChecked) {
      price += settings.breakfastPrice;
    }

    checkIn(
      bookingId,
      booking?.hasBreakfast ? booking.hasBreakfast : addBreakfastChecked,
      price,
    ).then(() => navigate(-1));
  };

  return !isLoading && (booking === undefined || settings === undefined) ? (
    <PageError message="Failed to load Data" />
  ) : (
    <>
      <SectionHeader>
        <Heading>Check in booking #{bookingId}</Heading> <BackButton />
      </SectionHeader>

      {isLoading || booking === undefined ? (
        <BookingsDetailsBoxSkeleton />
      ) : (
        <BookingsDetailsBox booking={booking} />
      )}

      {!isLoading && booking && settings ? (
        !booking.hasBreakfast && (
          <Box marginBottom="6" boxShadow="var(--shadow-sm)">
            <Checkbox
              checked={addBreakfastChecked}
              onCheckedChange={(e) => {
                if (
                  booking.hasBreakfast === addBreakfastChecked &&
                  booking.isPaid
                )
                  setPaidChecked(false);
                if (
                  booking.hasBreakfast !== addBreakfastChecked &&
                  booking.isPaid
                )
                  setPaidChecked(true);

                setAddBreakfastChecked(!!e.checked);
              }}
              cursor="pointer"
            >
              <Text>
                Want to add breakfast for{" "}
                {formatToUSCurrency(settings.breakfastPrice)}?
              </Text>
            </Checkbox>
          </Box>
        )
      ) : (
        <CheckboxSkeleton />
      )}

      {!isLoading && booking && settings ? (
        <Tooltip
          content="This booking is marked as paid and cannot be charged again."
          disabled={!(booking.isPaid && paidChecked)}
        >
          <Box marginBottom="8" boxShadow="var(--shadow-sm)">
            <Checkbox
              checked={paidChecked}
              onCheckedChange={(e) => setPaidChecked(!!e.checked)}
              bgColor="var(--color-grey-0)"
              disabled={booking.isPaid && paidChecked}
              cursor="pointer"
            >
              I confirm that {booking.guests.fullName} has paid the total amount
              of{" "}
              {addBreakfastChecked
                ? formatToUSCurrency(
                    booking.totalPrice + settings.breakfastPrice,
                  )
                : formatToUSCurrency(booking.totalPrice)}{" "}
              {addBreakfastChecked &&
                `(${formatToUSCurrency(booking.totalPrice)} + ${formatToUSCurrency(settings.breakfastPrice)})`}
            </Checkbox>
          </Box>
        </Tooltip>
      ) : (
        <CheckboxSkeleton />
      )}

      <Flex justifyContent="end">
        <Tooltip
          content="Please verify payment before checking in"
          disabled={paidChecked}
        >
          <Button disabled={!paidChecked} onClick={handleCheckIn}>
            Check in booking #{bookingId}
          </Button>
        </Tooltip>
      </Flex>
    </>
  );
};

export default CheckIn;
