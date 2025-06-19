import { Box, BoxProps } from '@chakra-ui/react';
import styles from './Spinner.module.scss';

interface SpinnerProps extends BoxProps {
  size?: string;
}

const Spinner = ({ size, ...props }: SpinnerProps) => {
  return (
    <Box className={styles.spinner} {...props} h={size || '6.4rem'} w={size || '6.4rem'}></Box>
  );
};

export default Spinner;
