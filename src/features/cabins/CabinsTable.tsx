import { HiMiniHomeModern, HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { Image, Menu, Table } from '@chakra-ui/react';
import { CabinResponseType, createCabin, deleteCabin } from '@/services/api/cabinsApi';
import { useState } from 'react';
import EditCabin from './EditCabin';
import DeleteDialog from '@/components/DeleteDialog';
import { CabinType } from '../../services/api/cabinsApi';
import { formatToUSCurrency } from '@/utils/helper';
import MenuContainer from '@/components/MenuContainer';
import EmptyPage from '@/components/EmptyPage';

const CabinsTable = ({ cabins }: { cabins: CabinResponseType[] }) => {
  const [toggleDeleteDialog, setToggleDeleteDialog] = useState(false);
  const [selectedDeleteCabin, setSelectedDeleteCabin] = useState<{
    id: number;
    image: string;
  }>();
  const [toggleEditForm, setToggleEditForm] = useState(false);
  const [selectedEditCabin, setSelectedEditCabin] = useState<{
    id: number;
    cabin: CabinType;
  }>();

  const handleDeleteCabin = (cabinId: number, imagePath: string) => {
    deleteCabin(cabinId, imagePath);
  };

  const handleDuplicateCabin = (cabin: CabinResponseType) => {
    createCabin({
      description: cabin.description,
      discount: cabin.discount,
      image: cabin.image,
      maxCapacity: cabin.maxCapacity,
      name: cabin.name,
      regularPrice: cabin.regularPrice,
    });
  };

  const handleEditMenuItemClick = (cabin: CabinResponseType) => {
    setToggleEditForm(true);
    setSelectedEditCabin({
      id: cabin.id,
      cabin: {
        description: cabin.description,
        discount: cabin.discount,
        image: cabin.image,
        maxCapacity: cabin.maxCapacity,
        name: cabin.name,
        regularPrice: cabin.regularPrice,
      },
    });
  };

  const handleDeleteMenuItemClick = (cabin: CabinResponseType) => {
    setToggleDeleteDialog(true);
    setSelectedDeleteCabin({ id: cabin.id, image: cabin.image });
  };

  return cabins.length !== 0 ? (
    <>
      <Table.Root variant='outline' size='sm' borderTopRadius='md' fontSize='0.875rem'>
        {/* Table Header */}
        <Table.Header backgroundColor='var(--color-grey-50)'>
          <Table.Row>
            <Table.ColumnHeader className='table-head'></Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'>CABIN</Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'>CAPACITY</Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'>PRICE</Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'>DISCOUNT</Table.ColumnHeader>
            <Table.ColumnHeader className='table-head'></Table.ColumnHeader>
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
              maxH='8.1rem'
            >
              <Table.Cell w='5.75rem'>
                <Image marginRight='1rem' src={cabin.image} alt={cabin.description} />
              </Table.Cell>
              <Table.Cell fontFamily='Sono' fontWeight='600' fontSize='1rem'>
                {cabin.name}
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
                    onClick={() => handleDuplicateCabin(cabin)}
                  >
                    <HiSquare2Stack />
                    Duplicate
                  </Menu.Item>
                  <Menu.Item
                    value='edit-cabin'
                    className='menu-item'
                    onClick={() => handleEditMenuItemClick(cabin)}
                  >
                    <HiPencil /> Edit
                  </Menu.Item>
                  <Menu.Item
                    value='delete-cabin'
                    color='fg.error'
                    className='menu-item'
                    _hover={{ bg: 'bg.error', color: 'fg.error' }}
                    onClick={() => handleDeleteMenuItemClick(cabin)}
                  >
                    <HiTrash />
                    Delete
                  </Menu.Item>
                </MenuContainer>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <EditCabin
        cabinValues={selectedEditCabin?.cabin}
        cabinId={selectedEditCabin?.id}
        open={toggleEditForm}
        setOpen={setToggleEditForm}
      />

      <DeleteDialog
        open={toggleDeleteDialog}
        onOpenChange={e => setToggleDeleteDialog(e.open)}
        title='Delete cabin'
        onDelete={() => {
          if (selectedDeleteCabin) {
            handleDeleteCabin(selectedDeleteCabin.id, selectedDeleteCabin.image);
          }
          setToggleDeleteDialog(false);
        }}
      >
        Are you sure you want to delete this cabins permanently? This action cannot be undone.
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
