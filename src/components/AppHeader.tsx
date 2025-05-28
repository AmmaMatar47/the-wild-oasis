import { Image, Flex, IconButton, Text, Icon } from '@chakra-ui/react';
import { HiArrowRightOnRectangle, HiOutlineMoon } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { Tooltip } from './ui/tooltip';
import { useUser } from '../features/authentication/useUser';
import { useLogout } from '@/features/authentication/useLogout';

const AppHeader = () => {
  const { user } = useUser();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return user === undefined ? null : (
    <Flex
      bgColor='var(--color-grey-0)'
      borderBottom='solid 1px var(--color-grey-100)'
      paddingX='6'
      paddingY='2'
      justifyContent='end'
      position='sticky'
      top='0'
      zIndex='1000'
    >
      <Flex alignItems='center' marginRight='4' gap='2'>
        <Tooltip content='Profile'>
          <Link to='/account'>
            <Image
              src={user.user_metadata.avatar || '/default-user.jpg'}
              boxSize='34px'
              borderRadius='full'
              fit='cover'
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.target as HTMLImageElement;
                target.src = '/default-user.jpg';
              }}
              alt={user.user_metadata.fullName}
            />
          </Link>
        </Tooltip>

        <Text color='var(--color-grey-600)' fontSize='sm' fontWeight='500'>
          {user.user_metadata.fullName}
        </Text>
      </Flex>
      <IconButton variant='ghost' aria-label='Toggle dark mode'>
        <Icon h='22px' w='22px'>
          <HiOutlineMoon stroke='var(--color-brand-600)' />
        </Icon>
      </IconButton>
      <Tooltip content='Logout'>
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
