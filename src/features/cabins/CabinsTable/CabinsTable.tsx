import styles from "./CabinsTable.module.scss";

import {
  HiEllipsisVertical,
  HiMiniHomeModern,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";

import {
  Button,
  EmptyState,
  Menu,
  Portal,
  Table,
  VStack,
} from "@chakra-ui/react";
import { CabinResponseType, createCabin, deleteCabin } from "@/services";
import { useState } from "react";
import EditCabin from "../EditCabin/EditCabin";
import DeleteDialog from "@/components/DeleteDialog";
import { CabinType } from "../../../services/index";

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

  return cabins?.length !== 0 ? (
    <div>
      <Table.Root
        variant="outline"
        size="sm"
        borderTopRadius="md"
        fontSize="0.875rem"
        marginTop="8"
      >
        {/* Table Header */}
        <Table.Header backgroundColor="var(--color-grey-50)">
          <Table.Row>
            <Table.ColumnHeader
              className={styles.tableHead}
            ></Table.ColumnHeader>
            <Table.ColumnHeader className={styles.tableHead}>
              CABIN
            </Table.ColumnHeader>
            <Table.ColumnHeader className={styles.tableHead}>
              CAPACITY
            </Table.ColumnHeader>
            <Table.ColumnHeader className={styles.tableHead}>
              PRICE
            </Table.ColumnHeader>
            <Table.ColumnHeader className={styles.tableHead}>
              DISCOUNT
            </Table.ColumnHeader>
            <Table.ColumnHeader
              className={styles.tableHead}
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        {/* Table Body */}
        <Table.Body>
          {cabins?.map((cabin) => (
            <Table.Row
              key={cabin.id}
              backgroundColor="var(--color-grey-0)"
              color="var(--color-grey-600)"
              borderColor="var(--color-grey-100)"
              h="4.5rem"
            >
              <Table.Cell>
                <img
                  src={cabin.image}
                  alt={cabin.description}
                  className={styles.cabinImg}
                />
              </Table.Cell>
              <Table.Cell fontFamily="Sono" fontWeight="600" fontSize="1rem">
                {cabin.name}
              </Table.Cell>
              <Table.Cell>Fits up to {cabin.maxCapacity} guests</Table.Cell>
              <Table.Cell fontFamily="Sono" fontWeight="600">
                ${cabin.regularPrice}.00
              </Table.Cell>
              <Table.Cell
                fontFamily="Sono"
                color={`${!cabin.discount ? "" : "var(--color-green-700)"}`}
                fontWeight="500"
              >
                {!cabin.discount ? "—" : `$${cabin.discount}.00`}
              </Table.Cell>
              <Table.Cell textAlign="end">
                {/* Menu */}
                <Menu.Root positioning={{ placement: "bottom-start" }}>
                  <Menu.Trigger asChild>
                    <Button
                      variant="outline"
                      size="2xs"
                      border="none"
                      className={styles.menuBtn}
                    >
                      <HiEllipsisVertical className={styles.menuIcon} />
                    </Button>
                  </Menu.Trigger>

                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item
                          value="duplicate-cabin"
                          className={styles.menuItem}
                          onClick={() => handleDuplicateCabin(cabin)}
                        >
                          <HiSquare2Stack />
                          Duplicate
                        </Menu.Item>
                        <Menu.Item
                          value="edit-cabin"
                          className={styles.menuItem}
                          onClick={() => handleEditMenuItemClick(cabin)}
                        >
                          <HiPencil /> Edit
                        </Menu.Item>
                        <Menu.Item
                          value="delete-cabin"
                          className={styles.menuItem}
                          color="fg.error"
                          _hover={{ bg: "bg.error", color: "fg.error" }}
                          onClick={() => handleDeleteMenuItemClick(cabin)}
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

      <EditCabin
        cabinValues={selectedEditCabin?.cabin}
        cabinId={selectedEditCabin?.id}
        open={toggleEditForm}
        setOpen={setToggleEditForm}
      />

      <DeleteDialog
        open={toggleDeleteDialog}
        setOpen={setToggleDeleteDialog}
        title="Delete cabin"
        onClick={() => {
          if (selectedDeleteCabin) {
            handleDeleteCabin(
              selectedDeleteCabin.id,
              selectedDeleteCabin.image,
            );
          }
          setToggleDeleteDialog(false);
        }}
      >
        Are you sure you want to delete this cabins permanently? This action
        cannot be undone.
      </DeleteDialog>
    </div>
  ) : (
    <EmptyState.Root size="lg">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiMiniHomeModern />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title color="var(--color-grey-800)">
            No Cabins Found
          </EmptyState.Title>
          <EmptyState.Description>
            It looks like no cabins are available yet. Be the first to create a
            cozy getaway!
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default CabinsTable;
