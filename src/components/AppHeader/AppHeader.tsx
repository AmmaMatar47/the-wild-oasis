import styles from './AppHeader.module.scss';

import { Flex, IconButton, Icon } from '@chakra-ui/react';
import { HiArrowRightOnRectangle, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { Tooltip } from '../ui/tooltip';
import { useUser } from '../../features/authentication/useUser';
import { useLogout } from '@/features/authentication/useLogout';
import Avatar from '../Avatar';
import { useTheme } from '@/context/ThemeContext';
import { useColorMode } from '../ui/color-mode';

const AppHeader = () => {
  const { user, isLoading } = useUser();
  const { mutate: logout } = useLogout();
  const { theme, toggleTheme } = useTheme();
  const { toggleColorMode } = useColorMode();

  const handleLogout = () => {
    logout();
  };

  const handleToggleTheme = () => {
    toggleTheme();
    toggleColorMode();
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
        <Link to='/profile' style={{ borderRadius: '100px', alignSelf: 'center' }}>
          {user === undefined ? null : (
            <Avatar
              fullName={user.user_metadata.fullName}
              avatarSrc={user.user_metadata.avatar}
              isLoadingAvatar={isLoading}
              outline='var(--color-grey-300) solid 2.5px'
              outlineOffset='1.8px'
              transition='.3s outline'
              size='sm'
              _hover={{
                outlineColor: 'var(--color-brand-500)',
              }}
            />
          )}
        </Link>
      </Tooltip>

      <IconButton
        variant='ghost'
        aria-label='Toggle theme'
        marginLeft='2'
        w='2rem'
        onClick={handleToggleTheme}
        _hover={{ bgColor: 'var(--color-grey-100)' }}
        overflow='hidden'
      >
        <HiOutlineMoon
          className={`${styles.darkModeIcon} ${theme === 'dark' ? styles.activeTheme : ''}`}
          stroke='var(--color-brand-500)'
        />
        <HiOutlineSun
          className={`${styles.lightModeIcon} ${theme === 'light' ? styles.activeTheme : ''}`}
          stroke='var(--color-brand-500)'
        />
      </IconButton>
      <Tooltip content='Logout' openDelay={200} closeDelay={200}>
        <IconButton
          variant='ghost'
          aria-label='Logout'
          onClick={handleLogout}
          bgColor='var(--color-grey-0)'
          _hover={{ bgColor: 'var(--color-grey-100)' }}
        >
          <Icon h='22px' w='22px'>
            <HiArrowRightOnRectangle fill='var(--color-brand-500)' />
          </Icon>
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default AppHeader;
