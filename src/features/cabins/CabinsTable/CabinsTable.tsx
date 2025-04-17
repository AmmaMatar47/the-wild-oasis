import {
  HiEllipsisVertical,
  HiMiniHomeModern,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import styles from "./CabinsTable.module.scss";

import {
  Button,
  CloseButton,
  Dialog,
  EmptyState,
  Menu,
  Portal,
  Table,
  VStack,
} from "@chakra-ui/react";
import { CabinType, deleteCabin } from "@/services";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

const CabinsTable = ({
  cabins,
  setCabins,
}: {
  cabins: CabinType[];
  setCabins: React.Dispatch<React.SetStateAction<CabinType[] | undefined>>;
}) => {
  const [toggleDeleteDialog, setToggleDeleteDialog] = useState(false);

  const handleDeleteCabin = (cabinId: number, imagePath: string) => {
    const deletePromise = deleteCabin(cabinId, imagePath);
    toaster.promise(deletePromise, {
      success: {
        description: "Cabin deleted successfully",
      },
      error: { description: "Cabin failed to delete" },
      loading: { description: "Deleting" },
    });
    deletePromise.then(() =>
      setCabins((cabins) => cabins?.filter((cabin) => cabin.id !== cabinId)),
    );
  };

  return cabins.length !== 0 ? (
    <div>
      <Table.Root
        variant="outline"
        size="sm"
        borderRadius="md"
        fontSize="0.875rem"
        marginBottom="1rem"
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
                      size="sm"
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
                        >
                          <HiSquare2Stack />
                          Duplicate
                        </Menu.Item>
                        <Menu.Item
                          value="edit-cabin"
                          className={styles.menuItem}
                        >
                          <HiPencil />
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          value="delete-cabin"
                          className={styles.menuItem}
                          color="fg.error"
                          _hover={{ bg: "bg.error", color: "fg.error" }}
                          onClick={() => {
                            setToggleDeleteDialog(true);
                          }}
                        >
                          <HiTrash />
                          Delete
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>

                    <Dialog.Root
                      lazyMount
                      open={toggleDeleteDialog}
                      onOpenChange={(e) => setToggleDeleteDialog(e.open)}
                      placement="center"
                    >
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title
                                color="var(--color-grey-700)"
                                fontWeight="500"
                                fontSize="1.2rem"
                              >
                                Delete cabin
                              </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body color="var(--color-grey-500)">
                              Are you sure you want to delete this cabins
                              permanently? This action cannot be undone.
                            </Dialog.Body>
                            <Dialog.Footer>
                              <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                              </Dialog.ActionTrigger>
                              <Button
                                onClick={() => {
                                  handleDeleteCabin(cabin.id, cabin.image);
                                  setToggleDeleteDialog(false);
                                }}
                                bg="var(--color-red-700)"
                                _hover={{ bg: "var(--color-red-800)" }}
                              >
                                Delete
                              </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>
                  </Portal>
                </Menu.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
