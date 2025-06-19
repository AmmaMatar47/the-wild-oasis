import {
  createListCollection,
  Flex,
  SelectValueChangeDetails,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { CabinResponseType } from "../types/cabinsTypes";
import Segment from "@/components/Segment";
import CabinsTable from "@/features/cabins/CabinsTable";
import CreateCabin from "@/features/cabins/CreateCabin";
import { useSearchParams } from "react-router-dom";
import TablePagination from "@/components/TablePagination";
import Select from "@/components/Select";
import Heading from "@/components/Heading";
import { calculatePageRange } from "@/utils/helper";
import { getDataRange } from "@/services/api/indexApi";
import SectionHeader from "@/components/SectionHeader";
import PageError from "@/components/PageError";
import { CABINS_PAGE_SIZE } from "@/utils/constants";
import { getCabins } from "@/services/api/cabinsApi";

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
  // Cabins table
  const [cabins, setCabins] = useState<CabinResponseType[]>([]);
  const [cabinsCount, setCabinsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  // Cabins params
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = Number(searchParams?.get("page")) || 1;
  const sortingValue = searchParams?.get("order") || "name.asc";
  const activeSegment = searchParams?.get("discount") || "All";

  const fetchCabins = useCallback(
    async ({
      activeSorting = sortingValue,
      activeSegmentValue = activeSegment,
      activePageParam = activePage,
    }) => {
      try {
        setIsLoading(true);
        const cabinsData = await getCabins(
          activeSorting,
          activeSegmentValue,
          calculatePageRange(activePageParam, CABINS_PAGE_SIZE),
        );
        setCabins(cabinsData);
        setIsLoading(false);
      } catch {
        setError("Failed to load cabins");
      } finally {
        setIsLoading(false);
      }
    },
    [sortingValue, activeSegment, activePage],
  );

  useEffect(() => {
    fetchCabins({});
  }, [fetchCabins]);

  // Get the cabins Data length
  useEffect(() => {
    const getCabinsCount = async () => {
      const count = await getDataRange(
        "cabins",
        activeSegment === "All" ? null : { discount: activeSegment },
      );
      setCabinsCount(count);
    };
    getCabinsCount();
  }, [activeSegment]);

  const handlePageChange = ({ page }: { page: number }) => {
    setSearchParams((prevParams) => {
      prevParams.set("page", String(page));
      return prevParams;
    });
    fetchCabins({ activePageParam: page });
  };

  const handleSegmentValueChange = (value: string) => {
    fetchCabins({ activeSegmentValue: value, activePageParam: 1 });
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
    fetchCabins({ activeSorting: details.value[0], activePageParam: 1 });
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
          <CreateCabin fetchCabins={fetchCabins} />
        </Flex>
      </SectionHeader>
      {error === undefined ? (
        <>
          <CabinsTable
            cabins={cabins}
            fetchCabins={fetchCabins}
            isLoading={isLoading}
          />
          {cabinsCount <= CABINS_PAGE_SIZE || !cabinsCount ? null : (
            <TablePagination
              page={activePage}
              pageSize={CABINS_PAGE_SIZE}
              onPageChange={handlePageChange}
              count={cabinsCount}
              disabled={isLoading}
            />
          )}
        </>
      ) : (
        <PageError message={error} />
      )}
    </>
  );
};

export default Cabins;
