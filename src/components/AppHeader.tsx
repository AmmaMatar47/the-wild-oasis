import { Flex, IconButton, Icon } from '@chakra-ui/react';
import { HiArrowRightOnRectangle, HiOutlineMoon } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { Tooltip } from './ui/tooltip';
import { useUser } from '../features/authentication/useUser';
import { useLogout } from '@/features/authentication/useLogout';
import Avatar from './Avatar';

const AppHeader = () => {
  const { user, isLoading } = useUser();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex
      bgColor='var(--color-grey-0)'
      borderBottom='solid 1px var(--color-grey-100)'
      paddingX='6'
      paddingY='2'
      justifyContent='end'
      position='sticky'
      top='0'
      zIndex='1000'
      gap='1'
    >
      <Tooltip content={user?.user_metadata.fullName} openDelay={200} closeDelay={200}>
        <Link to='/account'>
          {user === undefined ? null : (
            <Avatar
              fullName={user.user_metadata.fullName}
              avatarSrc={user.user_metadata.avatar}
              loadingAvatar={isLoading}
            />
          )}
        </Link>
      </Tooltip>

      <IconButton variant='ghost' aria-label='Toggle dark mode' marginLeft='2'>
        <Icon h='22px' w='22px'>
          <HiOutlineMoon stroke='var(--color-brand-600)' />
        </Icon>
      </IconButton>
      <Tooltip content='Logout' openDelay={200} closeDelay={200}>
        <IconButton variant='ghost' onClick={handleLogout}>
          <Icon h='22px' w='22px'>
            <HiArrowRightOnRectangle fill='var(--color-brand-600)' />
          </Icon>
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default AppHeader;
