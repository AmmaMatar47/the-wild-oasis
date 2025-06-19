import { ButtonGroup, IconButton, Pagination, PaginationRootProps } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface TablePagination extends PaginationRootProps {
  disabled?: boolean;
}

const TablePagination = ({ disabled, ...props }: TablePagination) => {
  return (
    <Pagination.Root
      {...props}
      backgroundColor='var(--color-grey-50)'
      borderBottomRadius='md'
      boxShadow='-1px 0 0 0 var(--chakra-colors-border),1px 0 0 0 var(--chakra-colors-border),0 1px 0 0 var(--chakra-colors-border)'
    >
      <ButtonGroup variant='ghost' size='lg' w='full' gap='0'>
        <Pagination.PageText
          format='long'
          flex='1'
          color='var(--color-grey-600)'
          fontSize='1rem'
          paddingLeft='4'
        />
        <Pagination.PrevTrigger asChild>
          <IconButton
            _hover={{ bgColor: 'var(--color-brand-600)', color: '#fff' }}
            borderRadius='none'
            disabled={disabled}
          >
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.NextTrigger asChild>
          <IconButton
            _hover={{ bgColor: 'var(--color-brand-600)', color: '#fff' }}
            borderRadius='none'
            borderBottomEndRadius='md'
            disabled={disabled}
          >
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default TablePagination;
