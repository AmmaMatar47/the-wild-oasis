import {
  createListCollection,
  Flex,
  SelectValueChangeDetails,
} from "@chakra-ui/react";
import Segment from "@/components/Segment";
import CabinsTable from "@/features/cabins/CabinsTable";
import CreateCabin from "@/features/cabins/CreateCabin";
import { useSearchParams } from "react-router-dom";
import TablePagination from "@/components/TablePagination";
import Select from "@/components/Select";
import Heading from "@/components/Heading";
import SectionHeader from "@/components/SectionHeader";
import PageError from "@/components/PageError";
import { CABINS_PAGE_SIZE } from "@/utils/constants";
import { useCabins } from "@/features/cabins/useCabins";

export interface FetchCabinsProps {
  activeSorting?: string;
  activeSegmentValue?: string;
  activePageParam?: number;
}

const segmentItems = [
  { label: "All", value: "All" },
  { label: "No discount", value: "eq.0" },
  { label: "With discount", value: "gt.0" },
];

const sortBy = createListCollection({
  items: [
    { label: "Name (A-Z)", value: "name.asc" },
    { label: "Name (Z-A)", value: "name.desc" },
    { label: "Price (High to Low)", value: "regularPrice.desc" },
    { label: "Price (Low to High)", value: "regularPrice.asc" },
    { label: "Capacity (High to Low)", value: "maxCapacity.desc" },
    { label: "Capacity (Low to High)", value: "maxCapacity.asc" },
  ],
});

const Cabins = () => {
  const { cabins, cabinsCount, error, isLoading, refetch } = useCabins();

  // Cabins params
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = Number(searchParams?.get("page")) || 1;
  const sortingValue = searchParams?.get("order") || "name.asc";
  const activeSegment = searchParams?.get("discount") || "All";

  const handlePageChange = ({ page }: { page: number }) => {
    setSearchParams((prevParams) => {
      prevParams.set("page", String(page));
      return prevParams;
    });
  };

  const handleSegmentValueChange = (value: string) => {
    setSearchParams((prevParams) => {
      prevParams.set("discount", value);
      prevParams.set("page", "1");
      return prevParams;
    });
  };

  const handleSortingValueChange = (
    details: SelectValueChangeDetails<{
      label: string;
      value: string;
    }>,
  ) => {
    setSearchParams((prevParams) => {
      prevParams.set("order", details.value[0]);
      prevParams.set("page", "1");
      return prevParams;
    });
  };

  return (
    <>
      <SectionHeader>
        <Heading>All cabins</Heading>
        <Flex gapX="1.125rem">
          <Segment
            items={segmentItems}
            value={activeSegment}
            onValueChange={handleSegmentValueChange}
          />

          <Select
            collection={sortBy}
            value={[sortingValue]}
            onValueChange={handleSortingValueChange}
            disabled={cabinsCount < 2}
          />
          <CreateCabin />
        </Flex>
      </SectionHeader>
      {error ? (
        <PageError
          message={"Failed to load cabins data, Please try again later."}
        />
      ) : (
        <>
          <CabinsTable
            cabins={cabins}
            fetchCabins={refetch}
            isLoading={isLoading}
          />
          {cabinsCount <= CABINS_PAGE_SIZE || !cabinsCount ? null : (
            <TablePagination
              page={activePage}
              pageSize={CABINS_PAGE_SIZE}
              onPageChange={handlePageChange}
              count={cabinsCount}
              itemsName="cabins"
            />
          )}
        </>
      )}
    </>
  );
};

export default Cabins;
