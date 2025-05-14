import { Button, CloseButton, Dialog, DialogRootProps, Portal } from '@chakra-ui/react';

interface DeleteDialogProps extends DialogRootProps {
  children: string;
  title: string;
  onDelete: () => void;
}

const DeleteDialog = ({ children, title, onDelete, ...props }: DeleteDialogProps) => {
  return (
    <Dialog.Root lazyMount {...props} placement='center'>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title color='var(--color-grey-700)' fontWeight='500' fontSize='1.2rem'>
                {title}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color='var(--color-grey-500)'>{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant='outline'>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={onDelete}
                bg='var(--color-red-700)'
                _hover={{ bg: 'var(--color-red-800)' }}
              >
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size='sm' />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteDialog;
