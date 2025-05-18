import { ListCollection, Portal, Select, SelectRootProps } from '@chakra-ui/react';

interface SelectCompParams extends SelectRootProps {
  collection: ListCollection<{
    label: string;
    value: string;
  }>;
}

const SelectComp = ({ collection, ...props }: SelectCompParams) => {
  return (
    <Select.Root collection={collection} width='12.5rem' variant='subtle' {...props}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          bg='var(--color-grey-0)'
          borderRadius='md'
          shadow='var(--shadow-sm)'
          padding='.625rem'
        >
          <Select.ValueText
            placeholder='Sort by'
            fontSize='.875rem'
            fontWeight='500'
            color='var(--color-grey-700)'
          />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map(item => (
              <Select.Item item={item} key={item.value} fontSize='.875rem'>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectComp;
