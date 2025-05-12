import {
  createListCollection,
  Flex,
  Heading,
  Portal,
  Select,
  SelectValueChangeDetails,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CabinType, getCabins, getDataRange } from "@/services";
import Spinner from "@/components/Spinner/Spinner";
import Segment from "@/components/Segment/Segment";
import CabinsTable from "@/features/cabins/CabinsTable/CabinsTable";
import CreateCabin from "@/features/cabins/CreateCabin/CreateCabin";
import { useSearchParams } from "react-router-dom";
import TablePagination from "@/components/TablePagination";

const segmentItems = [
  { label: "All", value: "All" },
  { label: "No discount", value: "eq.0" },
  { label: "With discount", value: "gt.0" },
];

const sortBy = createListCollection({
  items: [
    { label: "name (A-Z)", value: "name.asc" },
    { label: "name (Z-A)", value: "name.desc" },
    { label: "price (low first)", value: "regularPrice.asc" },
    { label: "price (high first)", value: "regularPrice.desc" },
    { label: "capacity (low first)", value: "maxCapacity.asc" },
    { label: "capacity (high first)", value: "maxCapacity.desc" },
  ],
});

const pageSize = 6;

const calculatePageRange = (page: number, pageSize: number) => {
  const start = (page - 1) * pageSize;
  const end = page * pageSize - 1;
  const range = `${start}-${end}`;

  return range;
};

const Cabins = () => {
  // Cabins table
  const [cabins, setCabins] = useState<CabinType[]>([]);
  const [cabinsCount, setCabinsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cabins params
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = Number(searchParams?.get("page")) || 1;
  const cabinsRange = calculatePageRange(activePage, pageSize);
  const sortingValue = searchParams?.get("order") || "name.asc";
  const activeSegment = searchParams?.get("discount") || "All";

  useEffect(() => {
    handleFetchCabins({});
  }, []);

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
  }, [cabinsCount, activeSegment]);

  const handleFetchCabins = async ({
    activeSorting = sortingValue,
    activeSegmentValue = activeSegment,
    curCabinsRange = cabinsRange,
  }) => {
    setIsLoading(true);
    const cabinsData = await getCabins(
      activeSorting,
      activeSegmentValue,
      curCabinsRange,
    );
    setCabins(cabinsData);
    setIsLoading(false);
  };

  const handlePageChange = ({ page }: { page: number }) => {
    handleFetchCabins({ curCabinsRange: cabinsRange });
    setSearchParams((prevParams) => {
      prevParams.set("page", String(page));
      return prevParams;
    });
  };

  const handleSegmentValueChange = (value: string) => {
    handleFetchCabins({ activeSegmentValue: value });
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
    handleFetchCabins({ activeSorting: sortingValue });
    setSearchParams((prevParams) => {
      prevParams.set("order", details.value[0]);
      return prevParams;
    });
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading
          as="h2"
          fontSize="3xl"
          color="var(--color-grey-700)"
          fontFamily="Poppins, sans-serif"
          fontWeight="600"
          lineHeight="1.05"
        >
          All cabins
        </Heading>
        <Flex gapX="1.125rem">
          <Segment
            items={segmentItems}
            value={activeSegment}
            onValueChange={handleSegmentValueChange}
          />

          <Select.Root
            collection={sortBy}
            size="md"
            width="12.5rem"
            variant="subtle"
            onValueChange={handleSortingValueChange}
            defaultValue={[sortingValue]}
            disabled={cabinsCount === 0}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger
                bg="var(--color-grey-0)"
                borderRadius="md"
                shadow="var(--shadow-sm)"
                padding=".625rem"
              >
                <Select.ValueText
                  placeholder="Sort by"
                  fontSize=".875rem"
                  fontWeight="500"
                  color="var(--color-grey-700)"
                />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {sortBy.items.map((sortBy) => (
                    <Select.Item
                      item={sortBy}
                      key={sortBy.value}
                      fontSize=".875rem"
                    >
                      {sortBy.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Flex>
      </Flex>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CabinsTable cabins={cabins} />
          {cabinsCount === 0 || !cabinsCount ? null : (
            <TablePagination
              page={activePage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              count={cabinsCount}
            />
          )}
        </>
      )}

      <CreateCabin />
    </>
  );
};

export default Cabins;
