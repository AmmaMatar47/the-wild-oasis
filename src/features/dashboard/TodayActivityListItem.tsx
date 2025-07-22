import Button from "@/components/Button";
import { TodaysBookingsType } from "@/types/bookingsTypes";
import { Badge, Flex, List, Text, ListItemProps } from "@chakra-ui/react";
import { Link } from "react-router";
import { useCheckout } from "./../bookings/useCheckout";
import { useQueryClient } from "@tanstack/react-query";

interface TodayActivityListItem extends ListItemProps {
  data: TodaysBookingsType;
}

const TodayActivityListItem = ({ data, ...props }: TodayActivityListItem) => {
  const queryClient = useQueryClient();
  const { checkout } = useCheckout();

  const handleCheckout = () => {
    checkout(data.id, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["today-activity"] });
      },
    });
  };

  return (
    <List.Item {...props}>
      <Flex justifyContent="space-between" alignItems="center" paddingY="3">
        <Flex gap="3" alignItems="center">
          <Badge
            rounded="full"
            colorPalette={data.status === "unconfirmed" ? "green" : "blue"}
            fontWeight="600"
            w="5.6rem"
            justifyContent="center"
            textTransform="uppercase"
          >
            {data.status === "unconfirmed" ? "Arriving" : "Departing"}
          </Badge>
          <Text fontFamily='"Twemoji Country Flags", "Poppins", sans-serif'>
            {data.guests.countryFlag}
          </Text>
          <Text
            fontSize="0.9rem"
            fontWeight="500"
            color="var(--color-grey-700)"
          >
            {data.guests.fullName}
          </Text>
        </Flex>
        <Flex gap="4">
          <Text fontSize="0.87rem">{data.numNights} nights</Text>
          {data.status === "unconfirmed" ? (
            <Button
              size="2xs"
              paddingX="3"
              fontSize=".75rem"
              w="5.6rem"
              textTransform="uppercase"
            >
              <Link to={`/checkin/${data.id}`}>Check in</Link>
            </Button>
          ) : (
            <Button
              size="2xs"
              paddingX="3"
              fontSize=".75rem"
              w="5.6rem"
              textTransform="uppercase"
              onClick={handleCheckout}
            >
              Check out
            </Button>
          )}
        </Flex>
      </Flex>
    </List.Item>
  );
};

export default TodayActivityListItem;
