import { TodaysBookingsType } from "@/types/bookingsTypes";
import {
  Badge,
  Flex,
  List,
  Image,
  Text,
  Button,
  ListItemProps,
} from "@chakra-ui/react";
import { Link } from "react-router";

interface ListItem extends ListItemProps {
  data: TodaysBookingsType;
  key: number | string;
}

const ListItem = ({ data, key, ...props }: ListItem) => {
  return (
    <List.Item key={key} {...props}>
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
          <Image src={data.guests.countryFlag} />
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
            <Link to={`/checkin/${data.id}`}>
              <Button
                size="2xs"
                paddingX="3"
                fontSize=".75rem"
                w="5.6rem"
                textTransform="uppercase"
                bgColor="var(--color-brand-500)"
              >
                Check in
              </Button>
            </Link>
          ) : (
            <Button
              size="2xs"
              paddingX="3"
              fontSize=".75rem"
              w="5.6rem"
              bgColor="var(--color-brand-500)"
              textTransform="uppercase"
            >
              Check out
            </Button>
          )}
        </Flex>
      </Flex>
    </List.Item>
  );
};

export default ListItem;
