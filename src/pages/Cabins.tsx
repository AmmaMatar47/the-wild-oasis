import {
  createListCollection,
  Flex,
  Heading,
  Portal,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CabinType, getCabins } from "@/services";
import Spinner from "@/components/Spinner/Spinner";
import Segment from "@/components/Segment/Segment";
import CabinsTable from "@/features/cabins/CabinsTable/CabinsTable";
import CreateCabin from "@/features/cabins/CreateCabin/CreateCabin";

const segmentItems = [
  "All",
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

const Cabins = () => {
  const [cabins, setCabins] = useState<CabinType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSegment, setActiveSegment] = useState("All");
  const [selectedValue, setSelectedValue] = useState({ order: "name.asc" });

  useEffect(() => {
    const fetchCabins = async () => {
      setIsLoading(true);
      const cabinsData = await getCabins(
        activeSegment === "All"
          ? selectedValue
          : { ...selectedValue, discount: activeSegment },
      );
      setCabins(cabinsData);
      setIsLoading(false);
    };
    fetchCabins();
  }, [selectedValue, activeSegment]);

  if (!cabins) return;

  return (
    <div>
      <Flex justifyContent="space-between">
        <Heading
          as="h2"
          fontSize="4xl"
          marginBottom="16"
          color="var(--color-grey-700)"
          fontWeight="600"
          lineHeight="1.05"
        >
          All cabins
        </Heading>
        <Flex gapX="1.125rem">
          <Segment
            items={segmentItems}
            value={activeSegment}
            setValue={setActiveSegment}
          />

          <Select.Root
            collection={sortBy}
            size="md"
            width="12.5rem"
            variant="subtle"
            onValueChange={(e) => setSelectedValue({ order: e.value[0] })}
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
        <CabinsTable setCabins={setCabins} cabins={cabins} />
      )}

      <CreateCabin />
    </div>
  );
};

export default Cabins;
