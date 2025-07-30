import { ButtonGroup, IconButton, Pagination, PaginationRootProps, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface TablePagination extends PaginationRootProps {
  itemsName: string;
}

const TablePagination = ({ itemsName, ...props }: TablePagination) => {
  return (
    <Pagination.Root
      {...props}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingY="6px"
      w="100%"
      backgroundColor="var(--color-grey-50)"
      borderBottomRadius="md"
      boxShadow="-1px 0 0 0 var(--chakra-colors-border),1px 0 0 0 var(--chakra-colors-border),0 1px 0 0 var(--chakra-colors-border)"
    >
      <ButtonGroup variant="plain" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={page => (
            <IconButton
              _selected={{
                bgColor: "var(--color-brand-600) !important",
                color: "#fff",
              }}
              _hover={{
                bgColor: "var(--color-grey-100)",
              }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>

      <Text fontSize="sm" color="var(--color-grey-500)" fontWeight="500" paddingRight="4">
        Total {itemsName}: {props.count}
      </Text>
    </Pagination.Root>
  );
};

export default TablePagination;
