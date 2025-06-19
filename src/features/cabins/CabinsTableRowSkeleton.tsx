import Skeleton from "@/components/Skeleton";
import SkeletonText from "@/components/SkeletonText";
import { Table, Image } from "@chakra-ui/react";

const CabinsTableRowSkeleton = () => {
  return (
    <Table.Row minH="8.1rem" bgColor="var(--color-grey-0)">
      <Table.Cell w="16rem" padding=".1rem 0" display="flex" gap="2.4rem">
        <Skeleton borderRadius="0">
          <Image aspectRatio={4 / 3} h="4.4rem" w="6rem" />
        </Skeleton>
        <SkeletonText noOfLines={1} w="2rem" />
      </Table.Cell>
      <Table.Cell w="22rem">
        <SkeletonText noOfLines={1} w="9rem" />
      </Table.Cell>
      <Table.Cell w="16rem">
        <SkeletonText noOfLines={1} w="7rem" />
      </Table.Cell>
      <Table.Cell w="12rem">
        <SkeletonText noOfLines={1} w="6rem" />
      </Table.Cell>
      <Table.Cell textAlign="end" paddingRight="1.6rem">
        <SkeletonText noOfLines={1} alignSelf="end" h="2rem" w="1rem" />
      </Table.Cell>
    </Table.Row>
  );
};

export default CabinsTableRowSkeleton;
