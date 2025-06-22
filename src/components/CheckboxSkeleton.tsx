import { Flex } from "@chakra-ui/react";
import Skeleton from "./Skeleton";
import SkeletonText from "./SkeletonText";

const CheckboxSkeleton = () => {
  return (
    <Flex
      bgColor="var(--color-grey-0)"
      color="var(--color-grey-700)"
      colorPalette="purple"
      width="100%"
      padding="6"
      borderRadius="sm"
      marginBottom="8"
      gap="1rem"
      alignItems="center"
    >
      <Skeleton w="1.3rem" h="1.3rem" />
      <SkeletonText noOfLines={1} />
    </Flex>
  );
};

export default CheckboxSkeleton;
