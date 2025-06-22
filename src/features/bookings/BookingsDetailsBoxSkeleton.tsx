import Skeleton from "@/components/Skeleton";
import SkeletonText from "@/components/SkeletonText";
import { Box, Circle, Container, Flex, Stack } from "@chakra-ui/react";
import { HiOutlineHomeModern } from "react-icons/hi2";

const BookingsDetailsBoxSkeleton = () => {
  return (
    <Stack marginBottom="8" gap="0" boxShadow="var(--shadow-sm)">
      {/* Header Section Skeleton */}
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
          <Skeleton height="24px" width="200px" />
        </Container>

        <Skeleton height="24px" width="400px" marginRight="10" />
      </Flex>

      {/* Details Section Skeleton */}
      <Box
        color="var(--color-grey-700)"
        bgColor="var(--color-grey-0)"
        paddingTop="8"
        paddingBottom="5"
        paddingX="10"
        borderBottomRadius="md"
      >
        {/* Guest Info Skeleton */}
        <Flex padding="0" gap="3" alignItems="center" marginBottom="6">
          <Skeleton height="20px" width="20px" />
          <Skeleton height="20px" width="150px" />
          <Circle size="1" bgColor="var(--color-grey-300)" />
          <Skeleton height="20px" width="120px" />
          <Circle size="1" bgColor="var(--color-grey-300)" />
          <Skeleton height="20px" width="180px" />
        </Flex>

        {/* Observation Skeleton */}
        <SkeletonText noOfLines={1} marginBottom="3" height="20px" w="16rem" />

        {/* Breakfast Skeleton */}
        <SkeletonText noOfLines={1} marginBottom="10" height="20px" w="16rem" />

        {/* Payment Skeleton */}
        <Skeleton marginBottom="6" h="76px" />

        {/* Booking Date Skeleton */}
        <Flex justifyContent="flex-end">
          <Skeleton height="16px" width="220px" />
        </Flex>
      </Box>
    </Stack>
  );
};

export default BookingsDetailsBoxSkeleton;
