import styles from './Cabins.module.scss';

import {
  Button,
  createListCollection,
  Flex,
  Heading,
  Menu,
  Portal,
  Select,
  Table,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CabinType, getAllCabins } from '@/services';
import { HiEllipsisVertical, HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Spinner from '@/components/Spinner/Spinner';
import Segment from '@/components/Segment/Segment';

const Cabins = () => {
  const [cabins, setCabins] = useState<CabinType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [segmentValue, setSegmentValue] = useState('All');

  useEffect(() => {
    const fetchCabins = async () => {
      setIsLoading(true);
      const cabinsData = await getAllCabins();
      setCabins(cabinsData);
      setIsLoading(false);
    };
    fetchCabins();
  }, []);

  console.log(segmentValue);

  return (
    <div>
      <Flex justifyContent='space-between'>
        <Heading
          as='h2'
          fontSize='5xl'
          marginBottom='16'
          color='var(--color-grey-700)'
          fontWeight='600'
          lineHeight='1.05'
        >
          All cabins
        </Heading>
        <Flex gapX='1.8rem'>
          <Segment
            items={['All', 'No discount', 'With discount']}
            value={segmentValue}
            setValue={setSegmentValue}
          />

          <Select.Root collection={frameworks} size='lg' width='20rem' variant='subtle'>
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger bg='var(--color-grey-0)' borderRadius='md' shadow='xs' padding='1rem'>
                <Select.ValueText
                  placeholder='Sort by'
                  fontSize='1.4rem'
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
                  {frameworks.items.map(framework => (
                    <Select.Item item={framework} key={framework.value} fontSize='1.4rem'>
                      {framework.label}
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
        <Table.Root variant='outline' size='sm' borderRadius='md' fontSize='1.4rem'>
          {/* Table Header */}
          <Table.Header backgroundColor='var(--color-grey-50)'>
            <Table.Row>
              <Table.ColumnHeader className={styles.tableHead}></Table.ColumnHeader>
              <Table.ColumnHeader className={styles.tableHead}>CABIN</Table.ColumnHeader>
              <Table.ColumnHeader className={styles.tableHead}>CAPACITY</Table.ColumnHeader>
              <Table.ColumnHeader className={styles.tableHead}>PRICE</Table.ColumnHeader>
              <Table.ColumnHeader className={styles.tableHead}>DISCOUNT</Table.ColumnHeader>
              <Table.ColumnHeader className={styles.tableHead}></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          {/* Table Body */}
          <Table.Body>
            {cabins?.map(cabin => (
              <Table.Row
                key={cabin.id}
                backgroundColor='var(--color-grey-0)'
                color='var(--color-grey-600)'
                borderColor='var(--color-grey-100)'
              >
                <Table.Cell width='0'>
                  <img
                    src={cabin.image}
                    alt={cabin.description}
                    className={styles.cabinImg}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `../../assets/imgs/DALL·E 2025-03-25 22.36.31.webp`;
                    }}
                  />
                </Table.Cell>
                <Table.Cell fontFamily='Sono' fontWeight='600' fontSize='1.6rem'>
                  {cabin.name}
                </Table.Cell>
                <Table.Cell>Fits up to {cabin.maxCapacity} guests</Table.Cell>
                <Table.Cell fontFamily='Sono' fontWeight='600'>
                  ${cabin.regularPrice}.00
                </Table.Cell>
                <Table.Cell
                  fontFamily='Sono'
                  color={`${cabin.discount === null ? '' : 'var(--color-green-700)'}`}
                  fontWeight='500'
                >
                  {cabin.discount === null ? '—' : `$${cabin.discount}.00`}
                </Table.Cell>
                <Table.Cell textAlign='end'>
                  {/* Menu */}
                  <Menu.Root positioning={{ placement: 'bottom-start' }}>
                    <Menu.Trigger asChild>
                      <Button variant='outline' size='sm' border='none' className={styles.menuBtn}>
                        <HiEllipsisVertical className={styles.menuIcon} />
                      </Button>
                    </Menu.Trigger>

                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value='duplicate-cabin' className={styles.menuItem}>
                            <HiSquare2Stack />
                            Duplicate
                          </Menu.Item>
                          <Menu.Item value='edit-cabin' className={styles.menuItem}>
                            <HiPencil />
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            value='delete-cabin'
                            className={styles.menuItem}
                            color='fg.error'
                            _hover={{ bg: 'bg.error', color: 'fg.error' }}
                          >
                            <HiTrash />
                            Delete
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

const frameworks = createListCollection({
  items: [
    { label: 'name (A-Z)', value: 'nameAToZ' },
    { label: 'name (Z-A)', value: 'nameZToA' },
    { label: 'price (low first)', value: 'priceLowToHigh' },
    { label: 'price (high first)', value: 'priceHighToLow' },
    { label: 'capacity (low first)', value: 'capacityLowToHigh' },
    { label: 'capacity (high first)', value: 'capacityHighToLow' },
  ],
});

export default Cabins;
