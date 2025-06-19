import {
  Button,
  CloseButton,
  Dialog,
  DialogRootProps,
  Portal,
} from "@chakra-ui/react";

interface DeleteDialogProps extends DialogRootProps {
  title: string;
  onDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  children,
  title,
  onDelete,
  ...props
}) => {
  return (
    <Dialog.Root lazyMount {...props} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bgColor="var(--color-grey-0)">
            <Dialog.Header>
              <Dialog.Title
                color="var(--color-grey-700)"
                fontWeight="500"
                fontSize="1.2rem"
              >
                {title}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color="var(--color-grey-500)">{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  color="var(--color-grey-700)"
                  bgColor="var(--color-grey-0)"
                  _hover={{ bgColor: "var(--color-grey-100)" }}
                  borderColor="var(--color-grey-200)"
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={onDelete}
                color="#fff"
                bgColor="var(--color-red-700)"
                _hover={{ bgColor: "var(--color-red-800)" }}
              >
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger
              asChild
              _hover={{ bgColor: "var(--color-grey-100)" }}
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteDialog;
