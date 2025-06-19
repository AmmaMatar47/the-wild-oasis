import {
  ListCollection,
  Portal,
  Select as SelectChakraUI,
  SelectRootProps,
} from "@chakra-ui/react";

interface SelectParams extends SelectRootProps {
  collection: ListCollection<{
    label: string;
    value: string;
  }>;
}

const Select = ({ collection, ...props }: SelectParams) => {
  return (
    <SelectChakraUI.Root
      collection={collection}
      width="12.5rem"
      variant="subtle"
      {...props}
    >
      <SelectChakraUI.HiddenSelect />
      <SelectChakraUI.Control>
        <SelectChakraUI.Trigger
          bg="var(--color-grey-0)"
          borderRadius="sm"
          shadow="var(--shadow-sm)"
          cursor="pointer"
        >
          <SelectChakraUI.ValueText
            placeholder="Sort by"
            fontSize=".875rem"
            fontWeight="500"
            color="var(--color-grey-700)"
          />
        </SelectChakraUI.Trigger>
        <SelectChakraUI.IndicatorGroup color="var(--color-grey-700)">
          <SelectChakraUI.Indicator />
        </SelectChakraUI.IndicatorGroup>
      </SelectChakraUI.Control>
      <Portal>
        <SelectChakraUI.Positioner>
          <SelectChakraUI.Content bgColor="var(--color-grey-0)" gapY="1">
            {collection.items.map((item) => (
              <SelectChakraUI.Item
                item={item}
                key={item.value}
                fontSize=".875rem"
                _checked={{ bgColor: "var(--color-grey-100)" }}
                _highlighted={{ bg: "var(--color-grey-100)" }}
              >
                {item.label}
                <SelectChakraUI.ItemIndicator />
              </SelectChakraUI.Item>
            ))}
          </SelectChakraUI.Content>
        </SelectChakraUI.Positioner>
      </Portal>
    </SelectChakraUI.Root>
  );
};

export default Select;
