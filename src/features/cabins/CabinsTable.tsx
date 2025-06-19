import { HiMiniHomeModern, HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { For, Image, Menu, Strong, Table, Text } from '@chakra-ui/react';
import { createCabin, deleteCabin } from '@/services/api/cabinsApi';
import { useState } from 'react';
import EditCabin from './EditCabin';
import DeleteDialog from '@/components/DeleteDialog';
import { formatToUSCurrency } from '@/utils/helper';
import MenuContainer from '@/components/MenuContainer';
import EmptyPage from '@/components/EmptyPage';
import { CabinResponseType } from '@/types/cabinsTypes';
import { FetchCabinsProps } from '@/pages/Cabins';
import { CABINS_PAGE_SIZE } from '@/utils/constants';
import CabinsTableRowSkeleton from './CabinsTableRowSkeleton';
import { useSearchParams } from 'react-router';

const CabinsTable = ({
  isLoading,
  cabins,
  fetchCabins,
}: {
  isLoading: boolean;
  cabins: CabinResponseType[];
  fetchCabins: ({ activeSorting, activeSegmentValue, activePageParam }: FetchCabinsProps) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [deleteCabinInfo, setDeleteCabinInfo] = useState<{
    name: string;
    open: boolean;
    cabinId: number | null;
  }>({ cabinId: null, name: '', open: false });

  const [toggleEditForm, setToggleEditForm] = useState(() => !!searchParams.get('edit'));

  const handleDuplicateCabin = (cabin: CabinResponseType) => {
    createCabin({
      description: cabin.description,
      discount: cabin.discount,
      image: cabin.image,
      maxCapacity: cabin.maxCapacity,
      name: cabin.name,
      regularPrice: cabin.regularPrice,
    }).then(() => fetchCabins({}));
  };

  const handleEditMenuItemClick = (cabinId: number) => {
    setSearchParams(prevParams => {
      if (!toggleEditForm) prevParams.set('edit', String(cabinId));
      else prevParams.delete('edit');
      return prevParams;
    });

    setToggleEditForm(true);
  };

  const handleDeleteMenuItemClick = (cabinId: number, cabinName: string) => {
    setDeleteCabinInfo({ cabinId: cabinId, name: cabinName, open: true });
  };

  const handleDeleteCabin = () => {
    if (deleteCabinInfo.cabinId !== null) {
      deleteCabin(deleteCabinInfo.cabinId).then(() => fetchCabins({}));
    }
    setDeleteCabinInfo({ cabinId: null, name: '', open: false });
  };

  return cabins.length !== 0 || isLoading ? (
    <>
      <Table.Root variant='outline' borderTopRadius='md' fontSize='0.875rem'>
        {/* Table Header */}
        <Table.Header backgroundColor='var(--color-grey-50)'>
          <Table.Row>
            <Table.ColumnHeader className='table-head' paddingLeft='4.8rem' w='16rem'>
              CABIN
            </Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'>CAPACITY</Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'>PRICE</Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'>DISCOUNT</Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        {/* Table Body */}
        <Table.Body>
          {isLoading ? (
            <For each={new Array(CABINS_PAGE_SIZE).fill('')}>
              {() => <CabinsTableRowSkeleton key={crypto.randomUUID()} />}
            </For>
          ) : (
            cabins?.map(cabin => (
              <Table.Row
                key={cabin.id}
                backgroundColor='var(--color-grey-0)'
                color='var(--color-grey-600)'
                borderColor='var(--color-grey-100)'
                maxH='8.1rem'
              >
                <Table.Cell w='9.75rem' padding='.1rem 0' display='flex' gap='2.4rem'>
                  <Image
                    src={cabin.image}
                    alt='Cabin image'
                    aspectRatio={4 / 3}
                    h='4.4rem'
                    w='6rem'
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '../../../public/house-placeholder.jpg';
                    }}
                    loading='lazy'
                  />
                  <Text fontFamily='Sono' fontWeight='600' fontSize='1rem'>
                    {cabin.name}
                  </Text>
                </Table.Cell>
                <Table.Cell>Fits up to {cabin.maxCapacity} guests</Table.Cell>
                <Table.Cell fontFamily='Sono' fontWeight='600'>
                  {formatToUSCurrency(cabin.regularPrice)}
                </Table.Cell>
                <Table.Cell
                  fontFamily='Sono'
                  color={`${!cabin.discount ? '' : 'var(--color-green-700)'}`}
                  fontWeight='500'
                >
                  {!cabin.discount ? '—' : formatToUSCurrency(cabin.discount)}
                </Table.Cell>
                <Table.Cell textAlign='end'>
                  <MenuContainer>
                    <Menu.Item
                      value='duplicate-cabin'
                      className='menu-item'
                      _highlighted={{ bg: 'var(--color-grey-100)' }}
                      onClick={() => handleDuplicateCabin(cabin)}
                    >
                      <HiSquare2Stack />
                      Duplicate
                    </Menu.Item>
                    <Menu.Item
                      value='edit-cabin'
                      className='menu-item'
                      _highlighted={{ bg: 'var(--color-grey-100)' }}
                      onClick={() => handleEditMenuItemClick(cabin.id)}
                    >
                      <HiPencil /> Edit
                    </Menu.Item>
                    <Menu.Item
                      value='delete-cabin'
                      color='fg.error'
                      className='menu-item'
                      _highlighted={{ bg: 'bg.error', color: 'fg.error' }}
                      onClick={() => handleDeleteMenuItemClick(cabin.id, cabin.name)}
                    >
                      <HiTrash />
                      Delete
                    </Menu.Item>
                  </MenuContainer>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <EditCabin open={toggleEditForm} setOpen={setToggleEditForm} fetchCabins={fetchCabins} />
      <DeleteDialog
        open={deleteCabinInfo.open}
        onOpenChange={() => setDeleteCabinInfo({ name: '', open: false, cabinId: null })}
        title='Delete cabin'
        onDelete={handleDeleteCabin}
      >
        Are you sure you want to delete{' '}
        <Strong color='var(--color-grey-700)' fontWeight='600'>
          {deleteCabinInfo.name}
        </Strong>{' '}
        cabin permanently? This action cannot be undone.
      </DeleteDialog>
    </>
  ) : (
    <EmptyPage
      title='No Cabins Found'
      description='It looks like no cabins are available yet. Be the first to create a cozy getaway!'
      Icon={HiMiniHomeModern}
    />
  );
};

export default CabinsTable;
