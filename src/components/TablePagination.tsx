import {
  ButtonGroup,
  IconButton,
  Pagination,
  PaginationRootProps,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const TablePagination = ({ ...props }: PaginationRootProps) => {
  return (
    <Pagination.Root
      {...props}
      backgroundColor="var(--color-grey-50)"
      boxShadow="xs"
      borderBottomRadius="md"
    >
      <ButtonGroup variant="ghost" size="lg" w="full">
        <Pagination.PageText
          format="long"
          flex="1"
          color="var(--color-grey-600)"
          fontSize="1rem"
          paddingLeft="4"
        />
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default TablePagination;
