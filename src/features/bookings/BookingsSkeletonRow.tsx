import Skeleton from '@/components/Skeleton';
import SkeletonText from '@/components/SkeletonText';
import { Table, Flex } from '@chakra-ui/react';

const BookingsSkeletonRow = () => {
  return (
    <Table.Row
      backgroundColor='var(--color-grey-0)'
      color='var(--color-grey-600)'
      borderColor='var(--color-grey-100)'
      h='4.5rem'
    >
      <Table.Cell padding='0 2rem' w='10rem'>
        <SkeletonText noOfLines={1} w='8' />
      </Table.Cell>

      <Table.Cell paddingRight='6.8rem'>
        <SkeletonText noOfLines={2} />
      </Table.Cell>

      <Table.Cell paddingRight='4rem'>
        <SkeletonText noOfLines={2} />
      </Table.Cell>

      <Table.Cell paddingRight='3rem'>
        <Skeleton h='4' />
      </Table.Cell>

      <Table.Cell w='9rem'>
        <SkeletonText noOfLines={1} />
      </Table.Cell>

      <Table.Cell width='10%'>
        <Flex display='flex' justifyContent='end' alignItems='center' paddingRight='1rem'>
          <Skeleton w='4' h='8' paddingY='auto' />
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default BookingsSkeletonRow;
