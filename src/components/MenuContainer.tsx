import { Button, Menu, Portal } from '@chakra-ui/react';
import { HiEllipsisVertical } from 'react-icons/hi2';

const MenuContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant='outline'
          size='2xs'
          border='none'
          width='1.6rem'
          height='2rem'
          borderRadius='4px'
          marginRight='0.5rem'
        >
          <HiEllipsisVertical
            fill='var(--color-grey-600)'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>{children}</Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default MenuContainer;
