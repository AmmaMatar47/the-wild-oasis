import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

type DeleteDialogProps = {
  children: string;
  title: string;
  onClick: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteDialog = ({ children, title, onClick, open, setOpen }: DeleteDialogProps) => {
  return (
    <Dialog.Root lazyMount open={open} onOpenChange={e => setOpen(e.open)} placement='center'>
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
                onClick={onClick}
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
